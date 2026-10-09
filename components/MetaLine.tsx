interface MetaLineProps {
  items: (string | number | undefined)[];
  className?: string;
}

export function MetaLine({ items, className = "" }: MetaLineProps) {
  return (
    <p className={`flex flex-wrap items-center gap-x-1.5 text-sm font-normal text-muted ${className}`}>
      {items.filter(Boolean).map((item, i) => (
        <span key={i} className="flex items-center gap-x-1.5">
          {i > 0 && (
            <span aria-hidden="true" className="text-[0.5em]">
              &#9679;
            </span>
          )}
          {item}
        </span>
      ))}
    </p>
  );
}
