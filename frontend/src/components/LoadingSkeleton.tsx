function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-200 ${className ?? ''}`}
      aria-hidden="true"
    />
  );
}

export function UniversityRowSkeleton() {
  return (
    <div className="flex items-start gap-4 px-4 py-5" aria-hidden="true">
      {/* Rank circle */}
      <SkeletonBlock className="w-10 h-10 rounded-full shrink-0" />

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex justify-between gap-4">
          <SkeletonBlock className="h-5 w-64 max-w-full" />
          <SkeletonBlock className="h-5 w-20 shrink-0" />
        </div>
        <SkeletonBlock className="h-4 w-36" />
        <div className="flex gap-1.5 mt-2">
          <SkeletonBlock className="h-5 w-20 rounded-full" />
          <SkeletonBlock className="h-5 w-24 rounded-full" />
          <SkeletonBlock className="h-5 w-16 rounded-full" />
        </div>
        <div className="flex justify-between mt-2">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-8 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function UniversityListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div
      className="divide-y divide-gray-100"
      role="status"
      aria-label="Loading universities"
    >
      {Array.from({ length: count }).map((_, i) => (
        <UniversityRowSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div role="status" aria-label="Loading university details">
      {/* Hero skeleton */}
      <div className="h-56 animate-pulse" style={{ backgroundColor: '#1a2b4a', opacity: 0.7 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-3">
          <div className="h-10 w-12 rounded-full bg-gray-500" />
          <div className="h-8 w-96 max-w-full rounded bg-gray-500" />
          <div className="h-5 w-48 rounded bg-gray-500" />
          <div className="h-5 w-32 rounded bg-gray-500" />
        </div>
      </div>
      {/* Content skeleton */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <SkeletonBlock className="h-5 w-full" />
        <SkeletonBlock className="h-5 w-full" />
        <SkeletonBlock className="h-5 w-3/4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonBlock key={i} className="h-20 rounded-lg" />
          ))}
        </div>
        <SkeletonBlock className="h-48 rounded-lg mt-4" />
      </div>
    </div>
  );
}
