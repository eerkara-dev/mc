/* Inline SVG icons — replaces lucide-react to eliminate ~345KB from the bundle */

type IconProps = { size?: number; className?: string; color?: string };

function svg(
  d: string | string[],
  { size = 24, className, color, ...rest }: IconProps & Record<string, unknown> = {}
) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {paths.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}

export function Plane(p: IconProps) {
  return svg(
    [
      "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.2.4.7.5 1.1.3l.5-.3c.4-.2.6-.6.5-1.1z",
    ],
    p
  );
}

export function ArrowLeftRight(p: IconProps) {
  return svg(["M8 3 4 7l4 4", "M4 7h16", "M16 21l4-4-4-4", "M20 17H4"], p);
}

export function Search(p: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={p.size || 24}
      height={p.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={p.color || "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function ChevronDown(p: IconProps) {
  return svg("m6 9 6 6 6-6", p);
}

export function ChevronRight(p: IconProps) {
  return svg("m9 18 6-6-6-6", p);
}

export function RefreshCw(p: IconProps) {
  return svg(
    ["M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", "M21 3v5h-5", "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", "M3 21v-5h5"],
    p
  );
}

export function Check(p: IconProps) {
  return svg("M20 6 9 17l-5-5", p);
}

export function Minus(p: IconProps) {
  return svg("M5 12h14", p);
}

export function Plus(p: IconProps) {
  return svg(["M5 12h14", "M12 5v14"], p);
}

export function PanelLeftClose(p: IconProps) {
  return svg(
    ["M18 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z", "M9 3v18", "m16 15-3-3 3-3"],
    p
  );
}

export function PanelLeftOpen(p: IconProps) {
  return svg(
    ["M18 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z", "M9 3v18", "m14 9 3 3-3 3"],
    p
  );
}

export function PlusCircle(p: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={p.size || 24}
      height={p.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={p.color || "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

export function SlidersHorizontal(p: IconProps) {
  return svg(
    ["M21 4h-7", "M10 4H3", "M21 12h-11", "M6 12H3", "M21 20h-7", "M10 20H3", "M14 2v4", "M6 10v4", "M14 18v4"],
    p
  );
}

export function CalendarDays(p: IconProps) {
  return svg(
    [
      "M8 2v4",
      "M16 2v4",
      "M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8",
      "M3 10h18",
      "M8 14h.01",
      "M12 14h.01",
      "M16 14h.01",
      "M8 18h.01",
      "M12 18h.01",
    ],
    p
  );
}

export function Link2(p: IconProps) {
  return svg(
    ["M9 17H7A5 5 0 0 1 7 7h2", "M15 7h2a5 5 0 1 1 0 10h-2", "M8 12h8"],
    p
  );
}

export function Heart(p: IconProps) {
  return svg(
    "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
    p
  );
}

export function LayoutGrid(p: IconProps) {
  return svg(
    [
      "M3 3h7v7H3z",
      "M14 3h7v7h-7z",
      "M14 14h7v7h-7z",
      "M3 14h7v7H3z",
    ],
    p
  );
}

export function LogOut(p: IconProps) {
  return svg(["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "m16 17 5-5-5-5", "M21 12H9"], p);
}

export function Clock(p: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={p.size || 24}
      height={p.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={p.color || "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function ArrowUpRight(p: IconProps) {
  return svg(["M7 7h10", "M17 7v10", "M7 17 17 7"], p);
}

export function ArrowDownRight(p: IconProps) {
  return svg(["M7 7l10 10", "M17 7v10", "M7 17h10"], p);
}

export function RotateCcw(p: IconProps) {
  return svg(["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", "M3 3v5h5"], p);
}

export function ChevronsUpDown(p: IconProps) {
  return svg(["m7 15 5 5 5-5", "m7 9 5-5 5 5"], p);
}
