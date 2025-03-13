import { Button } from "@relume_io/relume-ui";
import React, { useState } from "react";

const Cta27 = () => {

  const Cta27Defaults = {
    heading: "Let's Partner for Success",
    description:
      "Reach out to explore partnership opportunities or inquire about our high-quality chemical solutions.",
    buttons: [{ title: "Contact Us", onClick: () => window.location.href = '/contact' }]
  };
  const { heading, description, buttons } = Cta27Defaults;
  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg text-center ">
        <h2 className="rb-5 mb-5 text-5xl font-bold text-russian_violet md:mb-6 md:text-7xl lg:text-8xl">
          {heading}
        </h2>
        <p className="md:text-lg font-medium">{description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
          {buttons.map((button, index) => (
            <Button key={index} className="font-semibold border-true_blue bg-true_blue" {...button}>
              {button.title}
            </Button>
          ))}
        </div>
      </div>

    </section>
  );
};


export default Cta27;