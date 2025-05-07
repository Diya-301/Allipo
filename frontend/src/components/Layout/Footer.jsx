import React from 'react';
import { assets } from "../../assets/assets";


const Footer = () => {
  const Footer7Defaults = {
    logo: {
      url: "/",
      src: assets.footer_logo,
      alt: "Logo image",
      width: "382.58px",
      height: "140px",
    },
    columnLinks: [
      {
        links: [
          { title: "About Us", url: "/about" },
          { title: "Our Products", url: "/products" },
          { title: "Contact Us", url: "/contact" },
        ],
      },
    ],
    footerText: "© 2025 ALLIPO Chemicals. All rights reserved.",
    footerTextBy : "Developed by Diya Savaliya & Kalp Shah.",
    footerLinks: [
      { title: "Privacy Policy", url: "/privacy" },
      { title: "Refund Policy", url: "/refund" },
      { title: "Terms of Service", url: "/terms&conditions" },
      { title: "Cookies Settings", url: "/cookies" },
    ],
  };

  const { logo, footerText, footerTextBy, columnLinks, footerLinks } = Footer7Defaults;

  return (
    <footer className="px-[5%] py-7 md:py-7 lg:py-7 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${assets.footer_bg})`}}>
      <div className="container">
        <div className="flex flex-col items-center pb-8 md:pb-10 lg:pb-12">
          <a href={logo.url} className="mb-8">
            <img src={logo.src} alt={logo.alt} className="inline-block" style={{ width: logo.width, height: logo.height }} />
          </a>
          {columnLinks.map((column, index) => (
            <ul
              key={index}
              className="grid grid-flow-row grid-cols-1 items-start text-white justify-center justify-items-center gap-6 md:grid-flow-col md:grid-cols-[max-content] md:justify-center md:justify-items-start"
            >
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex} className="font-semibold">
                  <a href={link.url}>{link.title}</a>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="h-px w-full bg-white" />
        <div className="flex flex-col-reverse items-center justify-between pb-4 pt-6 text-center text-sm md:flex-row md:pb-0 md:pt-8">
          <p className="mt-8 md:mt-0 text-white">{footerText} <b>{footerTextBy}</b></p>
          <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            {footerLinks.map((link, index) => (
              <li key={index} className="underline text-white decoration-white underline-offset-1">
                <a href={link.url}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
