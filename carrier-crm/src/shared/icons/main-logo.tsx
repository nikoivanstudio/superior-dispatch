import type { FC, SVGProps } from 'react';

export const MainLogo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="330"
    height="435"
    viewBox="0 0 330 435"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      fill="none"
      stroke="#FF4A4A"
      stroke-width="22"
      stroke-linecap="square"
      stroke-linejoin="miter"
    >
      <path
        d="M165 56
             C103 56 54 104 54 164
             C54 207 82 246 118 282
             L165 329
             L212 282
             C248 246 276 207 276 164
             C276 104 227 56 165 56Z"
      />

      <path
        d="M165 113
             C126 113 95 144 95 181
             C95 206 111 229 132 250"
      />
      <path
        d="M165 113
             C204 113 235 144 235 181
             C235 217 208 245 173 252"
      />

      <circle cx="165" cy="181" r="31" />
    </g>
  </svg>
);
