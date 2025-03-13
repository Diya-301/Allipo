import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { assets } from '../assets/assets';

const Layout369 = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const defaults = {
    heading: 'BENIFITS YOU\'LL GAIN',
    image1: assets.home1,
    image2: assets.home2,
    image3: assets.home3,
    image4: assets.home4,
    image5: assets.home5,
  };

  const { heading, image1, image2, image3, image4, image5 } = defaults;

  return (
    <section
      id="relume"
      className="px-[5%] pb-12 md:pb-16 md:pt-8 lg:pb-20 lg:pt-10 bg-baby_powder"
    >
      <div className="container">
        <h1
          className="mx-auto my-6 w-full max-w-lg text-center text-base font-medium leading-[1.2] md:mb-3 md:text-md md:leading-[1.2] flex items-center justify-center"
          data-aos="flip-up"
        >
          <span className="inline-block mr-4">
            <div className="h-5 w-5 rounded-full bg-true_blue"></div>
          </span>
          {heading}
        </h1>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-2 mx-auto text-center text-russian_violet"
          data-aos="fade-up"
        >
          Unlock Exclusive
          <br />
          Advantages
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto text-center mb-4"
          data-aos="fade-up"
        >
          Allipo provide flexible, cost-effective solutions for all your
          <br />
          chemical supply needs, ensuring consistent quality, timely
          <br />
          deliveries, and dedicated support.
        </p>
        <hr
          className="border-t-2 border-gray_nickel w-5/12 mx-auto"
        />
      </div>

      <section className="w-full py-1 md:py-1 bg-baby_powder">
        <div className="container px-4 md:px-6">
          <div className="grid gap-5 mt-2 md:grid-cols-3">
            <div
              className="overflow-hidden rounded-2xl shadow-md"
              style={{ height: 600 }}
              data-aos="flip-left"
            >
              <div className="relative h-full bg-russian_violet">
                <img
                  src={image1}
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
            </div>

            <div
              className="grid gap-5"
              style={{ height: 600 }}
            >
              <div
                className="overflow-hidden rounded-2xl shadow-md"
                style={{ height: 390 }}
                data-aos="flip-right"
              >
                <div className="relative h-full">
                  <img
                    src={image2}
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
              </div>

              <div
                className="overflow-hidden rounded-2xl shadow-md"
                style={{ height: 190 }}
                data-aos="flip-right"
              >
                <div className="relative w-full h-full bg-true_blue">
                  <img
                    src={image3}
                    alt="Guaranteed consistency"
                    className="object-cover w-full h-full opacity-40 mix-blend-screen"
                  />
                  <div className="absolute bottom-0 p-8 text-lg text-white">
                    <p className="mt-2">
                      Guaranteed consistency for uninterrupted production flow.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="grid gap-5"
              style={{ height: 600 }}
            >
              <div
                className="overflow-hidden rounded-2xl shadow-md"
                style={{ height: 190 }}
                data-aos="flip-left"
              >
                <div className="relative h-full">
                  <img
                    src={image4}
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
              </div>

              <div
                className="overflow-hidden rounded-2xl shadow-md"
                style={{ height: 390 }}
                data-aos="flip-left"
              >
                <div className="relative h-64 md:h-64">
                  <img
                    src={image5}
                    alt="Chemical Factory"
                    className="object-cover w-full h-full"
                    style={{
                      height: 390,
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

export default Layout369;