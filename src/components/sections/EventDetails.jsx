// src/components/sections/EventDetails.jsx
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Clock, Bus } from 'lucide-react'
import Card from '../ui/Card'

const EventDetails = ({ data }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    })

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
                    <h2 className="text-7xl font-light mb-8 text-black">El gran dia</h2>
                    <div className="w-24 h-1 bg-black mx-auto"></div>
                </motion.div>

                {/* SOLO UN EVENTO + TRANSPORTE */}
                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Ceremonia y Celebración */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <Card hover={true} gradient={true} className="h-full">
                            {/* Icono */}
                            <div className="bg-black text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
                                <MapPin className="w-8 h-8" />
                            </div>

                            {/* Contenido */}
                            <div className="space-y-4">
                                <h3 className="text-4xl font-bold text-black">Ceremonia y Banquete</h3>
                                <div className="text-xl font-medium text-gray-600">
                                    {data?.locations.event.time}
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-black">
                                        {data?.locations.event.name}
                                    </div>
                                    <div className="text-gray-500">
                                        {data?.locations.event.address}
                                    </div>
                                </div>

                            </div>
                        </Card>
                    </motion.div>

                    {/* Transporte */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <Card hover={true} gradient={true} className="h-full">
                            {/* Icono */}
                            <div className="bg-black text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
                                <Bus className="w-8 h-8" />
                            </div>

                            {/* Contenido */}
                            <div className="space-y-4">
                                <h3 className="text-4xl font-bold text-black">Transporte</h3>
                                <div className="text-xl font-medium text-gray-600">
                                    Autobús disponible
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-black">
                                        Desde {data?.locations.transport.departure}
                                    </div>
                                    <div className="text-gray-500 space-y-1">
                                        <div>Salida: {data?.locations.transport.departureTime}</div>
                                        <div>Regreso: {data?.locations.transport.returnTime}</div>
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    {data?.locations.transport.description}
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* Información final */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-24 text-center"
                >
                    <Card className="!bg-black text-white max-w-4xl mx-auto">
                        <div className="text-center">
                            <Clock className="w-12 h-12 mx-auto mb-6" />
                            <p className="text-2xl font-light">
                                Nos vemos el <span className="font-bold">{data?.date.full}</span> a las <span className="font-bold">{data?.date.time}</span>
                            </p>
                            <p className="text-gray-300 mt-4">
                                Una celebración íntima e inolvidable
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}

export default EventDetails