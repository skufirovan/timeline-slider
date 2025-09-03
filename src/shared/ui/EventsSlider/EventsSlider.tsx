import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import clsx from "clsx";
import { Event } from "@shared/config";
import { ArrowIcon } from "../ArrowIcon";
import s from "./EventsSlider.module.scss";

interface EventsSliderProps {
  events: Event[];
  ref?: React.Ref<HTMLDivElement>;
}

export const EventsSlider = ({ events, ref }: EventsSliderProps) => {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className={clsx(s.eventsContainer, "pt-sans-regular")} ref={ref}>
      <button className={clsx(s.navButton, s.navButtonPrev)}>
        <ArrowIcon stroke="#3877ee" />
      </button>

      <Swiper
        modules={[Navigation]}
        slidesPerView={"auto"}
        spaceBetween={80}
        freeMode={true}
        grabCursor={true}
        navigation={{
          nextEl: `.${s.navButtonNext}`,
          prevEl: `.${s.navButtonPrev}`,
        }}
        className={s.eventsSwiper}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index} className={s.eventSlide}>
            <article>
              <h3 className={clsx(s.eventYear, "pt-sans-bold")}>
                {event.year}
              </h3>
              <p className={s.eventText}>{event.event}</p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className={clsx(s.navButton, s.navButtonNext)}>
        <ArrowIcon direction="right" stroke="#3877ee" />
      </button>
    </div>
  );
};
