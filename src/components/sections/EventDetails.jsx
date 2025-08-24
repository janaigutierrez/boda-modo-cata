// src/components/sections/EventDetails.jsx
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Clock, Shirt, Camera, Music, Utensils } from 'lucide-react'
import Card from '../ui/Card'

const EventDetails = ({ data }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    })

    const details = [
        {
            icon: Clock,
            title: "Ceremonia",
            time: data?.locations.ceremony.time || "16:00h",
            location: data?.locations.ceremony.name || "Por confirmar",
            address: data?.locations.ceremony.address || "Ubicación por definir",
            description: data?.locations.ceremony.description || "Donde diremos 'Sí, quiero'"
        },
        {
            icon: Utensils,
            title: "Celebración",
            time: data?.locations.reception.time || "18:00h",
            location: data?.locations.reception.name || "Por confirmar",
            address: data?.locations.reception.address || "Ubicación por definir",
            description: data?.locations.reception.description || "Cena, baile y diversión"
        },
        {
            icon: Shirt,
            title: "Dress Code",
            time: data?.locations.dressCode.style || "Elegante",
            location: data?.locations.dressCode.colors || "Colores suaves",
            address: data?.locations.dressCode.avoid || "Evitar blanco y negro",
            description: data?.locations.dressCode.description || "Vístete con estilo"
        }
    ]

    return (
        <section className="py-32 bg-white" ref={ref}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Título */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-7xl font-light mb-8 text-black">El gran día</h2>
                    <div className="w-24 h-1 bg-black mx-auto"></div>
                </motion.div>

                {/* Grid de detalles */}
                <div className="grid md:grid-cols-3 gap-12">
                    {details.map((detail, index) => {
                        const IconComponent = detail.icon
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 60 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 1, delay: index * 0.2 }}
                            >
                                <Card hover={true} gradient={true} className="h-full">
                                    {/* Icono */}
                                    <div className="bg-black text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                        <IconComponent className="w-8 h-8" />
                                    </div>

                                    {/* Contenido */}
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-bold text-black">{detail.title}</h3>
                                        <div className="text-xl font-medium text-gray-600">{detail.time}</div>
                                        <div>
                                            <div className="text-lg font-semibold text-black">{detail.location}</div>
                                            <div className="text-gray-500">{detail.address}</div>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">{detail.description}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Información extra */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-24 text-center"
                >
                    <Card className="bg-black text-white max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8 items-center">
                            <div className="flex items-center justify-center space-x-3">
                                <Camera className="w-6 h-6" />
                                <span className="text-lg">Fotógrafo profesional</span>
                            </div>
                            <div className="flex items-center justify-center space-x-3">
                                <Music className="w-6 h-6" />
                                <span className="text-lg">Música en vivo</span>
                            </div>
                            <div className="flex items-center justify-center space-x-3">
                                <MapPin className="w-6 h-6" />
                                <span className="text-lg">Transporte incluido</span>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-700">
                            <p className="text-xl font-light">
                                Nos vemos el <span className="font-bold">{data?.date.full}</span>
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}

export default EventDetails