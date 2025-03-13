import React, { useState } from "react"
import { Building2, Heart, Wheat, Sheet } from "lucide-react"
import { assets } from "../assets/assets"

const Layout249 = () => {
  const [activeImage, setActiveImage] = useState(
    assets.home6,
  )

  const industries = [
    {
      name: "Agriculture",
      description: "Essential for every farmer's success",
      icon: <Wheat className="w-6 h-6" />,
      bgImage: assets.home6,
    },
    {
      name: "Healthcare",
      description: "Advanced medical solutions",
      icon: <Heart className="w-6 h-6" />,
      bgImage: assets.home7,
    },
    {
      name: "Food",
      description: "Innovative food processing",
      icon: <Building2 className="w-6 h-6" />,
      bgImage: assets.home8,
    },
    {
      name: "Textile",
      description: "Modern textile manufacturing",
      icon: <Sheet className="w-6 h-6" />,
      bgImage: assets.home9,
    },
  ]

  return (
    <section style={{backgroundImage: `url(${activeImage})`, backgroundSize: "cover"}}>
    <div className="flex justify-center items-center min-h-screen mx-auto w-2/3" >
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      <img src={activeImage} alt="Industry image" class="w-full md:w-1/2 object-cover"/>
      <div class="pl-6 md:pl-8 flex flex-col justify-center">
      <h1
          className="mx-auto my-6 w-full max-w-lg text-center text-xl font-bold leading-[1.2] md:mb-3 md:text-4xl md:leading-[1.2] flex items-center justify-center"
        >
          <span className="inline-block mr-4">
            <div className="h-5 w-5 rounded-full bg-true_blue"></div>
          </span>
          Industries We Support
        </h1>
        <div class="space-y-4">
        {industries.map((industry) => (
                <div
                  key={industry.name}
                  className="flex items-center bg-white gap-4 p-4 rounded-2xl transition-all hover:bg-timber_wolf cursor-pointer "
                  onMouseEnter={() => setActiveImage(industry.bgImage)}
                  onClick={() => setActiveImage(industry.bgImage)}
                >
                  <div className=" p-3 pb-12 rounded-xl">{industry.icon}</div>
                  <div>
                    <h3 className="font-semibold">{industry.name}</h3>
                    <p className="text-sm text-gray-600">{industry.description}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
      </div>
    </div>
    </section>
  )
}

export default Layout249

