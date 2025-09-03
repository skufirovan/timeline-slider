import clsx from "clsx";
import { Slider } from "@widgets/index";
import s from "./HomePage.module.scss";

export const HomePage = () => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.verticalLine} />
        <div className={s.horizontalLine} />
        <h1 className={clsx(s.title, "pt-sans-bold")}>
          Исторические
          <br />
          даты
        </h1>
        <Slider className={s.slider} />
      </div>
    </div>
  );
};
