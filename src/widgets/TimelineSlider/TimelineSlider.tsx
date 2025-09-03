import { useRef, useState, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";
import clsx from "clsx";
import { config } from "@shared/config";
import { BigDate, EventsSlider, CircleButtons, Navigation } from "@shared/ui";
import s from "./TimelineSlider.module.scss";

const CONFIG_LENGTH = Object.keys(config).length;
const RADIUS = 265;
const ANGLE_PER_ITEM = (2 * Math.PI) / CONFIG_LENGTH;

export const Slider = ({ className }: { className?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [currentEvents, setCurrentEvents] = useState(config[0].events);

  const refs = {
    rightDate: useRef<HTMLSpanElement>(null),
    leftDate: useRef<HTMLSpanElement>(null),
    circleButtons: useRef<HTMLDivElement>(null),
    slider: useRef<HTMLDivElement>(null),
    themeText: useRef<HTMLParagraphElement>(null),
  };

  useLayoutEffect(() => {
    if (refs.themeText.current) {
      refs.themeText.current.innerText = config[0].word;
    }
  }, []);

  const animateDateChange = useCallback(
    (oldDate: [number, number], newDate: [number, number]) => {
      [refs.leftDate, refs.rightDate].forEach((ref, index) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current,
            { innerText: oldDate[index] },
            { innerText: newDate[index], duration: 0.8, snap: "innerText" }
          );
        }
      });
    },
    []
  );

  const animateRotation = useCallback((newIndex: number) => {
    if (!refs.circleButtons.current) return;

    const targetRotation = -newIndex * ANGLE_PER_ITEM;
    setRotation(targetRotation);

    gsap.to(refs.circleButtons.current, {
      rotate: (targetRotation * 180) / Math.PI,
      duration: 0.8,
      ease: "none",
      onUpdate: () => {
        const currentRotation = gsap.getProperty(
          refs.circleButtons.current,
          "rotate"
        ) as number;
        const texts = refs.circleButtons.current!.querySelectorAll("p");
        texts.forEach((text) => gsap.set(text, { rotate: -currentRotation }));
      },
    });
  }, []);

  const animateContent = useCallback((newIndex: number) => {
    if (!refs.slider.current || !refs.themeText.current) return;

    const timeline = gsap.timeline();

    timeline
      .to([refs.slider.current, refs.themeText.current], {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setCurrentEvents(config[newIndex].events);
          refs.themeText.current!.innerText = config[newIndex].word;
        },
      })
      .to([refs.slider.current, refs.themeText.current], {
        opacity: 1,
        duration: 0.2,
        delay: 0.4,
      });
  }, []);

  const handleClick = useCallback(
    (newIndex: number) => {
      const oldDate = config[currentIndex].dates;
      const newDate = config[newIndex].dates;

      animateDateChange(oldDate, newDate);
      animateRotation(newIndex);
      animateContent(newIndex);
      setCurrentIndex(newIndex);
    },
    [currentIndex, animateDateChange, animateRotation, animateContent]
  );

  return (
    <div className={className}>
      <div className={s.carouselContainer}>
        <BigDate
          date={config[currentIndex].dates}
          className={s.bigDate}
          fuchsiaRef={refs.rightDate}
          irisRef={refs.leftDate}
        />
      </div>

      <p className={clsx(s.themeText, "pt-sans-bold")} ref={refs.themeText} />

      <CircleButtons
        currentIndex={currentIndex}
        total={CONFIG_LENGTH}
        radius={RADIUS}
        onClick={handleClick}
        className={s.circleButtonsContainer}
        ref={refs.circleButtons}
      />

      <div className={s.sliderContainer}>
        <Navigation
          currentIndex={currentIndex}
          total={CONFIG_LENGTH}
          onPrev={() => handleClick(currentIndex - 1)}
          onNext={() => handleClick(currentIndex + 1)}
          className={s.navigation}
        />

        <EventsSlider events={currentEvents} ref={refs.slider} />
      </div>
    </div>
  );
};
