import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { assets } from '../assets/assets';

const Layout3 = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const defaults = {
    heading: 'THE DIFFERENCE WE MAKE',
    image1: assets.about1,
    image2: assets.about2,
    image3: assets.about3,
  };

  const { heading, image1, image2, image3 } = defaults;

  return (
    <section
      className="px-[5%] pb-12 md:pb-16 md:pt-8 lg:pb-20 lg:pt-10 bg-baby_powder"
    >
      <div className="container mx-auto px-4">
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
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 mx-auto text-center text-russian_violet"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Leading the Way in
          <br />
          Chemical Supply
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto text-center mb-12"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Explore the key reasons businesses choose us as their
          <br />
          chemical supply partner.
        </p>
        <hr
          className="border-t-2 border-gray_nickel w-5/12 mx-auto"
          data-aos="fade-up"
          data-aos-delay="600"
        />
      </div>

      <section className="w-full py-1 md:py-1 bg-baby_powder">
        <div className="container px-4 md:px-6">
          <div className="grid gap-5 mt-12 md:grid-cols-3">
            <div
              className="grid gap-5 transition-transform transform hover:scale-105 duration-300 ease-in-out"
              style={{ height: 600 }}
              data-aos="fade-left"
            >
              <div
                className="overflow-hidden rounded-2xl shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                style={{ height: 345 }}
              >
                <div className="relative h-64 md:h-64">
                  <img
                    src={image1}
                    alt="Laboratory test tubes and microscope"
                    className="object-cover w-full h-full"
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 345,
                      borderRadius: 'inherit',
                      objectPosition: '28.5% 73.3%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </div>
              <div
                className="bg-[#d8dde9] p-6 rounded-2xl shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                style={{ height: 235 }}
              >
                <h3 className="text-3xl font-semibold text-russian_violet">
                  300+
                </h3>
                <p className="text-3xl font-semibold text-russian_violet">
                  Deliveries
                </p>
                <p className="mt-12 text-fuscous_gray font-medium">
                  Join countless satisfied customers who've relied on our
                  consistent, expert deliveries.
                </p>
              </div>
            </div>

            <div
              className="overflow-hidden rounded-2xl shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
              style={{ height: 600 }}
              data-aos="fade-down"
              data-aos-delay="200"
            >
              <div className="relative h-full bg-russian_violet transition-transform transform hover:scale-105 duration-300 ease-in-out">
                <img
                  src={image2}
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
                    You can rely on us to keep your operations running smoothly
                    without delays.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="grid gap-5 transition-transform transform hover:scale-105 duration-300 ease-in-out"
              style={{ height: 600 }}
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <div
                className="bg-timber_wolf p-6 rounded-2xl shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                style={{ height: 235 }}
              >
                <p className="mt-2 mb-4 text-fuscous_gray font-medium">
                  Our unwavering quality ensures you receive top-purity
                  chemicals, always meeting your standards.
                </p>
                <h3 className="text-3xl pt-4 font-semibold text-russian_violet">
                  99.8%
                </h3>
                <p className="text-3xl font-semibold text-russian_violet">
                  Product Purity
                </p>
              </div>
              <div
                className="overflow-hidden rounded-2xl shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                style={{ height: 345 }}
              >
                <div className="relative h-64 md:h-64">
                  <img
                    src={image3}
                    alt="Laboratory glassware"
                    className="object-cover w-full h-full"
                    style={{
                      height: 345,
                      objectPosition: 'center',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Layout3;