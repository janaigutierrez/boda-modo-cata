// src/components/sections/EventDetails.jsx
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Clock, Bus, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import Card from '../ui/Card'

const EventDetails = ({ data }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    })

    const [showMap, setShowMap] = useState(false)

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
                </motion.div>

                {/* FOTO 3 - Encima de los divs */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mb-16"
                >
                    <div className="max-w-3xl mx-auto">
                        <img
                            src="/images/3.jpg"
                            alt="Daniel y Raquel - El gran día"
                            className="w-full h-64 md:h-80 object-cover shadow-xl"
                        />
                    </div>
                </motion.div>

                {/* SOLO DOS DIVS COMO ANTES */}
                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Ceremonia y Celebración CON MAPA DESPLEGABLE */}
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

                                {/* Botón para mostrar/ocultar mapa */}
                                <motion.button
                                    onClick={() => setShowMap(!showMap)}
                                    className="w-full bg-gray-100 hover:bg-gray-200 p-3 rounded-lg flex items-center justify-between transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="font-medium text-gray-700">
                                        {showMap ? '🗺️ Ocultar mapa' : '📍 Ver ubicación en mapa'}
                                    </span>
                                    {showMap ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    )}
                                </motion.button>

                                {/* Mapa desplegable con animación */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: showMap ? 'auto' : 0,
                                        opacity: showMap ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4">
                                        <div className="w-full h-64 rounded-lg overflow-hidden border">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d617.8443880113415!2d2.23883450374622!3d41.69258513451761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4c466999fe47d%3A0x779ff61cb14e1e64!2sCarrer%20Gralla%2C%2046%2C%2008415%20L&#39;Ametlla%20del%20Vall%C3%A8s%2C%20Barcelona!5e1!3m2!1sca!2ses!4v1757169284891!5m2!1sca!2ses"
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 text-center mt-2">
                                            📍 Click en el mapa para abrir direcciones
                                        </p>
                                    </div>
                                </motion.div>
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
                                    {data?.locations.transport.description || "Confirma tu necesidad de transporte en el formulario"}
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
                                Una celebración íntima e inolvidable junto a nuestros seres queridos
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}

export default EventDetails