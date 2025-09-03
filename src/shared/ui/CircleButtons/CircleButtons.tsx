import clsx from "clsx";
import { config } from "@shared/config";
import s from "./CircleButtons.module.scss";

export const CircleButtons = ({
  currentIndex,
  total,
  radius,
  className,
  ref,
  onClick,
}: {
  currentIndex: number;
  total: number;
  radius: number;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  onClick: (index: number) => void;
}) => {
  return (
    <div className={className} ref={ref}>
      {Object.values(config).map((_, index) => {
        const angle = (2 * Math.PI * index) / total - Math.PI / 2 + Math.PI / 6;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <button
            key={index}
            onClick={() => onClick(index)}
            className={clsx(
              s.circleButton,
              "pt-sans-regular",
              index === currentIndex && s.active
            )}
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <p>{index + 1}</p>
          </button>
        );
      })}
    </div>
  );
};
