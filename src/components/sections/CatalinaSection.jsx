import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Star, Camera } from 'lucide-react'
import Card from '../ui/Card'
import ImagePlaceholder from '../ui/ImagePlaceholder'

const CatalinaSection = ({ data }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.3
    })

    return (
        <section className="py-24 bg-gray-50" ref={ref}>
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-6xl font-light mb-6">Conoce a Catalina</h2>
                    <div className="flex justify-center space-x-4 text-4xl">
                        <Heart className="w-8 h-8 text-red-500" />
                        <Heart className="w-8 h-8 text-red-500" />
                        <Heart className="w-8 h-8 text-red-500" />

                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Placeholder para foto de Catalina */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative"
                    >
                        <img src="/images/cata-main.jpg" alt="Cata" className="w-96 h-96 object-cover border-2 border-gray-200" />
                    </motion.div>

                    {/* Info de Catalina */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-5xl font-light mb-6 text-black">
                                La tercera integrante de nuestra familia
                            </h3>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                {data?.couple.dog} no es solo nuestra perrita salchicha. Es nuestra compañera de aventuras,
                                la que nos despierta cada mañana y la que estará presente en nuestra boda
                                robándose todas las miradas.
                            </p>
                        </div>

                        {/* Stats de Catalina */}
                        <div className="grid grid-cols-2 gap-6">
                            <Card hover={true} gradient={true}>
                                <div className="text-2xl font-bold text-black">Casi 3 años</div>
                                <div className="text-gray-500">de pura ternura</div>
                            </Card>
                            <Card hover={true} gradient={true}>
                                <div className="text-2xl font-bold text-black">100%</div>
                                <div className="text-gray-500">adorable</div>
                            </Card>
                            <Card hover={true} gradient={true}>
                                <div className="text-2xl font-bold text-black">24/7</div>
                                <div className="text-gray-500">durmiendo al sol</div>
                            </Card>
                            <Card hover={true} gradient={true}>
                                <div className="text-2xl font-bold text-black">MODO CATA</div>
                                <div className="text-gray-500">diversión sin medidas</div>
                            </Card>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default CatalinaSection