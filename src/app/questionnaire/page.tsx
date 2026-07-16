"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CROSSROADS, useQuestionnaire, QuestionnaireProvider } from "@/lib/questionnaire-context";
import ForkingPath from "@/components/ForkingPath";

function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevText, setPrevText] = useState(text);

  if (text !== prevText) {
    setDisplayedText("");
    setCurrentIndex(0);
    setPrevText(text);
  }

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (onComplete && currentIndex === text.length) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <span>{displayedText}</span>;
}

function QuestionnaireContent() {
  const router = useRouter();
  const { setAnswer, removeAnswer, getEncodedData } = useQuestionnaire();
  const [currentStep, setCurrentStep] = useState(0);
  const [showForkingPath, setShowForkingPath] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [questionVisible, setQuestionVisible] = useState(false);

  const currentQuestion = CROSSROADS[currentStep];
  const totalSteps = CROSSROADS.length;
  const isLastStep = currentStep === totalSteps - 1;

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setAnswer(currentStep, optionIndex);
    setShowForkingPath(true);
  };

  const handleForkingPathComplete = () => {
    setShowForkingPath(false);
    setSelectedOption(null);

    if (isLastStep) {
      const encoded = getEncodedData();
      router.push(`/reveal?data=${encoded}`);
    } else {
      setCurrentStep((prev) => prev + 1);
      setQuestionVisible(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      removeAnswer(currentStep);
      setCurrentStep((prev) => prev - 1);
      setQuestionVisible(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <p className="text-sm text-[#9a9aab] mb-2">
            Step {currentStep + 1} of {totalSteps}
          </p>
          <div className="w-full bg-[#1a1a25] rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-[#7c5cbf]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {showForkingPath ? (
            <motion.div
              key="forking-path"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ForkingPath
                chosenPath={selectedOption !== null && selectedOption % 2 === 0 ? "left" : "right"}
                duration={1.5}
                onComplete={handleForkingPathComplete}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`question-${currentStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#e0e0e0] mb-4 min-h-[3rem]">
                  <TypewriterText
                    text={currentQuestion.question}
                    onComplete={() => setQuestionVisible(true)}
                  />
                </h2>
              </div>

              <motion.div
                className="grid gap-4 md:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: questionVisible ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className="p-6 bg-[#12121a] border-2 border-[#2a2a3a] rounded-lg text-left hover:border-[#7c5cbf] hover:bg-[#1a1a25] transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg text-[#e0e0e0] group-hover:text-[#7c5cbf] transition-colors">
                      {option.label}
                    </span>
                  </motion.button>
                ))}
              </motion.div>

              {currentStep > 0 && (
                <motion.button
                  onClick={handleBack}
                  className="flex items-center gap-2 mx-auto text-[#9a9aab] hover:text-[#7c5cbf] transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <ArrowLeft size={20} />
                  <span>Back</span>
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function QuestionnairePage() {
  return (
    <QuestionnaireProvider>
      <QuestionnaireContent />
    </QuestionnaireProvider>
  );
}
