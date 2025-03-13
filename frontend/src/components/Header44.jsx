import React, { useContext } from 'react';
import { Button } from "@relume_io/relume-ui";
import { assets } from "../assets/assets";
import { ShopContext } from '../context/ShopContext';

const Header44 = () => {
    const { token } = useContext(ShopContext);
    const Header44Defaults = {
        heading: "About ALLIPO Chemicals",
        description:
            "With decades of experience, ALLIPO Chemicals excels in delivering premium inorganic fine chemicals globally.",
        buttons: [
            { title: "Sign Up Now", onClick: () => window.location.href = '/login?signup=true' },
        ],
        image: {
            src: assets.about0,
            alt: "ALLIPO Chemicals Overview"
        }
    };

    const { heading, description, buttons, image } = Header44Defaults;

    return (
        <section className="px-[5%] py-16 md:py-24 lg:py-12">
            <div className="container">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full max-w-lg">
                        <h1 className="mb-5 text-6xl text-russian_violet font-bold md:mb-6 md:text-6xl lg:text-8xl">
                            {heading}
                        </h1>
                        <p className="md:text-lg ">
                            {description}
                        </p>
                        {!token &&
                            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                                {buttons.map((button, index) => (
                                    <Button
                                        key={index}
                                        className="bg-true_blue border-none font-semibold"
                                        {...button}
                                    >
                                        {button.title}
                                    </Button>
                                ))}
                            </div>
                        }
                    </div>

                    <div className="w-full max-w-md">
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-auto object-contain rounded-xl shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header44;