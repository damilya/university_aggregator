import { Link } from 'react-router-dom';
import type { University } from '../types';

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
  return `$${amount.toLocaleString('en-US')}/yr`;
}

interface UniversityRowProps {
  university: University;
}

export default function UniversityRow({ university }: UniversityRowProps) {
  const flag = FLAG_MAP[university.country] ?? '';
  const { requirements } = university;

  return (
    <article className="flex items-start gap-4 px-4 py-5 hover:bg-gray-50 transition-colors rounded-lg group">
      {/* Rank badge */}
      <div
        className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full font-bold text-white text-sm"
        style={{ backgroundColor: '#e63946' }}
        aria-label={`Rank ${university.globalRank}`}
      >
        {university.globalRank}
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              to={`/university/${university.id}`}
              className="text-lg font-bold text-gray-900 hover:underline focus:outline-none focus:underline truncate block"
              style={{ color: '#1a1a2e' }}
            >
              {university.name}
            </Link>
            <p className="text-sm mt-0.5" style={{ color: '#6b7280' }}>
              {flag} {university.city}, {university.country}
            </p>
          </div>

          {/* Tuition */}
          <div className="shrink-0 text-right">
            <span className="text-sm font-semibold text-gray-800">
              {formatTuition(requirements.tuitionFeeUSD)}
            </span>
            <p className="text-xs text-gray-500">tuition</p>
          </div>
        </div>

        {/* Specialty tags */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {university.specialties.map((spec) => (
            <span
              key={spec}
              className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600">
              <span className="text-gray-400">Acceptance:</span>
              <span className="font-semibold text-gray-800">
                {requirements.acceptanceRate}%
              </span>
            </span>
          </div>

          <Link
            to={`/university/${university.id}`}
            className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{ backgroundColor: '#e63946' }}
            aria-label={`View details for ${university.name}`}
          >
            View Details
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
