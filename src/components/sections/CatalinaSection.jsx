import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Star, Camera } from 'lucide-react'
import Card from '../ui/Card'

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

                {/* Composición de fotos de Catalina - proporción 80 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mb-16"
                >
                    <div className="flex items-start justify-center gap-3 max-w-3xl mx-auto">
                        {/* Fotos 5 y 8 apiladas */}
                        <div className="flex flex-col gap-3">
                            <img
                                src="/images/5.jpg"
                                alt="Catalina"
                                className="w-80 h-60 object-cover shadow-md"
                            />
                            <img
                                src="/images/8.jpg"
                                alt="Catalina"
                                className="w-80 h-60 object-cover shadow-md"
                            />
                        </div>

                        {/* Foto 7 vertical */}
                        <img
                            src="/images/7.jpg"
                            alt="Catalina"
                            className="w-80 h-123 object-cover shadow-md"
                        />
                    </div>
                </motion.div>

                {/* Info de Catalina debajo de las fotos */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-center space-y-8"
                >
                    <div>
                        <h3 className="text-5xl font-light mb-6 text-black">
                            La tercera integrante de nuestra familia
                        </h3>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            {data?.couple.dog} no es solo nuestra perrita salchicha. Es nuestra compañera de aventuras,
                            la que nos despierta cada mañana y la que estará presente en nuestra boda
                            robándose todas las miradas.
                        </p>
                    </div>

                    {/* Stats de Catalina */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
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
        </section>
    )
}

export default CatalinaSection