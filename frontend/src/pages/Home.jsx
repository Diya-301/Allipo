import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Button } from "@relume_io/relume-ui";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@relume_io/relume-ui";
import { RxPlus } from "react-icons/rx";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const Home = () => {
  // Header5 Logic
  const Header5Defaults = {
    heading: "Expertise in Inorganic Fine Chemicals Delivered Globally",
    description:
      "At ALLIPO Chemicals, we specialize in providing top-tier inorganic fine chemicals tailored to meet the diverse needs of industries worldwide. Our commitment to quality and innovation sets us apart as a trusted partner in your chemical supply chain.",
    buttons: [
      { title: "Learn More", onClick: () => window.location.href = '/about' },
    ],
    image: {
      src: assets.home10,
      alt: "header image",
    },
  };

  const [typedHeading, setTypedHeading] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < Header5Defaults.heading.length) {
        setTypedHeading(Header5Defaults.heading.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  // Layout195 Defaults
  const Layout195Defaults = {
    heading: "Empowering Industries with Quality Chemicals",
    description:
      "At ALLIPO Chemicals, our mission is to deliver exceptional inorganic fine chemicals that meet the evolving needs of various industries. We are committed to sustainability, innovation, and excellence in every product we offer.",
    image: {
      src: assets.home0,
      alt: "layout image",
    },
    subHeadings: [
      {
        title: "Our Values",
        src: assets.values,
        description:
          "Integrity, quality, and customer satisfaction are at the core of our operations.",
      },
      {
        title: "Our Mission",
        src: assets.mission,
        description:
          "To lead the industry by providing innovative and reliable chemical solutions.",
      },
    ],
  };

  // Layout369 Defaults
  const Layout369Defaults = {
    heading: 'BENIFITS YOU\'LL GAIN',
    image1: assets.home1,
    image2: assets.home2,
    image3: assets.home3,
    image4: assets.home4,
    image5: assets.home5,
  };

  // Faq6 Defaults
  const Faq6Defaults = {
    heading: "Have Questions? We Have Answers",
    description:
      "Find answers to common questions about our products and services right here.",
    questions: [
      {
        title: "What are your hours?",
        answer:
          "Our customer service team is available from 9 AM to 5 PM, Monday through Friday. We strive to respond to all inquiries within 24 hours. Feel free to reach out during these hours for assistance.",
      },
      {
        title: "How to place orders?",
        answer:
          "You can place orders directly through our website or by contacting our sales team. Simply select your desired products, add them to your cart, and follow the checkout process. For bulk orders, please reach out for a custom quote.",
      },
      {
        title: "What is your return policy?",
        answer:
          "We accept returns within 30 days of purchase if the product is unopened and in its original packaging. Please contact our customer service for return instructions. Refunds will be processed within 7-10 business days after receiving the returned item.",
      },
      {
        title: "Do you offer discounts?",
        answer:
          "Yes, we offer discounts for bulk purchases and loyal customers. Sign up for our newsletter to receive exclusive offers and updates. For specific discount inquiries, please reach out to our sales team.",
      },
      {
        title: "Where do you ship?",
        answer:
          "We ship our products worldwide, ensuring that our customers receive their orders promptly. Shipping costs and times may vary based on location. For more details, please check our shipping policy on the website.",
      },
    ],
  };

  // Render the Home Page
  return (
    <div>
      {/* Header5 */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <img
            src={Header5Defaults.image.src}
            className="w-full h-screen object-cover"
            alt={Header5Defaults.image.alt}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container px-[5%]"
        >
          <div className="flex min-h-screen items-center py-16 md:py-24 lg:py-28">
            <div className="max-w-md text-white">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-5 text-4xl font-bold md:text-6xl lg:text-7xl"
              >
                {typedHeading}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-6 text-lg md:text-xl"
              >
                {Header5Defaults.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                {Header5Defaults.buttons.map((button, index) => (
                  <Button
                    key={index}
                    className="bg-white text-black border-none font-semibold"
                    onClick={button.onClick}
                  >
                    {button.title}
                  </Button>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Layout195 */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20"
          >
            <motion.div className="order-2 md:order-1">
              <img
                src={Layout195Defaults.image.src}
                className="w-full rounded-3xl object-cover"
                alt={Layout195Defaults.image.alt}
              />
            </motion.div>
            <motion.div className="order-1 md:order-2">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-5 text-5xl text-russian_violet font-bold md:mb-6 md:text-7xl lg:text-8xl"
              >
                {Layout195Defaults.heading}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6 md:mb-8 md:text-md"
              >
                {Layout195Defaults.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2"
              >
                {Layout195Defaults.subHeadings.map((subHeading, index) => (
                  <motion.div key={index}>
                    {/* Add src before title with shadow */}
                    <h6 className="mb-3 text-russian_violet text-md font-bold leading-[1.4] md:mb-4 md:text-xl flex items-center gap-2">
                      <div
                        className="relative w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(106,35,153,1)] bg-russian_violet bg-opacity-10"
                      >
                        <img
                          src={subHeading.src}
                          alt={`${subHeading.title} icon`}
                          className="w-6 h-6"
                        />
                      </div>
                      {subHeading.title}
                    </h6>
                    <p>{subHeading.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Layout369 */}
      <section id="relume" className="px-[5%] pb-12 md:pb-16 md:pt-8 lg:pb-20 lg:pt-10 bg-baby_powder">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto my-6 w-full max-w-lg text-center text-base font-medium leading-[1.2] md:mb-3 md:text-md md:leading-[1.2] flex items-center justify-center"
          >
            <span className="inline-block mr-4">
              <div className="h-5 w-5 rounded-full bg-true_blue"></div>
            </span>
            {Layout369Defaults.heading}
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-2 mx-auto text-center text-russian_violet"
          >
            Unlock Exclusive
            <br />
            Advantages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg max-w-2xl mx-auto text-center mb-4"
          >
            Allipo provide flexible, cost-effective solutions for all your
            <br />
            chemical supply needs, ensuring consistent quality, timely
            <br />
            deliveries, and dedicated support.
          </motion.p>
          <hr className="border-t-2 border-gray_nickel w-5/12 mx-auto" />
        </div>

        <section className="w-full py-1 md:py-1 bg-baby_powder">
          <div className="container px-4 md:px-6">
            <div className="grid gap-5 mt-2 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="overflow-hidden rounded-2xl shadow-md"
                style={{ height: 600 }}
              >
                <div className="relative h-full bg-russian_violet">
                  <img
                    src={Layout369Defaults.image1}
                    alt="Fast delivery"
                    className="object-cover w-full h-full mix-blend-screen opacity-85"
                  />
                  <div className="absolute top-0 p-6 text-white">
                    <h3 className="text-3xl font-semibold">Fast</h3>
                    <p className="text-3xl font-semibold">Delivery</p>
                    <p className="mt-2 text-md">
                      Rely on swift, reliable shipping that guarantees no interruptions in service.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="grid gap-5" style={{ height: 600 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="overflow-hidden rounded-2xl shadow-md"
                  style={{ height: 390 }}
                >
                  <div className="relative h-full">
                    <img
                      src={Layout369Defaults.image2}
                      alt="Lab technician in protective equipment"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent/0 to-black/70"></div>
                    <div className="absolute bottom-0 p-8 text-lg text-white font-medium">
                      <p className="mt-2">
                        Experience reliable support that keeps your business running smoothly, day and night.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="overflow-hidden rounded-2xl shadow-md"
                  style={{ height: 190 }}
                >
                  <div className="relative w-full h-full bg-true_blue">
                    <img
                      src={Layout369Defaults.image3}
                      alt="Guaranteed consistency"
                      className="object-cover w-full h-full opacity-40 mix-blend-screen"
                    />
                    <div className="absolute bottom-0 p-8 text-lg text-white">
                      <p className="mt-2">
                        Guaranteed consistency for uninterrupted production flow.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div className="grid gap-5" style={{ height: 600 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="overflow-hidden rounded-2xl shadow-md"
                  style={{ height: 190 }}
                >
                  <div className="relative h-full">
                    <img
                      src={Layout369Defaults.image4}
                      alt="Customized solutions"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-0 mt-4 px-8 text-3xl font-semibold text-white">
                      <p className="mt-2">
                        Customized
                        <br />
                        Solutions
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="overflow-hidden rounded-2xl shadow-md"
                  style={{ height: 390 }}
                >
                  <div className="relative h-64 md:h-64">
                    <img
                      src={Layout369Defaults.image5}
                      alt="Chemical Factory"
                      className="object-cover w-full h-full"
                      style={{
                        height: 390,
                        objectPosition: 'center',
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </section>

      {/* Faq6 */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="rb-5 mb-5 text-5xl font-bold text-russian_violet md:mb-6 md:text-7xl lg:text-8xl"
            >
              {Faq6Defaults.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:text-lg"
            >
              {Faq6Defaults.description}
            </motion.p>
          </motion.div>
          <Accordion type="multiple" className="grid items-start justify-stretch gap-4">
            {Faq6Defaults.questions.map((question, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border bg-timber_wolf rounded-2xl border-true_blue px-5 md:px-6"
              >
                <AccordionTrigger
                  icon={
                    <RxPlus className="size-7 shrink-0 text-true_blue transition-transform duration-300 md:size-8" />
                  }
                  className="md:py-5 md:text-md text-russian_violet [&[data-state=open]>svg]:rotate-45"
                >
                  {question.title}
                </AccordionTrigger>
                <AccordionContent className="md:pb-6 text-russian_violet">
                  {question.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Cta41 */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-full overflow-hidden px-[5%] py-16 md:py-24 lg:py-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-baby_powder rounded-lg shadow-xxlarge shadow-russian_violet overflow-hidden w-full max-w-md mx-auto relative"
        >
          <div className="absolute inset-0 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id="chemical-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="2" fill="#100D39" />
                  <path d="M50 50 L70 30 M50 50 L30 70 M50 50 L70 70 M50 50 L30 30" stroke="#3164C4" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#chemical-pattern)" />
            </svg>
          </div>
          <div className="p-8 relative z-10">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-bold text-russian_violet mb-4"
            >
              Discover Our Product Range
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-russian_violet mb-6"
            >
              Explore our extensive catalog of high-quality inorganic fine chemicals tailored for your industry needs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-true_blue text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-russian_violet transition-colors duration-300"
              >
                <Link to="/products" onClick={() => { window.scrollTo(0, 0); }}>
                  Explore Now
                </Link>
              </motion.button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-gradient-to-r from-true_blue to-russian_violet h-2"
          />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;