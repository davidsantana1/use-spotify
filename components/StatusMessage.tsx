import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface StatusMessageProps {
  title: ReactNode;
  hint?: ReactNode;
  icon?: LucideIcon;
  children?: ReactNode;
}

export function StatusMessage({ title, hint, icon: Icon, children }: StatusMessageProps) {
  return (
    <div role="status" className="flex w-full flex-1 flex-col items-center justify-center gap-1 py-10 text-center">
      {Icon && (
        <span className="mb-3 grid size-14 place-items-center rounded-full bg-white/10 text-muted">
          <Icon aria-hidden="true" className="size-6" strokeWidth={2} />
        </span>
      )}
      <div className="font-bold">{title}</div>
      {hint && <p className="max-w-xs text-sm font-normal text-balance text-muted">{hint}</p>}
      {children && <div className="mt-4 flex flex-wrap justify-center gap-2">{children}</div>}
    </div>
  );
}
