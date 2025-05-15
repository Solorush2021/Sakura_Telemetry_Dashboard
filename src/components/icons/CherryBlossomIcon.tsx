// src/components/icons/CherryBlossomIcon.tsx
import type { SVGProps } from 'react';

export function CherryBlossomIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`neon-glow ${props.className || ''}`}
      {...props}
    >
      <path d="M12 2.5C12 2.5 11.5 4 10 5C8.5 6 7 7 7 8.5C7 10 8.5 11.5 10 11.5C11.5 11.5 12 10 12 10" />
      <path d="M12 2.5C12 2.5 12.5 4 14 5C15.5 6 17 7 17 8.5C17 10 15.5 11.5 14 11.5C12.5 11.5 12 10 12 10" />
      <path d="M12 21.5C12 21.5 11.5 20 10 19C8.5 18 7 17 7 15.5C7 14 8.5 12.5 10 12.5C11.5 12.5 12 14 12 14" />
      <path d="M12 21.5C12 21.5 12.5 20 14 19C15.5 18 17 17 17 15.5C17 14 15.5 12.5 14 12.5C12.5 12.5 12 14 12 14" />
      <path d="M2.5 12C2.5 12 4 11.5 5 10C6 8.5 7 7 8.5 7C10 7 11.5 8.5 11.5 10C11.5 11.5 10 12 10 12" />
      <path d="M21.5 12C21.5 12 20 11.5 19 10C18 8.5 17 7 15.5 7C14 7 12.5 8.5 12.5 10C12.5 11.5 14 12 14 12" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
