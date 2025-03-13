import React from "react";
import { Separator } from "@relume_io/relume-ui";
import { assets } from "../../assets/assets";

const Refund = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-[5%] pt-20 bg-baby_powder">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-12 lg:gap-x-20 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-russian_violet leading-tight">
              Refund Policy Overview
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-baby_powder rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row-reverse gap-8">
            <div className="w-full lg:w-1/3">
              <img
                src={assets.Refund}
                alt="Refund Illustration"
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>

            <div className="w-full lg:w-2/3">
              <h1 className="text-xl md:text-2xl font-bold text-russian_violet mb-4">
                Refund Policy
              </h1>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-timber_wolf">
                <section className="mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-russian_violet mb-2">
                    1. Returns
                  </h2>
                  <p className="text-sm md:text-base text-russian_violet leading-relaxed">
                    We accept returns within 30 days of the original purchase date. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
                  </p>
                </section>

                <Separator className="my-4" />

                <section className="mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-russian_violet mb-2">
                    2. Refunds
                  </h2>
                  <ul className="list-disc pl-6 text-sm md:text-base text-russian_violet leading-relaxed">
                    <li>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.</li>
                    <li>If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.</li>
                  </ul>
                </section>

                <Separator className="my-4" />

                <section className="mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-russian_violet mb-2">
                    3. Shipping
                  </h2>
                  <ul className="list-disc pl-6 text-sm md:text-base text-russian_violet leading-relaxed">
                    <li>You will be responsible for paying for your own shipping costs for returning your item.</li>
                    <li>Shipping costs are non-refundable.</li>
                    <li>If you receive a refund, the cost of return shipping will be deducted from your refund.</li>
                  </ul>
                </section>

                <Separator className="my-4" />

                <section className="mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-russian_violet mb-2">
                    4. Contact Us
                  </h2>
                  <p className="text-sm md:text-base text-russian_violet leading-relaxed">
                    If you have any questions on how to return your item to us, contact us at {' '}
                    <a href="mailto:info@allipochemicals.com" className="text-blue-500 hover:underline">
                      info@allipochemicals.com
                    </a>.
                  </p>
                </section>

                <Separator className="my-4" />

                <section>
                  <h2 className="text-lg md:text-xl font-semibold text-russian_violet mb-2">
                    5. Special Considerations for Chemicals
                  </h2>
                  <p className="text-sm md:text-base text-russian_violet leading-relaxed">
                    Due to the nature of chemical products, special handling may be required for returns. Please contact our customer service team before attempting to return any chemical products. Some products may not be eligible for return due to safety regulations.
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

export default Refund;