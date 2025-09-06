import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Calendar, MapPin, Home } from 'lucide-react'
import Card from '../ui/Card'

const OurStory = ({ data }) => {
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

                {/* Layout principal: Fotos de Raquel - composición compacta */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <div className="flex items-start justify-center gap-3 max-w-4xl mx-auto">
                            {/* Foto 2 - Izquierda vertical */}
                            <img
                                src="/images/2.jpg"
                                alt="Daniel y Raquel - Momento especial"
                                className="w-80 h-120 object-cover shadow-md"
                            />

                            {/* Fotos 4 y 6 - Derecha apiladas */}
                            <div className="flex flex-col gap-3">
                                <img
                                    src="/images/4.jpg"
                                    alt="Daniel y Raquel juntos"
                                    className="w-80 h-60 object-cover shadow-md"
                                />
                                <img
                                    src="/images/6.jpg"
                                    alt="Daniel y Raquel - Aventuras"
                                    className="w-80 h-57 object-cover shadow-md"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Historia en cards */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="grid md:grid-cols-3 gap-8 mb-16"
                >
                    <Card hover={true} gradient={true} className="text-center">
                        <Calendar className="w-12 h-12 mx-auto mb-4 text-black" />
                        <h3 className="text-2xl font-bold text-black mb-2">El Encuentro</h3>
                        <p className="text-gray-600">
                            Todo comenzó cuando menos lo esperábamos. Un encuentro que cambiaría nuestras vidas para siempre.
                        </p>
                    </Card>

                    <Card hover={true} gradient={true} className="text-center">
                        <Heart className="w-12 h-12 mx-auto mb-4 text-red-500" />
                        <h3 className="text-2xl font-bold text-black mb-2">El Amor</h3>
                        <p className="text-gray-600">
                            Poco a poco fuimos construyendo algo especial. Aventuras, risas y complicidad nos unieron.
                        </p>
                    </Card>

                    <Card hover={true} gradient={true} className="text-center">
                        <Home className="w-12 h-12 mx-auto mb-4 text-black" />
                        <h3 className="text-2xl font-bold text-black mb-2">La Familia</h3>
                        <p className="text-gray-600">
                            Con Catalina completamos nuestra pequeña familia. Ahora llega el momento de oficializarlo.
                        </p>
                    </Card>
                </motion.div>

                {/* Cita romántica final */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1, delay: 1.1 }}
                    className="text-center"
                >
                    <Card className="!bg-black text-white max-w-3xl mx-auto">
                        <div className="text-center space-y-4">
                            <div className="text-4xl">💕</div>
                            <blockquote className="text-2xl font-light italic">
                                "El amor no se trata de encontrar a la persona perfecta,
                                sino de ver la perfección en una persona imperfecta"
                            </blockquote>
                            <div className="text-gray-300 text-lg">
                                — Daniel & Raquel
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}

export default OurStory