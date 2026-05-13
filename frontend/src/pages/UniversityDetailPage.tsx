import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUniversityById } from '../api/universities';
import { DetailPageSkeleton } from '../components/LoadingSkeleton';

const FLAG_MAP: Record<string, string> = {
  USA: '🇺🇸',
  UK: '🇬🇧',
  Switzerland: '🇨🇭',
  Singapore: '🇸🇬',
  Canada: '🇨🇦',
  Germany: '🇩🇪',
  Australia: '🇦🇺',
  China: '🇨🇳',
  'South Korea': '🇰🇷',
};

function formatTuition(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

function acceptanceBadgeStyle(rate: number): { backgroundColor: string; color: string } {
  if (rate > 30) return { backgroundColor: '#d1fae5', color: '#065f46' };
  if (rate >= 10) return { backgroundColor: '#fef9c3', color: '#854d0e' };
  return { backgroundColor: '#fee2e2', color: '#991b1b' };
}

interface StatCardProps {
  label: string;
  value: string | number;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div
      className="rounded-xl border p-4 flex flex-col gap-1"
      style={{ borderColor: '#e5e7eb', backgroundColor: '#f8f9fa' }}
    >
      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>
        {label}
      </span>
      <span className="text-xl font-bold" style={{ color: '#1a1a2e' }}>
        {value}
      </span>
    </div>
  );
}

interface RequirementRowProps {
  label: string;
  value: ReactNode;
}

function RequirementRow({ label, value }: RequirementRowProps) {
  return (
    <div
      className="flex items-center justify-between py-3 border-b last:border-0"
      style={{ borderColor: '#e5e7eb' }}
    >
      <span className="text-sm font-medium" style={{ color: '#6b7280' }}>
        {label}
      </span>
      <span className="text-sm font-semibold" style={{ color: '#1a1a2e' }}>
        {value}
      </span>
    </div>
  );
}

export default function UniversityDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['university', id],
    queryFn: () => fetchUniversityById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
        <DetailPageSkeleton />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: '#f8f9fa' }}>
        <p className="text-sm font-medium text-red-600">
          {error instanceof Error ? error.message : 'University not found.'}
        </p>
        <Link
          to="/"
          className="text-sm font-medium hover:underline focus:outline-none focus:underline"
          style={{ color: '#1a2b4a' }}
        >
          ← Back to Rankings
        </Link>
      </div>
    );
  }

  const university = data.data;
  const { requirements, stats } = university;
  const flag = FLAG_MAP[university.country] ?? '';
  const badgeStyle = acceptanceBadgeStyle(requirements.acceptanceRate);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Hero */}
      <section style={{ backgroundColor: '#1a2b4a' }} aria-label="University hero">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium border rounded-md px-3 py-1.5 mb-6 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white"
            style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
          >
            ← Back to Rankings
          </Link>

          <div className="flex flex-wrap items-start gap-4">
            {/* Rank badge */}
            <div
              className="shrink-0 flex items-center justify-center w-16 h-16 rounded-full font-bold text-white text-lg"
              style={{ backgroundColor: '#e63946' }}
              aria-label={`Global rank ${university.globalRank}`}
            >
              #{university.globalRank}
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-white leading-tight">
                {university.name}
              </h1>
              <p className="text-blue-200 text-base mt-1">
                {flag} {university.city}, {university.country}
              </p>
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-300 text-sm mt-2 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded"
              >
                {university.website}
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Section 1 — Overview */}
        <section aria-labelledby="overview-heading">
          <h2
            id="overview-heading"
            className="text-xl font-bold mb-4"
            style={{ color: '#1a1a2e' }}
          >
            Overview
          </h2>
          <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6" style={{ borderColor: '#e5e7eb' }}>
            <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
              {university.description}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard
                label="Total Students"
                value={stats.studentCount.toLocaleString('en-US')}
              />
              <StatCard
                label="International"
                value={`${stats.internationalPercent}%`}
              />
              <StatCard
                label="Research Output"
                value={stats.researchOutput}
              />
              <StatCard
                label="Faculty : Student"
                value={stats.facultyStudentRatio}
              />
            </div>
          </div>
        </section>

        {/* Section 2 — Admission Requirements */}
        <section aria-labelledby="requirements-heading">
          <h2
            id="requirements-heading"
            className="text-xl font-bold mb-4"
            style={{ color: '#1a1a2e' }}
          >
            Admission Requirements
          </h2>
          <div className="rounded-xl border bg-white p-6 shadow-sm" style={{ borderColor: '#e5e7eb' }}>
            <RequirementRow label="Minimum GPA" value={`${requirements.minGPA} / 4.0`} />
            <RequirementRow label="IELTS" value={`${requirements.ieltsMin}+`} />
            <RequirementRow label="TOEFL" value={`${requirements.toeflMin}+`} />
            <RequirementRow
              label="SAT"
              value={requirements.satMin !== null ? `${requirements.satMin}+` : 'Not required'}
            />
            <RequirementRow
              label="GRE"
              value={requirements.greMin !== null ? `${requirements.greMin}+` : 'Not required'}
            />
            <RequirementRow
              label="Application Deadline"
              value={requirements.applicationDeadline}
            />
            <RequirementRow
              label="Annual Tuition"
              value={formatTuition(requirements.tuitionFeeUSD)}
            />
            <RequirementRow
              label="Acceptance Rate"
              value={
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold"
                  style={badgeStyle}
                >
                  {requirements.acceptanceRate}%
                </span>
              }
            />
          </div>
        </section>

        {/* Section 3 — Specialties */}
        <section aria-labelledby="specialties-heading">
          <h2
            id="specialties-heading"
            className="text-xl font-bold mb-4"
            style={{ color: '#1a1a2e' }}
          >
            Specialties
          </h2>
          <div className="rounded-xl border bg-white p-6 shadow-sm" style={{ borderColor: '#e5e7eb' }}>
            <div className="flex flex-wrap gap-2">
              {university.specialties.map((spec) => (
                <span
                  key={spec}
                  className="inline-block rounded-full px-4 py-1.5 text-sm font-medium"
                  style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
