export interface LifeCrossroad {
  id: string;
  question: string;
  options: {
    label: string;
    category: string;
    impact: number;
  }[];
}

export interface LifePath {
  career: string;
  city: string;
  country: string;
  education: string;
  relationship: string;
  hobbies: string;
  healthScore: number;
  financialScore: number;
}

export interface DivergencePoint {
  age: number;
  choice: string;
  realOutcome: string;
  parallelOutcome: string;
}

export interface ParallelProfile {
  id: string;
  birthdate: string;
  crossroads: LifeCrossroad[];
  realPath: LifePath;
  parallelPath: LifePath;
  divergencePoints: DivergencePoint[];
  divergenceScore: number;
}
