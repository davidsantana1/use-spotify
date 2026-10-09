const GRADIENT_STOPS = 3;

export function paletteGradient(colors: string[], strength = 100) {
  if (colors.length < 2) return undefined;
  const stops = colors
    .slice(0, GRADIENT_STOPS)
    .map((color) => (strength === 100 ? color : `color-mix(in oklab, ${color} ${strength}%, var(--color-surface))`));
  return `linear-gradient(90deg, ${stops.join(", ")})`;
}
