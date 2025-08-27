// src/components/sections/RSVP.jsx
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { Heart, Send, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import Button from '../ui/Button'
import Card from '../ui/Card'

const RSVP = ({ data }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    })

    const [isSubmitted, setIsSubmitted] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (formData) => {
        // Construïm el FormData amb els entry.xxxxx del teu Google Form
        const body = new FormData()
        body.append("entry.514764643", formData.nombre)
        body.append("entry.1325579506", formData.email)
        body.append("entry.1842802559", formData.asistencia)
        body.append("entry.18465505", formData.acompanante)
        body.append("entry.954168348", formData.transporte)
        body.append("entry.2077565567", formData.alergias)
        body.append("entry.121257817", formData.menuVeggie)
        body.append("entry.2028635582", formData.mensaje)

        await fetch(
            "https://docs.google.com/forms/d/e/1FAIpQLScgGg5y7jcQ_i7i9IRRWw9VSudOShweyCgOL64z3G862CrMtw/formResponse",
            {
                method: "POST",
                body,
                mode: "no-cors", // imprescindible per evitar errors de CORS
            }
        )

        setIsSubmitted(true)
    }

    if (isSubmitted) {
        return (
            <section className="py-32 bg-gray-50">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-8" />
                        <h2 className="text-5xl font-light mb-6">¡Gracias!</h2>
                        <p className="text-xl text-gray-600">
                            Hemos recibido tu confirmación. Te enviaremos todos los detalles por email.
                        </p>
                        <div className="mt-8">
                            <Button
                                variant="secondary"
                                onClick={() => setIsSubmitted(false)}
                            >
                                Hacer otra confirmación
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-32 bg-gray-50" ref={ref}>
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-7xl font-light mb-8">Confirma tu asistencia</h2>
                    <div className="flex justify-center space-x-2 text-2xl mb-8">
                        <Heart className="w-6 h-6 text-red-500" />
                        <Heart className="w-6 h-6 text-red-500" />
                        <Heart className="w-6 h-6 text-red-500" />
                    </div>
                </motion.div>



                {/* FORMULARIO */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <Card className="shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-lg font-medium mb-3 text-black">
                                        Nombre completo *
                                    </label>
                                    <input
                                        {...register('nombre', { required: 'Este campo es requerido' })}
                                        className="w-full p-4 border-2 border-gray-200 text-lg focus:border-black focus:outline-none transition-colors"
                                        placeholder="Tu nombre completo"
                                    />
                                    {errors.nombre && (
                                        <p className="text-red-500 mt-2 text-sm">{errors.nombre.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-lg font-medium mb-3 text-black">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        {...register('email', {
                                            required: 'Email requerido',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Email no válido'
                                            }
                                        })}
                                        className="w-full p-4 border-2 border-gray-200 text-lg focus:border-black focus:outline-none transition-colors"
                                        placeholder="tu@email.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 mt-2 text-sm">{errors.email.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-lg font-medium mb-3 text-black">
                                    ¿Podrás acompañarnos? *
                                </label>
                                <select
                                    {...register('asistencia', { required: 'Por favor selecciona una opción' })}
                                    className="w-full p-4 border-2 border-gray-200 text-lg focus:border-black focus:outline-none transition-colors"
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="Si">¡Sí, estaré ahí! 🎉</option>
                                    <option value="No">No podré asistir 😢</option>
                                </select>
                                {errors.asistencia && (
                                    <p className="text-red-500 mt-2 text-sm">{errors.asistencia.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-lg font-medium mb-3 text-black">
                                    Acompañante
                                </label>
                                <select
                                    {...register('acompanante')}
                                    className="w-full p-4 border-2 border-gray-200 text-lg focus:border-black focus:outline-none transition-colors"
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="Sol">Asistiré solo/a</option>
                                    <option value="Pareja">Asistiré con mi pareja</option>
                                    <option value="Consultar">Necesito consultar mi situación</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-lg font-medium mb-3 text-black">
                                    ¿Necesitas transporte?
                                </label>
                                <select
                                    {...register('transporte')}
                                    className="w-full p-4 border-2 border-gray-200 text-lg focus:border-black focus:outline-none transition-colors"
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="No">No necesito transporte</option>
                                    <option value="Si">Sí, autobús desde Caldes de Montbui</option>
                                </select>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-lg font-medium mb-3 text-black">
                                        ¿Alergias o intolerancias?
                                    </label>
                                    <select
                                        {...register('alergias')}
                                        className="w-full p-4 border-2 border-gray-200 text-lg focus:border-black focus:outline-none transition-colors"
                                    >
                                        <option value="No">No tengo alergias</option>
                                        <option value="Si">Sí tengo alergias (especificar en mensaje)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-lg font-medium mb-3 text-black">
                                        ¿Necesitas menú veggie?
                                    </label>
                                    <select
                                        {...register('menuVeggie')}
                                        className="w-full p-4 border-2 border-gray-200 text-lg focus:border-black focus:outline-none transition-colors"
                                    >
                                        <option value="No">Menú tradicional</option>
                                        <option value="Si">Sí, menú vegetariano</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-lg font-medium mb-3 text-black">
                                    Mensaje para los novios
                                </label>
                                <textarea
                                    {...register('mensaje')}
                                    rows={4}
                                    className="w-full p-4 border-2 border-gray-200 text-lg focus:border-black focus:outline-none transition-colors resize-none"
                                    placeholder="Deja aquí tus mejores deseos..."
                                />
                            </div>

                            <div className="text-center pt-4 object-center">
                                <Button
                                    variant="primary"
                                    icon={Send}
                                    className="text-xl px-16 object-center"
                                >
                                    Confirmar Asistencia
                                </Button>
                            </div>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}

export default RSVP
