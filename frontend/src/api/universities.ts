import type { ApiResponse, University, FilterOptions } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface UniversityQueryParams {
  country?: string;
  specialty?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export async function fetchUniversities(
  params: UniversityQueryParams
): Promise<ApiResponse<University[]>> {
  const query = new URLSearchParams();
  if (params.country) query.set('country', params.country);
  if (params.specialty) query.set('specialty', params.specialty);
  if (params.search) query.set('search', params.search);
  if (params.page !== undefined) query.set('page', String(params.page));
  if (params.limit !== undefined) query.set('limit', String(params.limit));

  const url = `${BASE_URL}/api/universities${query.toString() ? `?${query.toString()}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch universities: ${res.status}`);
  }
  return res.json() as Promise<ApiResponse<University[]>>;
}

export async function fetchUniversityById(id: string): Promise<ApiResponse<University>> {
  const res = await fetch(`${BASE_URL}/api/universities/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch university ${id}: ${res.status}`);
  }
  return res.json() as Promise<ApiResponse<University>>;
}

export async function fetchFilters(): Promise<ApiResponse<FilterOptions>> {
  const res = await fetch(`${BASE_URL}/api/filters`);
  if (!res.ok) {
    throw new Error(`Failed to fetch filters: ${res.status}`);
  }
  return res.json() as Promise<ApiResponse<FilterOptions>>;
}
