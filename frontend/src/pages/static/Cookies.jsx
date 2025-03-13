import React from "react";
import { Separator } from "@relume_io/relume-ui";
import { assets } from "../../assets/assets";

const Cookies = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-[5%] pt-20 bg-baby_powder">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-12 lg:gap-x-20 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-russian_violet leading-tight">
              Cookies Policy Overview
            </h1>
          </div>
          <div>
            <p className="text-sm font-medium md:text-base text-russian_violet leading-relaxed">
              Our Cookies Policy outlines how we use cookies to enhance your
              experience on our site. Understanding this policy is crucial for
              ensuring your privacy and optimizing your interactions with our
              platform.
            </p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto bg-baby_powder rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3">
              <img
                src={assets.Cookie}
                alt="Cookies Illustration"
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
            <div className="w-full lg:w-2/3">
              <h1 className="text-xl md:text-2xl font-bold text-russian_violet mb-4">
                Cookie Policy
              </h1>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-timber_wolf">
                <section className="mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-russian_violet mb-2">
                    1. What Are Cookies?
                  </h2>
                  <p className="text-sm md:text-base text-russian_violet leading-relaxed">
                    Cookies are small files stored on your device when you visit a website.
                  </p>
                </section>

                <Separator className="my-4" />

                <section className="mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-russian_violet mb-2">
                    2. How We Use Cookies
                  </h2>
                  <ul className="list-disc pl-6 text-sm md:text-base text-russian_violet leading-relaxed">
                    <li>To enable certain website functions</li>
                    <li>To provide analytics</li>
                    <li>To store your preferences</li>
                    <li>To enable ad delivery and targeting</li>
                  </ul>
                </section>

                <Separator className="my-4" />

                <section className="mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-russian_violet mb-2">
                    3. Types of Cookies We Use
                  </h2>
                  <ul className="list-disc pl-6 text-sm md:text-base text-russian_violet leading-relaxed">
                    <li>Essential cookies: Necessary for functionality</li>
                    <li>Analytical cookies: Count visitors and analyze usage</li>
                    <li>Functionality cookies: Remember user preferences</li>
                    <li>Targeting cookies: Track visits and pages viewed</li>
                  </ul>
                </section>

                <Separator className="my-4" />

                <section className="mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-russian_violet mb-2">
                    4. How to Control Cookies
                  </h2>
                  <p className="text-sm md:text-base text-russian_violet leading-relaxed">
                    Manage or delete cookies via your browser settings. Disabling cookies may affect site functionality.
                  </p>
                </section>

                <Separator className="my-4" />

                <section>
                  <h2 className="text-lg md:text-xl font-semibold text-russian_violet mb-2">
                    5. More Information
                  </h2>
                  <p className="text-sm md:text-base text-russian_violet leading-relaxed">
                    For more details, visit{" "}
                    <a
                      href="https://www.aboutcookies.org/"
                      className="text-true_blue hover:underline"
                    >
                      www.aboutcookies.org
                    </a>{" "}
                    or{" "}
                    <a
                      href="https://www.allaboutcookies.org/"
                      className="text-true_blue hover:underline"
                    >
                      www.allaboutcookies.org
                    </a>
                    .
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cookies;