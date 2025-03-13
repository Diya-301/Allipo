import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@relume_io/relume-ui";
import { RxPlus } from "react-icons/rx";

const Faq6 = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

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

  const { heading, description, questions } = Faq6Defaults;

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28" data-aos="fade-up">
      <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
        <div data-aos="fade-right">
          <h2 className="rb-5 mb-5 text-5xl font-bold text-russian_violet md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="md:text-lg " data-aos="fade-right">
            {description}
          </p>
        </div>
        <Accordion type="multiple" className="grid items-start justify-stretch gap-4" data-aos="fade-left">
          {questions.map((question, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border bg-timber_wolf rounded-2xl border-true_blue px-5 md:px-6"
              data-aos="fade-up"
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
  );
};

export default Faq6;