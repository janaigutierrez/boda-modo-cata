import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import CountdownTimer from '../ui/CountdownTimer'

const Hero = ({ data }) => {
    const scrollToRSVP = () => {
        document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="min-h-screen relative overflow-hidden">
            {/* Foto 1 */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(/images/1.jpg)'
                }}
            />

            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Contenido */}
            <div className="relative z-10 min-h-screen flex items-center justify-center">
                <div style={{ marginTop: '100px' }}></div>

                {/* Contenido principal */}
                <div className="text-center max-w-4xl mx-auto px-6 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <h1 className="text-6xl md:text-7xl font-light tracking-wide mt-12 mb-8">
                            {data?.couple.groom}{" "}
                            <span className="text-5xl md:text-6xl font-handwritten text-white/80">y</span>{" "}
                            {data?.couple.bride}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-center space-x-4 text-2xl text-white/90">
                            <span>{data?.date.day}</span>
                            <span>|</span>
                            <span>{data?.date.month}</span>
                            <span>|</span>
                            <span>{data?.date.year}</span>
                        </div>
                    </motion.div>

                    {/* Countdown Timer */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.0 }}
                        className="my-16"
                    >
                        <h3 className="text-4xl font-light text-white/90 mb-8">Nos vemos en...</h3>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block">
                            <CountdownTimer targetDate={data?.date.countdown} />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.3 }}
                        className="mt-16 space-y-6"
                    >
                        <p className="text-lg text-white/80 max-w-md mx-auto">
                            Una celebración íntima donde cada invitado es especial para nosotros
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Flecha scroll down */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ArrowDown className="w-6 h-6 text-white/70" />
            </motion.div>
        </section>
    )
}

export default Hero