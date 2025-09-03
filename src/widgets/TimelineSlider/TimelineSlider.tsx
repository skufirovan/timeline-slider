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
    fuchsia: useRef<HTMLSpanElement>(null),
    iris: useRef<HTMLSpanElement>(null),
    buttonsWrapper: useRef<HTMLDivElement>(null),
    sliderWrapper: useRef<HTMLDivElement>(null),
    activeText: useRef<HTMLParagraphElement>(null),
  };

  useLayoutEffect(() => {
    if (refs.activeText.current) {
      refs.activeText.current.innerText = config[0].word;
    }
  }, []);

  const animateDateChange = useCallback(
    (oldDate: [number, number], newDate: [number, number]) => {
      [refs.iris, refs.fuchsia].forEach((ref, index) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current,
            { innerText: oldDate[index] },
            { innerText: newDate[index], duration: 0.5, snap: "innerText" }
          );
        }
      });
    },
    []
  );

  const animateRotation = useCallback((newIndex: number) => {
    if (!refs.buttonsWrapper.current) return;

    const targetRotation = -newIndex * ANGLE_PER_ITEM;
    setRotation(targetRotation);

    gsap.to(refs.buttonsWrapper.current, {
      rotate: (targetRotation * 180) / Math.PI,
      duration: 0.8,
      ease: "none",
      onUpdate: () => {
        const currentRotation = gsap.getProperty(
          refs.buttonsWrapper.current,
          "rotate"
        ) as number;
        const texts = refs.buttonsWrapper.current!.querySelectorAll("p");
        texts.forEach((text) => gsap.set(text, { rotate: -currentRotation }));
      },
    });
  }, []);

  const animateContent = useCallback((newIndex: number) => {
    if (!refs.sliderWrapper.current || !refs.activeText.current) return;

    const timeline = gsap.timeline();

    timeline
      .to([refs.sliderWrapper.current, refs.activeText.current], {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setCurrentEvents(config[newIndex].events);
          refs.activeText.current!.innerText = config[newIndex].word;
        },
      })
      .to([refs.sliderWrapper.current, refs.activeText.current], {
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
          className={s.date}
          fuchsiaRef={refs.fuchsia}
          irisRef={refs.iris}
        />
      </div>

      <p className={clsx(s.circleSpan, "pt-sans-bold")} ref={refs.activeText} />

      <CircleButtons
        currentIndex={currentIndex}
        total={CONFIG_LENGTH}
        radius={RADIUS}
        onClick={handleClick}
        className={s.circleButtonsContainer}
        ref={refs.buttonsWrapper}
      />

      <Navigation
        currentIndex={currentIndex}
        total={CONFIG_LENGTH}
        onPrev={() => handleClick(currentIndex - 1)}
        onNext={() => handleClick(currentIndex + 1)}
      />

      <EventsSlider events={currentEvents} ref={refs.sliderWrapper} />
    </div>
  );
};
