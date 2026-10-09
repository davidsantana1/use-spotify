import type { ComponentProps } from "react";

export function Panel({ className = "", ...props }: ComponentProps<"section">) {
  return (
    <section
      className={`no-scrollbar min-h-96 w-full min-w-0 max-h-96 overflow-auto rounded-[20px] border border-white/18 bg-linear-135 from-white/10 to-white/0 p-4 font-bold shadow-[0_8px_32px_rgb(0_0_0/0.37)] backdrop-blur-[10px] sm:max-h-112 sm:p-8 lg:h-128 lg:max-h-none ${className}`}
      {...props}
    />
  );
}
