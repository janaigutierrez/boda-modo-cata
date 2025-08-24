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
            year: "2020",
            title: "Nos conocimos",
            description: "El destino nos juntó y supimos que éramos el uno para el otro.",
            icon: "💫"
        },
        {
            year: "2022",
            title: "Llegó Cata",
            description: "Nuestra pequeña salchicha completó la familia.",
            icon: "🐕"
        },
        {
            year: "2024",
            title: "La propuesta",
            description: "Daniel se armó de valor y Raquel dijo que sí.",
            icon: "💍"
        },
        {
            year: "2026",
            title: "¡Nos casamos!",
            description: "El día más esperado, rodeados de nuestros seres queridos.",
            icon: "💒"
        }
    ]

    // Imágenes mock divertidas para que Raquel se ría
    const mockImages = {
        couple1: "/images/couple1.jpg", // Pon aquí una foto divertida de pareja
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
                                <div className="bg-black text-white w-16 h-16 border-2 border-black flex items-center justify-center text-2xl flex-shrink-0">
                                    {milestone.icon}
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 font-mono">{milestone.year}</div>
                                    <h3 className="text-2xl font-bold text-black mb-2">{milestone.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Sección adicional de fotos */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <Card className="text-center">
                        <h3 className="text-3xl font-bold mb-8 text-black">Momentos que nos definen</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <img
                                    src={mockImages.travel}
                                    alt="Viaje especial"
                                    className="w-full h-48 object-cover rounded-2xl shadow-lg mb-4"
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                        e.target.nextSibling.style.display = 'flex'
                                    }}
                                />
                                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-500 shadow-lg mb-4" style={{ display: 'none' }}>
                                    <div className="text-4xl mb-2">✈️</div>
                                    <p className="text-sm text-center px-4">Viaje especial</p>
                                </div>
                            </div>

                            <div>
                                <img
                                    src={mockImages.family}
                                    alt="En familia"
                                    className="w-full h-48 object-cover rounded-2xl shadow-lg mb-4"
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                        e.target.nextSibling.style.display = 'flex'
                                    }}
                                />
                                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-500 shadow-lg mb-4" style={{ display: 'none' }}>
                                    <div className="text-4xl mb-2">👨‍👩‍🐕</div>
                                    <p className="text-sm text-center px-4">En familia</p>
                                </div>
                            </div>

                            <div>
                                <img
                                    src={mockImages.celebration}
                                    alt="Celebrando"
                                    className="w-full h-48 object-cover rounded-2xl shadow-lg mb-4"
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                        e.target.nextSibling.style.display = 'flex'
                                    }}
                                />
                                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-500 shadow-lg mb-4" style={{ display: 'none' }}>
                                    <div className="text-4xl mb-2">🥂</div>
                                    <p className="text-sm text-center px-4">Celebrando</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600 mt-8 text-lg">
                            Y ahora, el siguiente capítulo comienza con todos vosotros.
                        </p>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}

export default OurStory