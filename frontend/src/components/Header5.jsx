import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Button } from "@relume_io/relume-ui";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Header5 = () => {
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

  const { heading, description, buttons, image } = Header5Defaults;

  const [typedHeading, setTypedHeading] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < heading.length) {
        setTypedHeading(heading.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [heading]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <img
          src={image.src}
          className="w-full h-screen object-cover"
          alt={image.alt}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 container px-[5%]">
        <div className="flex min-h-screen items-center py-16 md:py-24 lg:py-28">
          <div className="max-w-md text-white">
            <h1 className="mb-5 text-4xl font-bold md:text-6xl lg:text-7xl" data-aos="fade-up">
              {typedHeading}
            </h1>
            <p className="mb-6 text-lg md:text-xl" data-aos="fade-up" data-aos-delay="3000">
              {description}
            </p>

            <div className="flex flex-wrap gap-4" data-aos="fade-up" data-aos-delay="2900">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  className="bg-white text-black border-none font-semibold"
                  onClick={button.onClick}
                >
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header5;