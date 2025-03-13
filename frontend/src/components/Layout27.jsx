import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Layout27 = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
      }, []);

    const Defaults = {
        heading: "ACHIEVEMENTS AT A GLANCE",
    };
    
    const { heading} = Defaults;

    return (
    <section
      id="relume"
      className="px-[5%] pb-12 md:pb-16 md:pt-8 lg:pb-20 lg:pt-10 bg-baby_powder"
    >
      <div className="container mx-auto px-4">
      <div className="grid grid-cols-1  md:grid-cols-2 gap-8">
        <div className='py-18'> 
          <div className="flex items-center mb-4">
            <h1 className="mx-auto my-6 w-full  max-w-lg text-base font-medium leading-[1.2] md:mb-3 md:text-md md:leading-[1.2] flex items-center" data-aos="fade-up">
            <span className="inline-block mr-4 ">
                <div className="h-5 w-5 rounded-full bg-true_blue"></div>
            </span>
            {heading}
            </h1>
          </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 mx-auto text-russian_violet" data-aos="fade-right">
        Our Edge 
        <br />
        in Excellence
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-12" data-aos="fade-right">
        With decades of industry experience, a diverse range of products, and a dedicated team, we are committed to delivering exceptional quality chemicals.
        </p>
          <hr className="border-t-2 border-gray_nickel mx-auto" data-aos="fade-right"/>
        </div>
        <div className="grid grid-cols-1 pt-20 sm:grid-cols-2 gap-4">
        <div className="flex flex-col justify-center space-y-16">
        <div className="items-center relative bg-russian_violet text-white p-12 rounded-2xl shadow-custom justify-between" data-aos="flip-left">
            <div className="text-8xl pb-14 font-bold">250+</div>
            <div className="mt-4 text-lg">CLIENTS<br />TRUST US</div>
            <div className="absolute top-0 right-0 w-4 h-full bg-true_blue rounded-r-2xl"></div>
          </div>
        </div>

        <div className="flex flex-col space-y-16">
          <div className="items-center relative bg-russian_violet text-white p-12 rounded-2xl shadow-custom justify-between" data-aos="flip-right">
            <div className="text-8xl pb-14 font-bold">60+</div>
            <div className="mt-4 text-lg">PRODUCTS<br />HIGH-QUALITY</div>
            <div className="absolute top-0 right-0 w-4 h-full bg-true_blue rounded-r-2xl"></div>
          </div>

          <div className="items-center relative bg-russian_violet text-white p-12 rounded-2xl shadow-custom justify-between" data-aos="flip-right">
            <div className="text-8xl pb-14 font-bold">25+</div>
            <div className="mt-4 text-lg">YEARS<br />EXPERIENCE</div>
            <div className="absolute top-0 right-0 w-4 h-full bg-true_blue rounded-r-2xl"></div>
          </div>
        </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Layout27;
