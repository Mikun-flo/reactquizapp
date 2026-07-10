const ICONS = {
  back: (
    <path d="M19 12H5m0 0l7-7m-7 7l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M12 1v2m0 18v2m11-11h-2M3 12H1m17.66 6.34l-1.42-1.42M6.76 6.76L5.34 5.34m12.02 0l-1.42 1.42M6.76 17.24l-1.42 1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  moon: (
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  correct: (
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  incorrect: (
    <>
      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  error: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" />
    </>
  ),
  history: (
    <>
      <path d="M12 6V12l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  science: (
    <>
      <path d="M12 2C9.238 2 7 4.238 7 7c0 1.338.52 2.552 1.36 3.44C7.5 12.5 6 14.746 6 17c0 3.314 2.686 6 6 6s6-2.686 6-6c0-2.254-1.5-4.5-2.36-6.56A5.974 5.974 0 0017 7c0-2.762-2.238-5-5-5z" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="7" r="1" fill="currentColor" />
    </>
  ),
  geography: (
    <>
      <path d="M12 21s-4-4.5-4-8a4 4 0 118 0c0 3.5-4 8-4 8z" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="11" r="2" fill="currentColor" />
    </>
  ),
  literature: (
    <>
      <path d="M6 4.5h12a2 2 0 012 2V20a1 1 0 01-1.447.894L12 17.118l-6.553 3.776A1 1 0 014 20V6.5a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M8 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
};

export default function SVGIcon({ name, className = "", ...props }) {
  const icon = ICONS[name] ?? ICONS.error;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {icon}
    </svg>
  );
}
