export default function EventCardSkeleton() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="h-44 w-full animate-pulse bg-surface" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-surface" />
        <div className="h-3 w-full animate-pulse rounded bg-surface" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-surface" />
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="h-3 w-16 animate-pulse rounded bg-surface" />
          <div className="h-3 w-16 animate-pulse rounded bg-surface" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="h-4 w-10 animate-pulse rounded bg-surface" />
          <div className="h-7 w-20 animate-pulse rounded-lg bg-surface" />
        </div>
      </div>
    </div>
  );
}