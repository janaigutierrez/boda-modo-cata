import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, ExternalLink, Mail, CheckCircle, Calendar, Clock, UtensilsCrossed, MapPin, FileText } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'

const RSVP = ({ data }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    })

    // URL del Google Form oficial
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScgGg5y7jcQ_i7i9IRRWw9VSudOShweyCgOL64z3G862CrMtw/viewform'

    return (
        <section className="py-32 bg-gray-50" ref={ref} id="rsvp">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-7xl font-light mb-8">Confirma tu asistencia</h2>
                    <div className="flex justify-center space-x-2 text-2xl mb-8">
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <Card className="shadow-2xl">
                        <div className="space-y-8">
                            {/* INTRODUCCIÓN */}
                            <div className="text-center">
                                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                                    Nos encantaría contar contigo en nuestra boda.
                                </p>
                                <p className="text-lg text-gray-600">
                                    Por favor, confirma tu asistencia a través de nuestro formulario oficial:
                                </p>
                            </div>

                            {/* INFO DETALLES DE LA BODA */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-8">
                                <div className="grid md:grid-cols-2 gap-6 text-left">
                                    <div className="flex items-start space-x-3">
                                        <Calendar className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Fecha</p>
                                            <p className="text-lg font-medium text-black">17 de Julio de 2026</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Clock className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Ceremonia</p>
                                            <p className="text-lg font-medium text-black">17:30h</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <UtensilsCrossed className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Banquete</p>
                                            <p className="text-lg font-medium text-black">19:30h</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Lugar</p>
                                            <p className="text-lg font-medium text-black">Por confirmar</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BOTÓN PRINCIPAL GRAN */}
                            <div className="text-center pt-6 border-t-2 border-gray-200">
                                <Button
                                    variant="primary"
                                    onClick={() => window.open(GOOGLE_FORM_URL, '_blank')}
                                    className="text-2xl px-20 py-6 w-full md:w-auto"
                                >
                                    <FileText className="w-6 h-6 mr-3 inline" />
                                    Confirmar Asistencia
                                    <ExternalLink className="w-5 h-5 ml-3 inline" />
                                </Button>
                                <p className="text-sm text-gray-500 mt-4">
                                    Se abrirá en una nueva pestaña
                                </p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}

export default RSVP