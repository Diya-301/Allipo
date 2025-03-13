import React from 'react';
import { assets } from "../../assets/assets";

const Privacy = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-[5%] py-10 bg-baby_powder">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold md:text-base text-russian_violet mb-2">Secure</p>
          <h1 className="text-3xl md:text-4xl font-bold text-russian_violet leading-tight">
            Privacy Policy Overview
          </h1>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="hidden lg:grid grid-cols-3 gap-8 items-start">
            <div className="col-span-1 space-y-6">
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  1. Introduction
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  Welcome to Allipo's Privacy Policy. This policy describes how we collect, use, and protect your personal information.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  2. Information We Collect
                </h2>
                <ul className="list-disc pl-6 text-sm text-russian_violet leading-relaxed">
                  <li>Name and contact information</li>
                  <li>Billing and shipping address</li>
                  <li>Payment information</li>
                </ul>
              </section>
            </div>

            <div className="col-span-1 flex flex-col items-center space-y-6">
              <img
                src={assets.Privacy}
                alt="Privacy Illustration"
                className="w-full h-auto max-w-md rounded-lg shadow-sm"
              />
              <section className="w-full">
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  5. Your Rights
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  You have the right to access, correct, or delete your data. Contact us at{' '}
                  <a href="mailto:info@allipochemicals.com" className="text-blue-500 hover:underline">
                    info@allipochemicals.com
                  </a>.
                </p>
              </section>
            </div>

            <div className="col-span-1 space-y-6">
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  3. How We Use Your Information
                </h2>
                <ul className="list-disc pl-6 text-sm text-russian_violet leading-relaxed">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your account</li>
                  <li>Improve our products and services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  4. Data Security
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  We implement measures to protect your personal information against unauthorized access or loss.
                </p>
              </section>
            </div>
          </div>

          <div className="lg:hidden">
            <div className="flex justify-center mb-8">
              <img
                src={assets.Privacy}
                alt="Privacy Illustration"
                className="w-full h-auto max-w-md rounded-lg shadow-sm"
              />
            </div>

            <div className="space-y-6">
              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  1. Introduction
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  Welcome to [Your Company Name]'s Privacy Policy. This policy describes how we collect, use, and protect your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  2. Information We Collect
                </h2>
                <ul className="list-disc pl-6 text-sm text-russian_violet leading-relaxed">
                  <li>Name and contact information</li>
                  <li>Billing and shipping address</li>
                  <li>Payment information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  3. How We Use Your Information
                </h2>
                <ul className="list-disc pl-6 text-sm text-russian_violet leading-relaxed">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your account</li>
                  <li>Improve our products and services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  4. Data Security
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  We implement measures to protect your personal information against unauthorized access or loss.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-russian_violet mb-2">
                  5. Your Rights
                </h2>
                <p className="text-sm text-russian_violet leading-relaxed">
                  You have the right to access, correct, or delete your data. Contact us at{' '}
                  <a href="mailto:info@allipochemicals.com" className="text-blue-500 hover:underline">
                    info@allipochemicals.com
                  </a>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;