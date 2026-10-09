import type { ComponentProps } from "react";

export function Panel({ className = "", ...props }: ComponentProps<"section">) {
  return (
    <section
      className={`no-scrollbar h-full w-full min-w-0 overflow-auto rounded-[20px] border border-white/18 bg-linear-135 from-white/10 to-white/0 p-4 font-bold shadow-[0_8px_32px_rgb(0_0_0/0.37)] backdrop-blur-[10px] sm:p-8 ${className}`}
      {...props}
    />
  );
}
