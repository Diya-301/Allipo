import { motion } from "framer-motion"
import { Link } from 'react-router-dom';

const ExploreButton = () => {

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-true_blue text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-russian_violet transition-colors duration-300"
    >
      <Link to="/products" onClick={() => {window.scrollTo(0, 0);}}>
      Explore Now
      </Link>
    </motion.button>
  )
}

const Cta41 = () =>  {
  return (
    <motion.section
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true }}
  className="relative w-full overflow-hidden px-[5%] py-16 md:py-24 lg:py-28"
>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-baby_powder rounded-lg shadow-xxlarge shadow-russian_violet overflow-hidden w-full max-w-md mx-auto relative"
      >
        <div className="absolute inset-0 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="chemical-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="#100D39" />
                <path d="M50 50 L70 30 M50 50 L30 70 M50 50 L70 70 M50 50 L30 30" stroke="#3164C4" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#chemical-pattern)" />
          </svg>
        </div>
        <div className="p-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-russian_violet mb-4"
          >
            Discover Our Product Range
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-russian_violet mb-6"
          >
            Explore our extensive catalog of high-quality inorganic fine chemicals tailored for your industry needs.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
            <ExploreButton />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-gradient-to-r from-true_blue to-russian_violet h-2"
        />
      </motion.div>
      </motion.section>
  )
}

export default Cta41;