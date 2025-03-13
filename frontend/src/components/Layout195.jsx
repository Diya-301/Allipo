import React, { useEffect } from 'react';
import { assets } from '../assets/assets';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Layout195 = () => {
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
        description:
          "Integrity, quality, and customer satisfaction are at the core of our operations.",
      },
      {
        title: "Our Mission",
        description:
          "To lead the industry by providing innovative and reliable chemical solutions.",
      },
    ],
  };

  const { heading, description, image, subHeadings } = Layout195Defaults;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
          <div className="order-2 md:order-1" data-aos="fade-right" data-aos-delay="200">
            <img src={image.src} className="w-full rounded-3xl object-cover" alt={image.alt} />
          </div>
          <div className="order-1 md:order-2 " data-aos="fade-left" data-aos-delay="100">
            <h2 className="mb-5 text-5xl text-russian_violet font-bold md:mb-6 md:text-7xl lg:text-8xl" data-aos="fade-up" data-aos-delay="300">
              {heading}
            </h2>
            <p className="mb-6 md:mb-8 md:text-md" data-aos="fade-up" data-aos-delay="400">
              {description}
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              {subHeadings.map((subHeading, index) => (
                <div key={index} data-aos="fade-up" data-aos-delay={`${500 + index * 100}`}>
                  <h6 className="mb-3 text-russian_violet text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                    {subHeading.title}
                  </h6>
                  <p>{subHeading.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout195;