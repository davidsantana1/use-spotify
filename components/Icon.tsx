const PATHS = {
  chevronLeft: "M15.75 19.5 8.25 12l7.5-7.5",
  chevronRight: "m8.25 4.5 7.5 7.5-7.5 7.5",
  xMark: "M6 18 18 6M6 6l12 12",
  search: "m21 21-5.2-5.2M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z",
  musicNote:
    "m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z",
  warning:
    "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
  external: "M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25",
};

export type IconName = keyof typeof PATHS;

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className = "size-4", strokeWidth = 2.5 }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d={PATHS[name]} />
    </svg>
  );
}
