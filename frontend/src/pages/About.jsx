import React, { useContext, useState, useEffect, useRef } from "react";
import { Button } from "@relume_io/relume-ui";
import { assets } from "../assets/assets";
import { clients } from "../clients/clients";
import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";

const About = () => {
  const { token } = useContext(ShopContext);

  // Header44 Logic
  const Header44Defaults = {
    heading: "About ALLIPO Chemicals",
    description:
      "With decades of experience, ALLIPO Chemicals excels in delivering premium inorganic fine chemicals globally.",
    buttons: [{ title: "Sign Up Now", onClick: () => (window.location.href = "/login?signup=true") }],
    image: {
      src: assets.about0,
      alt: "ALLIPO Chemicals Overview",
    },
  };

  // Layout3 Defaults
  const Layout3Defaults = {
    heading: "THE DIFFERENCE WE MAKE",
    image1: assets.about1,
    image2: assets.about2,
    image3: assets.about3,
  };

  // Layout27 Defaults
  const Layout27Defaults = {
    heading: "ACHIEVEMENTS AT A GLANCE",
  };

  // Layout28 Defaults
  const Layout28Defaults = {
    heading: "OUR HALLMARKS OF SUCCESS",
    image1: assets.about4,
    image2: assets.about5,
  };

  // LogoLayout Defaults
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

  const midIndex = Math.ceil(Logo1Defaults.logos.length / 2);
  const firstRowLogos = Logo1Defaults.logos.slice(0, midIndex);
  const secondRowLogos = Logo1Defaults.logos.slice(midIndex);

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

  // Cta27 Defaults
  const Cta27Defaults = {
    heading: "Let's Partner for Success",
    description:
      "Reach out to explore partnership opportunities or inquire about our high-quality chemical solutions.",
    buttons: [{ title: "Contact Us", onClick: () => (window.location.href = "/contact") }],
  };

  return (
    <div>
      {/* Header44 */}
      <section className="px-[5%] py-16 md:py-24 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-lg"
            >
              <h1 className="mb-5 text-6xl text-russian_violet font-bold md:mb-6 md:text-6xl lg:text-8xl">
                {Header44Defaults.heading}
              </h1>
              <p className="md:text-lg">{Header44Defaults.description}</p>
              {!token && (
                <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                  {Header44Defaults.buttons.map((button, index) => (
                    <Button
                      key={index}
                      className="bg-true_blue border-none font-semibold"
                      {...button}
                    >
                      {button.title}
                    </Button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md"
            >
              <img
                src={Header44Defaults.image.src}
                alt={Header44Defaults.image.alt}
                className="w-full h-auto object-contain rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Layout3 */}
      <section className="px-[5%] pb-12 md:pb-16 md:pt-8 lg:pb-20 lg:pt-10 bg-baby_powder">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <h1 className="mx-auto my-6 w-full max-w-lg text-center text-base font-medium leading-[1.2] md:mb-3 md:text-md md:leading-[1.2] flex items-center justify-center">
            <span className="inline-block mr-4">
              <div className="h-5 w-5 rounded-full bg-true_blue"></div>
            </span>
            {Layout3Defaults.heading}
          </h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 mx-auto text-center text-russian_violet"
          >
            Leading the Way in
            <br />
            Chemical Supply
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg max-w-2xl mx-auto text-center mb-12"
          >
            Explore the key reasons businesses choose us as their
            <br />
            chemical supply partner.
          </motion.p>
          <hr className="border-t-2 border-gray_nickel w-5/12 mx-auto" />
        </motion.div>

        <section className="w-full py-1 md:py-1 bg-baby_powder">
          <div className="container px-4 md:px-6">
            <div className="grid gap-5 mt-12 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="grid gap-5 transition-transform transform hover:scale-105 duration-300 ease-in-out"
                style={{ height: 600 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="overflow-hidden rounded-2xl shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                  style={{ height: 345 }}
                >
                  <div className="relative h-64 md:h-64">
                    <img
                      src={Layout3Defaults.image1}
                      alt="Laboratory test tubes and microscope"
                      className="object-cover w-full h-full"
                      style={{
                        display: "block",
                        width: "100%",
                        height: 345,
                        borderRadius: "inherit",
                        objectPosition: "28.5% 73.3%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-[#d8dde9] p-6 rounded-2xl shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                  style={{ height: 235 }}
                >
                  <h3 className="text-3xl font-semibold text-russian_violet">300+</h3>
                  <p className="text-3xl font-semibold text-russian_violet">Deliveries</p>
                  <p className="mt-12 text-fuscous_gray font-medium">
                    Join countless satisfied customers who've relied on our consistent, expert deliveries.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="overflow-hidden rounded-2xl shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                style={{ height: 600 }}
              >
                <div className="relative h-full bg-russian_violet transition-transform transform hover:scale-105 duration-300 ease-in-out">
                  <img
                    src={Layout3Defaults.image2}
                    alt="Lab technician in protective equipment"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent/0 to-black/50"></div>
                  <div className="absolute top-0 p-6 text-white">
                    <h3 className="text-3xl font-semibold">98%</h3>
                    <p className="text-3xl font-semibold">On-Time Rate</p>
                  </div>
                  <div className="absolute bottom-0 p-6 text-md text-white font-medium">
                    <p className="mt-2">
                      You can rely on us to keep your operations running smoothly without delays.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="grid gap-5 transition-transform transform hover:scale-105 duration-300 ease-in-out"
                style={{ height: 600 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-timber_wolf p-6 rounded-2xl shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                  style={{ height: 235 }}
                >
                  <p className="mt-2 mb-4 text-fuscous_gray font-medium">
                    Our unwavering quality ensures you receive top-purity chemicals, always meeting your standards.
                  </p>
                  <h3 className="text-3xl pt-4 font-semibold text-russian_violet">99.8%</h3>
                  <p className="text-3xl font-semibold text-russian_violet">Product Purity</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="overflow-hidden rounded-2xl shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                  style={{ height: 345 }}
                >
                  <div className="relative h-64 md:h-64">
                    <img
                      src={Layout3Defaults.image3}
                      alt="Laboratory glassware"
                      className="object-cover w-full h-full"
                      style={{
                        height: 345,
                        objectPosition: "center",
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </section>

      {/* Layout27 */}
      <section id="relume" className="px-[5%] pb-12 md:pb-16 md:pt-8 lg:pb-20 lg:pt-10 bg-baby_powder">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="py-18"
            >
              <div className="flex items-center mb-4">
                <h1 className="mx-auto my-6 w-full max-w-lg text-base font-medium leading-[1.2] md:mb-3 md:text-md md:leading-[1.2] flex items-center">
                  <span className="inline-block mr-4">
                    <div className="h-5 w-5 rounded-full bg-true_blue"></div>
                  </span>
                  {Layout27Defaults.heading}
                </h1>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 mx-auto text-russian_violet"
              >
                Our Edge
                <br />
                in Excellence
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg max-w-2xl mx-auto mb-12"
              >
                With decades of industry experience, a diverse range of products, and a dedicated team, we are committed
                to delivering exceptional quality chemicals.
              </motion.p>
              <hr className="border-t-2 border-gray_nickel mx-auto" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 pt-20 sm:grid-cols-2 gap-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col justify-center space-y-16"
              >
                <div className="items-center relative bg-russian_violet text-white p-12 rounded-2xl shadow-custom justify-between">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-8xl pb-14 font-bold"
                  >
                    250+
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mt-4 text-lg"
                  >
                    CLIENTS
                    <br />
                    TRUST US
                  </motion.div>
                  <div className="absolute top-0 right-0 w-4 h-full bg-true_blue rounded-r-2xl"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col space-y-16"
              >
                <div className="items-center relative bg-russian_violet text-white p-12 rounded-2xl shadow-custom justify-between">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-8xl pb-14 font-bold"
                  >
                    60+
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mt-4 text-lg"
                  >
                    PRODUCTS
                    <br />
                    HIGH-QUALITY
                  </motion.div>
                  <div className="absolute top-0 right-0 w-4 h-full bg-true_blue rounded-r-2xl"></div>
                </div>

                <div className="items-center relative bg-russian_violet text-white p-12 rounded-2xl shadow-custom justify-between">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-8xl pb-14 font-bold"
                  >
                    25+
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mt-4 text-lg"
                  >
                    YEARS
                    <br />
                    EXPERIENCE
                  </motion.div>
                  <div className="absolute top-0 right-0 w-4 h-full bg-true_blue rounded-r-2xl"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Layout28 */}
      <section id="relume" className="px-[5%] pb-12 md:pb-16 md:pt-8 lg:pb-20 lg:pt-10 bg-baby_powder">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container"
        >
          <h1 className="mx-auto my-6 w-full max-w-lg text-center text-base font-medium leading-[1.2] md:mb-3 md:text-md md:leading-[1.2] flex items-center justify-center">
            <span className="inline-block mr-4">
              <div className="h-5 w-5 rounded-full bg-true_blue"></div>
            </span>
            {Layout28Defaults.heading}
          </h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 mx-auto text-center text-russian_violet"
          >
            Pioneering Quality
            <br />
            and Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg max-w-2xl mx-auto text-center mb-12"
          >
            We are dedicated to delivering superior high-purity fine chemicals through stringent
            <br />
            ISO-certified quality control processes. Committed to excellence, we consistently exceed customer
            expectations
            <br />
            with premium products, timely services, and lasting partnerships.
          </motion.p>
          <hr className="border-t-2 border-gray_nickel w-5/12 mx-auto" />
        </motion.div>
        <div className="container p-6 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16"
          >
            {[Layout28Defaults.image1, Layout28Defaults.image2].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center group"
              >
                <a href={image} target="_blank" rel="noopener noreferrer">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    width={370}
                    className="rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:opacity-75 group-hover:brightness-75 group-hover:grayscale-50"
                  />
                </a>
                <p className="mt-4 text-lg font-medium text-russian_violet">
                  {index === 0 ? "ALLIPO CHEMICALS QMS ISO" : "MERCK RECOGNITION AWARD 2017"}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LogoLayout */}
      <section id="relume" className="px-[5%] py-16 md:py-16 lg:py-20 bg-baby_powder">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container"
        >
          <h1 className="mx-auto mb-6 w-full max-w-lg text-center text-base font-medium leading-[1.2] md:mb-8 md:text-md md:leading-[1.2] flex items-center justify-center">
            <span className="inline-block mr-4">
              <div className="h-5 w-5 rounded-full bg-true_blue"></div>
            </span>
            {Logo1Defaults.heading}
          </h1>
          <hr className="border-t-2 pb-16 border-gray_nickel w-1/3 mx-auto" />
          <div className="flex flex-col gap-4 pb-10">
            <div
              ref={scrollContainerRef1}
              className="overflow-hidden whitespace-nowrap flex items-center gap-x-8"
            >
              {[...firstRowLogos, ...firstRowLogos].map((logo, index) => (
                <motion.img
                  key={`row1-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
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
                <motion.img
                  key={`row2-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-12 md:max-h-30"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Cta27 */}
      <section className="relative px-[5%] py-16 md:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container max-w-lg text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rb-5 mb-5 text-5xl font-bold text-russian_violet md:mb-6 md:text-7xl lg:text-8xl"
          >
            {Cta27Defaults.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:text-lg font-medium"
          >
            {Cta27Defaults.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8"
          >
            {Cta27Defaults.buttons.map((button, index) => (
              <Button
                key={index}
                className="font-semibold border-true_blue bg-true_blue"
                {...button}
              >
                {button.title}
              </Button>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;