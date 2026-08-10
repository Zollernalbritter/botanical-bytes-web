export function LeafMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <rect width="512" height="512" rx="112" fill="#5A7A4B" />
      <path
        d="M256 428V268"
        stroke="#F9F8F5"
        strokeWidth="34"
        strokeLinecap="round"
      />
      <path
        d="M254 292C254 210 198 158 116 150c4 84 62 134 138 142z"
        fill="#F9F8F5"
      />
      <path
        d="M258 244c0-66 46-108 116-114-4 68-52 110-116 114z"
        fill="#F9F8F5"
      />
    </svg>
  );
}
