export default function TshirtIcon({
  color = "#000000",
  size = 34,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="M22 8L17 14L8 18L12 28L18 25V56H46V25L52 28L56 18L47 14L42 8L36 10L32 16L28 10L22 8Z"
      />
      <path
        d="M22 8L17 14L8 18L12 28L18 25V56H46V25L52 28L56 18L47 14L42 8L36 10L32 16L28 10L22 8Z"
        fill="none"
        stroke="#222"
        strokeWidth="2"
      />
    </svg>
  );
}