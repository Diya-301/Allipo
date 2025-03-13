import React, { useState } from "react";
import { Button, Input, Label, Checkbox, Textarea } from "@relume_io/relume-ui";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { RxChevronRight } from "react-icons/rx";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const Contact = () => {
  const Contact14Defaults = {
    heading: "Get in Touch",
    description: "We’re here to assist you with any inquiries.",
    contacts: [
      {
        icon: <BiEnvelope className="size-8" />,
        title: "Email",
        description: "Reach us at",
        link: {
          label: "allipochemicals@gmail.com",
          url: "mailto:allipochemicals@gmail.com",
        },
      },
      {
        icon: <BiPhone className="size-8" />,
        title: "Phone",
        description: "Call us at",
        link: {
          label: "+91 8128354038",
          url: "tel:+918128354038",
        },
      },
      {
        icon: <BiMap className="size-8" />,
        title: "Office",
        description: "49, GIDC Estate, Makarpura, Vadodara-390010 (India)",
        button: {
          title: "Get Directions",
          variant: "link",
          size: "link",
          iconRight: <RxChevronRight />,
          onClick: () =>
            window.open(
              "https://www.google.com/maps/dir//Allipo+Chemicals+49+GIDC+Estate,+Makarpura+GIDC,+Makarpura+Vadodara,+Gujarat+390010/@22.258568,73.188621,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x395fc42b00000001:0x89989ca8436a5743",
              "_blank"
            ),
        },
      },
    ],
    map: {
      url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.5125027440035!2d73.18604607602174!3d22.258567979716716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc42b00000001%3A0x89989ca8436a5743!2sAllipo%20Chemicals!5e0!3m2!1sen!2sin!4v1738677418189!5m2!1sen!2sin",
    },
  };

  const Contact2Defaults = {
    tagline: "Get in Touch",
    heading: "Contact us",
    description: "We'd love to hear from you!",
    button: { title: "Submit" },
    imagePlaceholder: assets.Contact,
  };

  const { heading, description, contacts, map } = Contact14Defaults;
  const {
    tagline,
    heading: contactHeading,
    description: contactDescription,
    button,
    imagePlaceholder,
  } = Contact2Defaults;

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      email: emailInput,
      phone: phoneInput,
      message: messageInput,
      acceptTerms: acceptTerms,
    };
    if (!acceptTerms) {
      toast.info("Please Check the Terms & Conditions");
      return;
    } else {
      try {
        const response = await fetch("https://formspree.io/f/myzegbzw", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("Form submitted successfully!");
          setFirstNameInput("");
          setLastNameInput("");
          setEmailInput("");
          setPhoneInput("");
          setMessageInput("");
          setAcceptTerms(false);
        } else {
          toast.error("Failed to submit form. Please try again.");
        }
      } catch (error) {
        toast.error("Error submitting form:", error);
      }
    }
  };

  return (
    <>
      <section
        id="relume"
        className="px-[5%] bg-baby_powder py-16 md:py-24 lg:py-28"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12 max-w-lg mx-auto md:mb-18 lg:mb-20">
            <h2 className="text-5xl font-bold mb-5 md:text-7xl lg:text-8xl text-gray-800">
              {heading}
            </h2>
            <p className="text-md text-gray-600">{description}</p>
          </div>
          <div className="grid grid-cols-1  gap-12 md:grid-cols-[0.5fr_1fr] md:gap-x-20 md:gap-y-16">
            <div className="grid grid-cols-1  gap-10">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="contact-card bg-white shadow-large  p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mb-3 md:mb-4 text-primary-500">
                    {contact.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {contact.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{contact.description}</p>
                  {contact.title === "Office" && contact.button ? (
                    <div className="mt-5 md:mt-6">
                      <Button {...contact.button}>
                        {contact.button.title}
                      </Button>
                    </div>
                  ) : (
                    contact.link && (
                      <a
                        className="text-blue-500 underline hover:text-blue-700 transition-colors"
                        href={contact.link.url}
                      >
                        {contact.link.label}
                      </a>
                    )
                  )}
                </div>
              ))}
            </div>
            <div className="md:w-[321.6px] lg:w-auto shadow-large rounded-lg overflow-hidden shadow-md">
              <iframe
                src={map.url}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-baby_powder">
        <div className="container mx-auto">
          {/* Reordered Grid for Mobile View */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_0.7fr]">
            {/* Form Section */}
            <div>
              <div className="text-center mb-8 max-w-lg mx-auto md:mb-10 lg:mb-12">
                <p className="text-sm font-semibold text-gray-600 md:mb-4">
                  {tagline}
                </p>
                <h2 className="text-5xl font-bold mb-5 text-gray-800 md:text-7xl lg:text-8xl">
                  {contactHeading}
                </h2>
                <p className="text-md text-gray-600">{contactDescription}</p>
              </div>
              <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid w-full items-center">
                    <Label htmlFor="firstName" className="mb-2 text-gray-700">
                      First name
                    </Label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
                      type="text"
                      id="firstName"
                      required
                      value={firstNameInput}
                      onChange={(e) => setFirstNameInput(e.target.value)}
                    />
                  </div>

                  <div className="grid w-full items-center">
                    <Label htmlFor="lastName" className="mb-2 text-gray-700">
                      Last name
                    </Label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
                      type="text"
                      id="lastName"
                      required
                      value={lastNameInput}
                      onChange={(e) => setLastNameInput(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="grid w-full items-center">
                    <Label htmlFor="email" className="mb-2 text-gray-700">
                      Email
                    </Label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
                      type="email"
                      id="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                    />
                  </div>

                  <div className="grid w-full items-center">
                    <Label htmlFor="phone" className="mb-2 text-gray-700">
                      Phone number
                    </Label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
                      type="text"
                      id="phone"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid w-full items-center">
                  <Label htmlFor="message" className="mb-2 text-gray-700">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    required
                    placeholder="Type your message..."
                    className="min-h-[11.25rem] overflow-auto bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                </div>

                <div className="mb-3 flex items-center space-x-2 text-sm text-gray-600 md:mb-4">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={setAcceptTerms}
                  />
                  <Label htmlFor="terms" className="cursor-pointer">
                    I accept the{" "}
                    <a
                      className="text-blue-500 underline hover:text-blue-700 transition-colors"
                      href="terms&conditions"
                    >
                      Terms & Conditions
                    </a>
                  </Label>
                </div>

                <div className="text-center">
                  <Button
                    className="bg-true_blue border-none text-white hover:bg-primary-600 transition-colors px-6 py-3 rounded-lg"
                    {...button}
                  >
                    {button.title}
                  </Button>
                </div>
              </form>
            </div>

            {/* Image Section */}
            <div className="flex justify-center items-center order-first md:order-last">
              <img
                src={imagePlaceholder}
                alt="Illustration"
                className="w-full h-auto max-w-[400px] animate-float"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;