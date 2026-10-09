const LINE_WIDTHS = ["w-3/4", "w-1/2", "w-2/3", "w-5/6"];

export function SkeletonRows({ count, withThumb = false }: { count: number; withThumb?: boolean }) {
  return (
    <ul aria-hidden="true" className="flex flex-col gap-2">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="flex items-center gap-3 p-2">
          {withThumb && <div className="skeleton size-13 shrink-0" />}
          <div className={`skeleton h-4 ${LINE_WIDTHS[i % LINE_WIDTHS.length]}`} />
        </li>
      ))}
    </ul>
  );
}

export function AlbumDetailsSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:gap-6">
        <div className="skeleton aspect-square w-full max-w-100 rounded-xl xl:w-56 xl:shrink-0" />
        <div className="flex flex-1 flex-col gap-3">
          <div className="skeleton h-4 w-1/3" />
          <div className="skeleton h-7 w-2/3" />
          <div className="skeleton h-14 w-55 rounded-xl" />
        </div>
      </div>
      <SkeletonRows count={4} />
    </div>
  );
}
