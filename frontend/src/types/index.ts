export interface Requirement {
  minGPA: number;
  ieltsMin: number;
  toeflMin: number;
  satMin: number | null;
  greMin: number | null;
  applicationDeadline: string;
  tuitionFeeUSD: number;
  acceptanceRate: number;
}

export interface Stats {
  studentCount: number;
  internationalPercent: number;
  researchOutput: string;
  facultyStudentRatio: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  globalRank: number;
  logoUrl: string | null;
  website: string;
  description: string;
  specialties: string[];
  requirements: Requirement;
  stats: Stats;
}

export interface ApiResponse<T> {
  data: T;
  error: string | null;
  meta: { total: number; page: number; limit: number; pages: number } | null;
}

export interface FilterOptions {
  countries: string[];
  specialties: string[];
}
