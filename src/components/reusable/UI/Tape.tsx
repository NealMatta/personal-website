/*
A strip of masking tape with something written on it.

The tilt is what sells it — nothing I label by hand comes out straight, so
nothing here should either. Pass a different angle per card.
*/

interface TapeProps {
  children: React.ReactNode;
  /** Degrees of rotation, e.g. -2 or 1.5. */
  tilt?: number;
  /** Font size in px; the design runs 20–34 depending on the card. */
  size?: number;
  className?: string;
}

export default function Tape({
  children,
  tilt = -2,
  size = 28,
  className = '',
}: TapeProps) {
  return (
    <span
      className={`tape ${className}`}
      style={{ transform: `rotate(${tilt}deg)`, fontSize: `${size}px` }}
    >
      {children}
    </span>
  );
}
