import { LifeCrossroad, LifePath, ParallelProfile, DivergencePoint } from '@/types';

function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function hashBirthdate(birthdate: string): number {
  let hash = 0;
  for (let i = 0; i < birthdate.length; i++) {
    const char = birthdate.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

const CROSSROADS: LifeCrossroad[] = [
  {
    id: 'age-18',
    question: 'At 18, you chose to...',
    options: [
      { label: 'Go to university', category: 'education', impact: 0.8 },
      { label: 'Start working', category: 'career', impact: 0.7 },
      { label: 'Travel the world', category: 'location', impact: 0.9 },
      { label: 'Start a business', category: 'career', impact: 0.85 }
    ]
  },
  {
    id: 'age-22',
    question: 'At 22, you moved to...',
    options: [
      { label: 'Stay in hometown', category: 'location', impact: 0.6 },
      { label: 'Big city in home country', category: 'location', impact: 0.7 },
      { label: 'Move abroad', category: 'location', impact: 0.9 },
      { label: 'Off-grid somewhere remote', category: 'location', impact: 0.8 }
    ]
  },
  {
    id: 'age-25',
    question: 'Your career became...',
    options: [
      { label: 'Corporate ladder', category: 'career', impact: 0.8 },
      { label: 'Creative freelancer', category: 'career', impact: 0.7 },
      { label: 'Entrepreneur', category: 'career', impact: 0.9 },
      { label: 'Academic researcher', category: 'career', impact: 0.75 }
    ]
  },
  {
    id: 'age-28',
    question: 'In love, you...',
    options: [
      { label: 'Settled down early', category: 'relationship', impact: 0.6 },
      { label: 'Dated around a lot', category: 'relationship', impact: 0.5 },
      { label: 'Focused on yourself', category: 'relationship', impact: 0.4 },
      { label: 'Found an unconventional arrangement', category: 'relationship', impact: 0.7 }
    ]
  },
  {
    id: 'age-30',
    question: 'Your defining hobby became...',
    options: [
      { label: 'Music', category: 'hobby', impact: 0.3 },
      { label: 'Athletics', category: 'hobby', impact: 0.4 },
      { label: 'Writing', category: 'hobby', impact: 0.3 },
      { label: 'Technology', category: 'hobby', impact: 0.35 }
    ]
  },
  {
    id: 'age-33',
    question: 'When crisis hit, you...',
    options: [
      { label: 'Fought through it head-on', category: 'crisis', impact: 0.5 },
      { label: 'Adapted and pivoted', category: 'crisis', impact: 0.6 },
      { label: 'Withdrew and reflected', category: 'crisis', impact: 0.4 },
      { label: 'Leaned on community', category: 'crisis', impact: 0.5 }
    ]
  },
  {
    id: 'age-35',
    question: 'The one risk you took was...',
    options: [
      { label: 'Financial', category: 'risk', impact: 0.7 },
      { label: 'Relational', category: 'risk', impact: 0.6 },
      { label: 'Career', category: 'risk', impact: 0.7 },
      { label: 'Creative', category: 'risk', impact: 0.5 }
    ]
  }
];

const AGES = [18, 22, 25, 28, 30, 33, 35];

const CITY_MAPPINGS: Record<number, { city: string; country: string }[]> = {
  0: [
    { city: 'Springfield', country: 'USA' },
    { city: 'Portland', country: 'USA' },
    { city: 'Austin', country: 'USA' }
  ],
  1: [
    { city: 'New York', country: 'USA' },
    { city: 'London', country: 'UK' },
    { city: 'Tokyo', country: 'Japan' }
  ],
  2: [
    { city: 'Lisbon', country: 'Portugal' },
    { city: 'Berlin', country: 'Germany' },
    { city: 'Barcelona', country: 'Spain' }
  ],
  3: [
    { city: 'Queenstown', country: 'New Zealand' },
    { city: 'Reykjavik', country: 'Iceland' },
    { city: 'Banff', country: 'Canada' }
  ]
};

const CAREER_MAPPINGS: Record<number, string[]> = {
  0: ['Software Engineer', 'Data Analyst', 'Product Manager'],
  1: ['Graphic Designer', 'Writer', 'Photographer'],
  2: ['Startup Founder', 'Business Owner', 'Consultant'],
  3: ['University Professor', 'Research Scientist', 'Lab Director']
};

const EDUCATION_MAPPINGS: Record<number, string> = {
  0: 'PhD in Computer Science',
  1: 'Self-taught through online courses',
  2: 'MBA from top business school',
  3: 'Bachelor\'s degree with honors'
};

const RELATIONSHIP_MAPPINGS: Record<number, string> = {
  0: 'Married with two kids',
  1: 'Single and dating',
  2: 'Focused on personal growth',
  3: 'In an open relationship'
};

const HOBBY_MAPPINGS: Record<number, string> = {
  0: 'Playing guitar in a band',
  1: 'Marathon running',
  2: 'Writing novels',
  3: 'Building tech projects'
};

const WEEKEND_ACTIVITIES: Record<number, string> = {
  0: 'jamming with friends',
  1: 'training for races',
  2: 'working on their manuscript',
  3: 'coding side projects'
};

function getParallelChoice(answerIndex: number, random: () => number): number {
  switch (answerIndex) {
    case 0:
      return random() > 0.5 ? 2 : 3;
    case 1:
      return random() > 0.5 ? 3 : 0;
    case 2:
      return 0;
    case 3:
      return 1;
    default:
      return 0;
  }
}

function generateParallelPath(
  answers: number[],
  parallelChoices: number[],
  random: () => number
): LifePath {
  const locationChoice = parallelChoices[1];
  const cityData = CITY_MAPPINGS[locationChoice][Math.floor(random() * 3)];
  
  const careerChoice = parallelChoices[2];
  const career = CAREER_MAPPINGS[careerChoice][Math.floor(random() * 3)];
  
  const educationChoice = parallelChoices[0];
  const education = EDUCATION_MAPPINGS[educationChoice];
  
  const relationshipChoice = parallelChoices[3];
  const relationship = RELATIONSHIP_MAPPINGS[relationshipChoice];
  
  const hobbyChoice = parallelChoices[4];
  const hobbies = HOBBY_MAPPINGS[hobbyChoice];
  
  const healthBase = parallelChoices[4] === 1 ? 85 : 70;
  const healthScore = Math.min(100, healthBase + Math.floor(random() * 15));
  
  const financialBase = careerChoice === 2 ? 80 : careerChoice === 0 ? 75 : 60;
  const financialScore = Math.min(100, financialBase + Math.floor(random() * 20));
  
  return {
    career,
    city: cityData.city,
    country: cityData.country,
    education,
    relationship,
    hobbies,
    healthScore,
    financialScore
  };
}

function generateRealPath(answers: number[]): LifePath {
  const locationChoice = answers[1];
  const cityData = CITY_MAPPINGS[locationChoice][0];
  
  const careerChoice = answers[2];
  const career = CAREER_MAPPINGS[careerChoice][0];
  
  const educationChoice = answers[0];
  const education = EDUCATION_MAPPINGS[educationChoice];
  
  const relationshipChoice = answers[3];
  const relationship = RELATIONSHIP_MAPPINGS[relationshipChoice];
  
  const hobbyChoice = answers[4];
  const hobbies = HOBBY_MAPPINGS[hobbyChoice];
  
  const healthBase = answers[4] === 1 ? 85 : 70;
  const healthScore = Math.min(100, healthBase + 5);
  
  const financialBase = answers[2] === 2 ? 80 : answers[2] === 0 ? 75 : 60;
  const financialScore = Math.min(100, financialBase + 5);
  
  return {
    career,
    city: cityData.city,
    country: cityData.country,
    education,
    relationship,
    hobbies,
    healthScore,
    financialScore
  };
}

function generateDivergencePoints(
  answers: number[],
  parallelChoices: number[],
  random: () => number
): DivergencePoint[] {
  const points: DivergencePoint[] = [];
  const numPoints = 3 + Math.floor(random() * 3);
  
  const selectedAges: number[] = [];
  const availableAges = [...AGES];
  
  for (let i = 0; i < numPoints && availableAges.length > 0; i++) {
    const idx = Math.floor(random() * availableAges.length);
    selectedAges.push(availableAges[idx]);
    availableAges.splice(idx, 1);
  }
  
  selectedAges.sort((a, b) => a - b);
  
  for (const age of selectedAges) {
    const crossroadIdx = AGES.indexOf(age);
    if (crossroadIdx === -1) continue;
    
    const realAnswer = answers[crossroadIdx];
    const parallelAnswer = parallelChoices[crossroadIdx];
    
    const crossroad = CROSSROADS[crossroadIdx];
    const realOutcome = crossroad.options[realAnswer].label;
    const parallelOutcome = crossroad.options[parallelAnswer].label;
    
    points.push({
      age,
      choice: crossroad.question,
      realOutcome,
      parallelOutcome
    });
  }
  
  return points;
}

function calculateDivergenceScore(
  answers: number[],
  parallelChoices: number[],
  random: () => number
): number {
  let score = 0;
  const weights = [0.8, 0.9, 0.95, 0.6, 0.3, 0.5, 0.7];
  
  for (let i = 0; i < answers.length; i++) {
    const diff = Math.abs(answers[i] - parallelChoices[i]);
    score += diff * weights[i] * 15;
  }
  
  score += random() * 10;
  
  return Math.min(100, Math.round(score));
}

export function generateLifeDataStrings(parallelPath: LifePath, realPath: LifePath, random: () => number): string[] {
  const incomeDiff = (parallelPath.financialScore - realPath.financialScore) * 1000;
  const incomeStr = incomeDiff >= 0 
    ? `~$${incomeDiff.toLocaleString()} more` 
    : `~$${Math.abs(incomeDiff).toLocaleString()} fewer`;
  
  const hobbyIndex = Object.values(HOBBY_MAPPINGS).findIndex(h => h === parallelPath.hobbies);
  const weekendActivity = hobbyIndex >= 0 ? WEEKEND_ACTIVITIES[hobbyIndex] : 'exploring the city';
  
  const altCareerAge = 25 + Math.floor(random() * 10);
  const altCareer = CAREER_MAPPINGS[0][1];
  
  return [
    `Your parallel self earns ${incomeStr} than you`,
    `They live in ${parallelPath.city} and spend weekends ${weekendActivity}`,
    `They almost became a ${altCareer} at age ${altCareerAge}`
  ];
}

export function generateParallelProfile(birthdate: string, answers: number[]): ParallelProfile {
  const seed = hashBirthdate(birthdate);
  const random = seededRandom(seed);
  
  const parallelChoices = answers.map(a => getParallelChoice(a, random));
  
  const realPath = generateRealPath(answers);
  const parallelPath = generateParallelPath(answers, parallelChoices, random);
  
  const divergencePoints = generateDivergencePoints(answers, parallelChoices, random);
  const divergenceScore = calculateDivergenceScore(answers, parallelChoices, random);
  
  const id = `parallel-${hashBirthdate(birthdate + answers.join(''))}`;
  
  return {
    id,
    birthdate,
    crossroads: CROSSROADS,
    realPath,
    parallelPath,
    divergencePoints,
    divergenceScore
  };
}

export function getDivergenceLabel(score: number): string {
  if (score <= 25) return 'Slight drift';
  if (score <= 50) return 'Notable divergence';
  if (score <= 75) return 'Radically different';
  return 'Unrecognizable';
}

export function getDailyPrompt(): string {
  const prompts = [
    'What if you moved to a different country at 22?',
    'What if you chose a completely different career path?',
    'What if you never went to college?',
    'What if you started your own business at 18?',
    'What if you stayed in your hometown forever?',
    'What if you took that risk you were afraid of?',
    'What if you focused entirely on your passion?'
  ];
  
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  return prompts[dayOfYear % prompts.length];
}

export function generateReRoll(
  birthdate: string,
  answers: number[],
  rerollIndex: number
): ParallelProfile {
  const seed = hashBirthdate(birthdate) + rerollIndex * 1000;
  const random = seededRandom(seed);
  
  const parallelChoices = answers.map(a => getParallelChoice(a, random));
  
  const realPath = generateRealPath(answers);
  const parallelPath = generateParallelPath(answers, parallelChoices, random);
  
  const divergencePoints = generateDivergencePoints(answers, parallelChoices, random);
  const divergenceScore = calculateDivergenceScore(answers, parallelChoices, random);
  
  const id = `parallel-${hashBirthdate(birthdate + answers.join('') + rerollIndex)}`;
  
  return {
    id,
    birthdate,
    crossroads: CROSSROADS,
    realPath,
    parallelPath,
    divergencePoints,
    divergenceScore
  };
}
