import { motion } from 'framer-motion'
import { Heart, ArrowDown } from 'lucide-react'
import Button from '../ui/Button'
import ImagePlaceholder from '../ui/ImagePlaceholder'
import CountdownTimer from '../ui/CountdownTimer'

const Hero = ({ data }) => {
    const scrollToRSVP = () => {
        document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
            <div style={{ marginTop: '100px' }}></div>

            {/* Fondo con elementos flotantes */}
            <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-black/10 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                    />
                ))}
            </div>

            {/* Contenido principal */}
            <div className="text-center z-10 max-w-4xl mx-auto px-6 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <h1 className="text-6xl md:text-6xl font-light tracking-wide mt-12 mb-8 text-black">
                        {data?.couple.groom}{" "}
                        <span className="text-6xl md:text-6xl font-handwritten text-gray-500">y</span>{" "}
                        {data?.couple.bride}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-center space-x-4 text-2xl text-gray-600">
                        <span>{data?.date.day}</span>
                        <span>|</span>
                        <span>{data?.date.month}</span>
                        <span>|</span>
                        <span>{data?.date.year}</span>
                    </div>
                </motion.div>

                {/* FOTO 1 - Después de la fecha, antes del countdown */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1.0 }}
                    className="my-12"
                >
                    <div className="relative mx-auto w-80 h-80 md:w-96 md:h-96">
                        <img
                            src="/images/1.jpg"
                            alt="Daniel y Raquel"
                            className="w-full h-full object-cover shadow-2xl"
                        />
                        {/* Overlay sutil para efecto elegante */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl"></div>
                    </div>
                </motion.div>

                {/* Countdown Timer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.3 }}
                    className="my-16"
                >
                    <h3 className="text-5xl font-light text-gray-600 mb-8">Nos vemos en...</h3>
                    <CountdownTimer targetDate={data?.date.countdown} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="mt-16 space-y-6"
                >
                    <p className="text-sm text-gray-400 max-w-md mx-auto">
                        Una celebración íntima donde cada invitado es especial para nosotros
                    </p>
                </motion.div>
            </div>

            {/* Flecha scroll down */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ArrowDown className="w-6 h-6 text-gray-400" />
            </motion.div>
        </section>
    )
}

export default Hero