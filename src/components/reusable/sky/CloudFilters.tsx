/*
The turbulence filters that give the clouds their ragged edges. Three
variations so neighbouring clouds don't look stamped from one mould.

Rendered once per page — the filters are referenced by id from every sky
window on it.
*/

const VARIANTS = [
  { id: 'cloud-a', frequency: 0.022, seed: 3, scale: 58, blur: 4.5 },
  { id: 'cloud-b', frequency: 0.026, seed: 11, scale: 48, blur: 4 },
  { id: 'cloud-c', frequency: 0.02, seed: 27, scale: 64, blur: 5 },
];

export default function CloudFilters() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      className="absolute h-0 w-0"
      focusable="false"
    >
      <defs>
        {VARIANTS.map(({ id, frequency, seed, scale, blur }) => (
          <filter key={id} id={id} x="-50%" y="-80%" width="200%" height="260%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={frequency}
              numOctaves="4"
              seed={seed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="warp"
            />
            <feGaussianBlur in="warp" stdDeviation={blur} />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
