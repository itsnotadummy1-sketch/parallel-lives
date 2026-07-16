export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-[#e0e0e0]">Who would you be if you </span>
          <span className="text-[#7c5cbf]">chose differently?</span>
        </h1>
        <p className="text-xl text-[#9a9aab] mb-12">
          Explore the life you didn't live.
        </p>
        <a
          href="/questionnaire"
          className="inline-block px-8 py-4 bg-[#7c5cbf] text-white rounded-lg font-semibold hover:bg-[#5a3d9e] transition-colors"
        >
          Meet your parallel self
        </a>
      </div>
    </div>
  );
}
