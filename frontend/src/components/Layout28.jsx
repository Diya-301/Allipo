import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { assets } from "../assets/assets";

const Layout28 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const Defaults = {
    heading: "OUR HALLMARKS OF SUCCESS",
    image1: assets.about4,
    image2: assets.about5,
  };

  const { heading, image1, image2 } = Defaults;

  return (
    <section
      id="relume"
      className="px-[5%] pb-12 md:pb-16 md:pt-8 lg:pb-20 lg:pt-10 bg-baby_powder"
    >
      <div className="container">
        <h1
          className="mx-auto my-6 w-full max-w-lg text-center text-base font-medium leading-[1.2] md:mb-3 md:text-md md:leading-[1.2] flex items-center justify-center"
          data-aos="fade-up"
        >
          <span className="inline-block mr-4">
            <div className="h-5 w-5 rounded-full bg-true_blue"></div>
          </span>
          {heading}
        </h1>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 mx-auto text-center text-russian_violet"
          data-aos="fade-right"
        >
          Pioneering Quality <br /> and Excellence
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto text-center mb-12"
          data-aos="fade-right"
        >
          We are dedicated to delivering superior high-purity fine chemicals
          through stringent <br /> ISO-certified quality control processes.
          Committed to excellence, we consistently exceed customer expectations
          <br /> with premium products, timely services, and lasting
          partnerships.
        </p>
        <hr
          className="border-t-2 border-gray_nickel w-5/12 mx-auto"
          data-aos="fade-up"
        />
      </div>
      <div className="container p-6 mx-auto">
        <div
          className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16"
          data-aos="fade-up"
        >
          {[image1, image2].map((image, index) => (
            <div key={index} className="text-center group" data-aos="zoom-in">
              <a href={image} target="_blank" rel="noopener noreferrer">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={370}
                  className="rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:opacity-75 group-hover:brightness-75 group-hover:grayscale-50"
                />
              </a>
              <p className="mt-4 text-lg font-medium text-russian_violet">
                {index === 0
                  ? "ALLIPO CHEMICALS QMS ISO"
                  : "MERCK RECOGNITION AWARD 2017"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Layout28;
