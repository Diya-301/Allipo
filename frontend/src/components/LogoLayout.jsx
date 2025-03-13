import React, { useEffect, useRef } from "react";
import { clients } from "../clients/clients";
import AOS from 'aos';
import 'aos/dist/aos.css';

const LogoLayout = () => {
  useEffect(() => {
          AOS.init({ duration: 1000, once: true });
        }, []);
  
  const Logo1Defaults = {
    heading: "TRUSTED BY LEADING BUSINESSES",
    logos: [
      { src: clients.clientele1, alt: "logo" },
      { src: clients.clientele2, alt: "logo" },
      { src: clients.clientele3, alt: "logo" },
      { src: clients.clientele4, alt: "logo" },
      { src: clients.clientele5, alt: "logo" },
      { src: clients.clientele6, alt: "logo" },
      { src: clients.clientele7, alt: "logo" },
      { src: clients.clientele8, alt: "logo" },
      { src: clients.clientele9, alt: "logo" },
      { src: clients.clientele10, alt: "logo" },
      { src: clients.clientele11, alt: "logo" },
      { src: clients.clientele12, alt: "logo" },
      { src: clients.clientele13, alt: "logo" },
      { src: clients.clientele14, alt: "logo" },
      { src: clients.clientele15, alt: "logo" },
      { src: clients.clientele16, alt: "logo" },
      { src: clients.clientele17, alt: "logo" },
      { src: clients.clientele18, alt: "logo" },
      { src: clients.clientele19, alt: "logo" },
      { src: clients.clientele20, alt: "logo" },
      { src: clients.clientele21, alt: "logo" },
      { src: clients.clientele23, alt: "logo" },
      { src: clients.clientele24, alt: "logo" },
      { src: clients.clientele25, alt: "logo" },
      { src: clients.clientele26, alt: "logo" },
      { src: clients.clientele27, alt: "logo" },
      { src: clients.clientele28, alt: "logo" },
      { src: clients.clientele29, alt: "logo" },
    ],
  };

  const { heading, logos } = Logo1Defaults;

  const midIndex = Math.ceil(logos.length / 2);
  const firstRowLogos = logos.slice(0, midIndex);
  const secondRowLogos = logos.slice(midIndex);

  const scrollContainerRef1 = useRef(null);
  const scrollContainerRef2 = useRef(null);

  useEffect(() => {
    const scrollStep = (scrollContainer, logos) => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const intervalId1 = setInterval(() => scrollStep(scrollContainerRef1.current, firstRowLogos), 20);
    const intervalId2 = setInterval(() => scrollStep(scrollContainerRef2.current, secondRowLogos), 20);

    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
    };
  }, [firstRowLogos, secondRowLogos]);

  return (
    <section id="relume" className="px-[5%] py-16 md:py-16 lg:py-20 bg-baby_powder">
      <div className="container">
        <h1 className="mx-auto mb-6 w-full max-w-lg text-center text-base font-medium leading-[1.2] md:mb-8 md:text-md md:leading-[1.2] flex items-center justify-center" data-aos="fade-up">
          <span className="inline-block mr-4">
            <div className="h-5 w-5 rounded-full bg-true_blue"></div>
          </span>
          {heading}
        </h1>
        <hr className="border-t-2 pb-16 border-gray_nickel w-1/3 mx-auto" />
        <div className="flex flex-col gap-4 pb-10">
          <div
            ref={scrollContainerRef1}
            className="overflow-hidden whitespace-nowrap flex items-center gap-x-8"
          >
            {[...firstRowLogos, ...firstRowLogos].map((logo, index) => (
              <img
                key={`row1-${index}`}
                src={logo.src}
                alt={logo.alt}
                className="max-h-12 md:max-h-30"
              />
            ))}
          </div>
          <div
            ref={scrollContainerRef2}
            className="overflow-hidden whitespace-nowrap flex items-center gap-x-8"
          >
            {[...secondRowLogos, ...secondRowLogos].map((logo, index) => (
              <img
                key={`row2-${index}`}
                src={logo.src}
                alt={logo.alt}
                className="max-h-12 md:max-h-30"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoLayout;