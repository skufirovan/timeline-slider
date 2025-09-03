import { memo } from "react";
import clsx from "clsx";
import { ArrowIcon } from "@shared/ui/ArrowIcon";
import s from "./Navigation.module.scss";

type NavigationProps = {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
};

export const Navigation = memo(
  ({ currentIndex, total, onPrev, onNext, className }: NavigationProps) => {
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === total - 1;

    return (
      <div className={clsx(s.container, className, "pt-sans-regular")}>
        <p className={s.counter}>
          0{currentIndex + 1}/0{total}
        </p>
        <div>
          <button className={s.button} onClick={onPrev} disabled={isFirst}>
            <ArrowIcon />
          </button>
          <button className={s.button} onClick={onNext} disabled={isLast}>
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    );
  }
);
