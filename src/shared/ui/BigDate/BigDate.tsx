import clsx from "clsx";
import s from "./BigDate.module.scss";

type BigDateProps = {
  date: [number, number];
  className?: string;
  fuchsiaRef?: React.Ref<HTMLSpanElement>;
  irisRef?: React.Ref<HTMLSpanElement>;
};

export const BigDate = ({
  date,
  className,
  fuchsiaRef,
  irisRef,
}: BigDateProps) => {
  return (
    <p className={clsx(s.text, className, "pt-sans-bold")}>
      <span ref={irisRef} className={s.iris}>
        {date[0]}
      </span>
      <span ref={fuchsiaRef} className={s.fuchsia}>
        {date[1]}
      </span>
    </p>
  );
};
