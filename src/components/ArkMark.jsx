// Deploy Arc mark — arc in Paper/Ink, stem + arrowhead always Ember, never filled.
export default function ArkMark({ size = 32, arc = "#FAFAF9", strokeWidth = 3.5 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DeployArk mark"
    >
      <path
        d="M10 38 Q28 12 46 38"
        stroke={arc}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="26"
        x2="28"
        y2="46"
        stroke="#C47B3A"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M21 33 L28 23 L35 33"
        stroke="#C47B3A"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
