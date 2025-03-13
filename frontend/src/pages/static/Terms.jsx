import React from 'react';
import { assets } from "../../assets/assets";

const Terms = () => {
  const Header50Defaults = {
    tagline: "Welcome",
    heading: "Terms and Conditions",
    description: "Effective Date: January 1, 2025. Please read these terms carefully before using our services.",
  };
  const { heading, description, tagline } = Header50Defaults;

  return (
    <section className="min-h-screen flex flex-col justify-center px-[5%] py-8 bg-baby_powder">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <p className="mb-2 pt-10 font-semibold text-sm md:text-base">{tagline}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-russian_violet leading-tight mb-4">
            {heading}
          </h1>
          <p className="text-sm md:text-base text-russian_violet">
            {description}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="hidden lg:grid grid-cols-3 gap-8 items-start">
            <div className="col-span-1 space-y-6">
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  1. Acceptance of Terms
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  By using our services, you agree to these terms.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  2. Use of Website
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  Use our website lawfully and avoid infringing on others' rights.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  3. Product Information
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  We strive for accuracy but do not guarantee completeness or error-free content.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  4. User Conduct
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  You agree to use the website in a respectful and appropriate manner.
                </p>
              </section>
            </div>
            <div className="col-span-1 flex justify-center">
              <img
                src={assets.Terms}
                alt="Terms Illustration"
                className="w-full h-auto max-w-md rounded-lg shadow-sm"
              />
            </div>
            <div className="col-span-1 space-y-6">
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  5. Pricing and Availability
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  Prices and product availability are subject to change without notice.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  6. User Accounts
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  You are responsible for your account and all activities under it.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  7. Limitation of Liability
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  We are not liable for indirect, incidental, or consequential damages.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  8. Governing Law
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  These terms are governed by the laws of Republic of India.
                </p>
              </section>
            </div>
          </div>

          <div className="lg:hidden">
            <div className="flex justify-center mb-8">
              <img
                src={assets.Terms}
                alt="Terms Illustration"
                className="w-full h-auto max-w-md rounded-lg shadow-sm"
              />
            </div>
            <div className="space-y-6">
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  1. Acceptance of Terms
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  By using our services, you agree to these terms.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  2. Use of Website
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  Use our website lawfully and avoid infringing on others' rights.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  3. Product Information
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  We strive for accuracy but do not guarantee completeness or error-free content.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  4. User Conduct
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  You agree to use the website in a respectful and appropriate manner.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  5. Pricing and Availability
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  Prices and product availability are subject to change without notice.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  6. User Accounts
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  You are responsible for your account and all activities under it.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  7. Limitation of Liability
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  We are not liable for indirect, incidental, or consequential damages.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  8. Governing Law
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  These terms are governed by the laws of Republic of India.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;