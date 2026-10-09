import { type RefObject, useEffect, useState } from "react";

export function useInView(ref: RefObject<Element | null>, initialInView = false) {
  const [isInView, setIsInView] = useState(initialInView);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(!!entry?.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return isInView;
}
