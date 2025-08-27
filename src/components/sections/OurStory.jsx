// src/components/sections/OurStory.jsx - CON IMÁGENES MOCK
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart } from 'lucide-react'
import Card from '../ui/Card'

const OurStory = ({ data }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    })

    const storyMilestones = [
        {
            year: "2018",
            title: "Nos conocimos",
            icon: "/images/bird.png"
        },
        {
            year: "2021",
            title: "El destino nos une de nuevo",
            icon: "/images/heart.png"

        },
        {
            year: "2023",
            title: "Llega Cata",
            icon: "/images/bond.png"

        },
        {
            year: "2024",
            title: "La Propuesta",
            icon: "/images/ring.png"

        },
        {
            year: "2026",
            title: "¡Nos casamos!",
            icon: "/images/rings.png"

        }
    ]

    const mockImages = {
        couple1: "/images/couple1.jpg",
        couple2: "/images/couple2.jpg",
        special: "/images/special-moment.jpg",
        withCata: "/images/with-cata.jpg",
        travel: "/images/travel.jpg",
        family: "/images/family.jpg",
        celebration: "/images/celebration.jpg"
    }

    return (
        <section className="py-32 bg-gray-50" ref={ref}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Título */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-7xl font-light mb-8 text-black">Nuestra Historia</h2>
                    <div className="flex justify-center space-x-2 text-2xl mb-8">
                        <Heart className="w-6 h-6 text-red-500" />
                        <Heart className="w-6 h-6 text-red-500" />
                        <Heart className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Cada historia de amor es única. Esta es la nuestra.
                    </p>
                </motion.div>

                {/* Grid de fotos y timeline */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Fotos de la pareja */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {/* Foto principal grande */}
                        <div className="col-span-2">
                            <img
                                src={mockImages.couple1}
                                alt="Daniel y Raquel - Foto principal"
                                className="w-full h-64 object-cover border-2 border-gray-200 shadow-lg"
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                    e.target.nextSibling.style.display = 'flex'
                                }}
                            />
                            <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 flex flex-col items-center justify-center text-gray-500 shadow-lg" style={{ display: 'none' }}>
                                <div className="text-4xl mb-2">📸</div>
                                <p className="text-sm text-center px-4">Foto principal de pareja</p>
                            </div>
                        </div>

                        {/* Fotos pequeñas */}
                        <div>
                            <img
                                src={mockImages.special}
                                alt="Momento especial"
                                className="w-full h-32 object-cover border-2 border-gray-200 shadow-lg"
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                    e.target.nextSibling.style.display = 'flex'
                                }}
                            />
                            <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-500 shadow-lg" style={{ display: 'none' }}>
                                <div className="text-2xl mb-1">💕</div>
                                <p className="text-xs text-center px-2">Momento especial</p>
                            </div>
                        </div>

                        <div>
                            <img
                                src={mockImages.withCata}
                                alt="Con Cata"
                                className="w-full h-32 object-cover rounded-none shadow-lg"
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                    e.target.nextSibling.style.display = 'flex'
                                }}
                            />
                            <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-500 shadow-lg" style={{ display: 'none' }}>
                                <div className="text-2xl mb-1">🐕</div>
                                <p className="text-xs text-center px-2">Con Cata</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="space-y-8"
                    >
                        {storyMilestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.7 + index * 0.2 }}
                                className="flex items-start space-x-4"
                            >
                                <div className=" w-16 h-16 border-2 border-black flex items-center justify-center text-2xl flex-shrink-0">
                                    <img
                                        src={milestone.icon}
                                        alt={`Icon for ${milestone.title}`}
                                        className="w-full h-full object-contain object-center"
                                    />                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontFamily: "Brittany",
                                            fontSize: "1.5rem"
                                        }}
                                    >
                                        {milestone.year}
                                    </div>
                                    <h3
                                        style={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: "1.2rem",
                                        }}
                                    >
                                        {milestone.title}
                                    </h3>

                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default OurStory