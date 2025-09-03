import { memo, useEffect, useState } from "react";

interface ArrowIconProps extends React.SVGProps<SVGSVGElement> {
  direction?: "left" | "right";
  stroke?: string;
  strokeWidth?: number;
}

export const ArrowIcon = memo(
  ({
    direction = "left",
    stroke = "#42567A",
    strokeWidth = 2,
    ...props
  }: ArrowIconProps) => {
    const [size, setSize] = useState<"small" | "large">("large");

    useEffect(() => {
      const checkMobile = () =>
        setSize(window.innerWidth <= 768 ? "large" : "small");

      checkMobile();
      window.addEventListener("resize", checkMobile);

      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const dimensions = {
      small: { width: 7, height: 8, viewBox: "0 0 7 8" },
      large: { width: 10, height: 14, viewBox: "0 0 10 14" },
    };

    const pathData = {
      left: {
        small: "M5.41614 1.04177L2.29114 4.16677L5.41614 7.29177",
        large: "M8.49988 0.750001L2.24988 7L8.49988 13.25",
      },
      right: {
        small: "M1.58386 1.04177L4.70886 4.16677L1.58386 7.29177",
        large: "M1.50012 0.750001L7.75012 7L1.50012 13.25",
      },
    };

    const { width, height, viewBox } = dimensions[size];
    const d = pathData[direction][size];

    return (
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d={d} stroke={stroke} strokeWidth={strokeWidth} />
      </svg>
    );
  }
);
