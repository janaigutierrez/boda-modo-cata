import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Clock, Bus, ChevronDown, ChevronUp, Church, UtensilsCrossed } from 'lucide-react'
import { useState } from 'react'
import Card from '../ui/Card'

const EventDetails = ({ data }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    })

    const [showMapCeremony, setShowMapCeremony] = useState(false)
    const [showMapBanquet, setShowMapBanquet] = useState(false)
    const [showMapTransport, setShowMapTransport] = useState(false)

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

                {/* FOTO 3 */}
                <motion.img
                    src="/images/3.jpg"
                    alt="Daniel y Raquel - El gran día"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="w-full max-w-4xl h-96 md:h-112 object-contain mx-auto mb-16"
                />

                {/* 3 CARDS EN LÍNEA (desktop) / VERTICAL (mobile) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
                    {/* CEREMONIA */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="flex"
                    >
                        <Card hover={true} gradient={true} className="w-full flex flex-col">
                            {/* Icono */}
                            <div className="bg-black text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                <Church className="w-8 h-8" />
                            </div>

                            {/* Contenido */}
                            <div className="space-y-4 flex-grow">
                                <h3 className="text-3xl font-bold text-black">Ceremonia</h3>
                                <div className="text-xl font-medium text-gray-600">
                                    {data?.locations.ceremony.time}
                                </div>
                                <div className="mb-4">
                                    <div className="text-lg font-semibold text-black">
                                        {data?.locations.ceremony.name}
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        {data?.locations.ceremony.address}
                                    </div>
                                </div>
                            </div>

                            {/* Botón y mapa al final con padding consistente */}
                            <div className="mt-auto pt-4">
                                <motion.button
                                    onClick={() => setShowMapCeremony(!showMapCeremony)}
                                    className="w-full bg-gray-100 hover:bg-gray-200 p-3 rounded-lg flex items-center justify-between transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="font-medium text-gray-700 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {showMapCeremony ? 'Ocultar mapa' : 'Ver ubicación'}
                                    </span>
                                    {showMapCeremony ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    )}
                                </motion.button>

                                {/* Mapa desplegable */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: showMapCeremony ? 'auto' : 0,
                                        opacity: showMapCeremony ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4">
                                        <div className="w-full h-64 rounded-lg overflow-hidden border">
                                            <iframe
                                                src={data?.locations.ceremony.mapUrl}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 text-center mt-2 flex items-center justify-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            Click en el mapa para abrir direcciones
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* BANQUETE */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="flex"
                    >
                        <Card hover={true} gradient={true} className="w-full flex flex-col">
                            {/* Icono */}
                            <div className="bg-black text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                <UtensilsCrossed className="w-8 h-8" />
                            </div>

                            {/* Contenido */}
                            <div className="space-y-4 flex-grow">
                                <h3 className="text-3xl font-bold text-black">Banquete</h3>
                                <div className="text-xl font-medium text-gray-600">
                                    {data?.locations.banquet.time}
                                </div>
                                <div className="mb-4">
                                    <div className="text-lg font-semibold text-black">
                                        {data?.locations.banquet.name}
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        {data?.locations.banquet.address}
                                    </div>
                                </div>
                            </div>

                            {/* Botón y mapa al final con padding consistente */}
                            <div className="mt-auto pt-4">
                                <motion.button
                                    onClick={() => setShowMapBanquet(!showMapBanquet)}
                                    className="w-full bg-gray-100 hover:bg-gray-200 p-3 rounded-lg flex items-center justify-between transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="font-medium text-gray-700 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {showMapBanquet ? 'Ocultar mapa' : 'Ver ubicación'}
                                    </span>
                                    {showMapBanquet ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    )}
                                </motion.button>

                                {/* Mapa desplegable */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: showMapBanquet ? 'auto' : 0,
                                        opacity: showMapBanquet ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4">
                                        <div className="w-full h-64 rounded-lg overflow-hidden border">
                                            <iframe
                                                src={data?.locations.banquet.mapUrl}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 text-center mt-2 flex items-center justify-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            Click en el mapa para abrir direcciones
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* TRANSPORTE */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="flex"
                    >
                        <Card hover={true} gradient={true} className="w-full flex flex-col">
                            {/* Icono */}
                            <div className="bg-black text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                <Bus className="w-8 h-8" />
                            </div>

                            {/* Contenido */}
                            <div className="space-y-4 flex-grow">
                                <h3 className="text-3xl font-bold text-black">Transporte</h3>
                                <div className="text-xl font-medium text-gray-600">
                                    Autobús disponible
                                </div>
                                <div className="mb-4">
                                    <div className="text-lg font-semibold text-black">
                                        Desde {data?.locations.transport.departure}
                                    </div>
                                    <div className="text-gray-500 text-sm space-y-1">
                                        <div>Salida: {data?.locations.transport.departureTime}</div>
                                        <div>Regreso: {data?.locations.transport.returnTime}</div>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {data?.locations.transport.description}
                                </p>
                            </div>

                            {/* Botón y mapa al final con padding consistente */}
                            <div className="mt-auto pt-4">
                                <motion.button
                                    onClick={() => setShowMapTransport(!showMapTransport)}
                                    className="w-full bg-gray-100 hover:bg-gray-200 p-3 rounded-lg flex items-center justify-between transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="font-medium text-gray-700 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {showMapTransport ? 'Ocultar mapa' : 'Ver punto de salida'}
                                    </span>
                                    {showMapTransport ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    )}
                                </motion.button>

                                {/* Mapa desplegable */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: showMapTransport ? 'auto' : 0,
                                        opacity: showMapTransport ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4">
                                        <div className="w-full h-64 rounded-lg overflow-hidden border">
                                            <iframe
                                                src={data?.locations.transport.mapUrl}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 text-center mt-2 flex items-center justify-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {data?.locations.transport.departureAddress}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* Información final */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-center"
                >
                    <Card className="!bg-black text-white max-w-4xl mx-auto">
                        <div className="text-center">
                            <Clock className="w-12 h-12 mx-auto mb-6" />
                            <p className="text-2xl font-light">
                                Nos vemos el <span className="font-bold">{data?.date.full}</span>
                            </p>
                            <p className="text-gray-300 mt-4">
                                Ceremonia a las 17:30h • Banquete a las 19:30h
                            </p>
                            <p className="text-gray-300">
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