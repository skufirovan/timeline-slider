import { memo } from "react";

export const ArrowIcon = memo(
  ({
    direction = "left",
    stroke = "#42567A",
    strokeWidth = 2,
    ...props
  }: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d={
          direction === "left"
            ? "M8.49988 0.750001L2.24988 7L8.49988 13.25"
            : "M1.50012 0.750001L7.75012 7L1.50012 13.25"
        }
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
);
