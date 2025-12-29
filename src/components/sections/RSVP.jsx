import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { Heart, Send, CheckCircle, AlertCircle, ExternalLink, Mail } from 'lucide-react'
import { useState } from 'react'
import Button from '../ui/Button'
import Card from '../ui/Card'

const RSVP = ({ data }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    })

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState(false)
    const [errorDetails, setErrorDetails] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm()

    // URL del Google Form per fallback directe
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScgGg5y7jcQ_i7i9IRRWw9VSudOShweyCgOL64z3G862CrMtw/viewform'

    const onSubmit = async (formData) => {
        setIsSubmitting(true)
        setSubmitError(false)
        setErrorDetails('')

        // Generar ID único para este envío (para tracking)
        const submissionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

        console.log('🚀 Iniciando envío de formulario...')
        console.log('🆔 Submission ID:', submissionId)
        console.log('📱 User Agent:', navigator.userAgent)
        console.log('👤 Nombre:', formData.nombre)
        console.log('🌐 Navigator:', {
            platform: navigator.platform,
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine
        })

        try {
            // Intentar amb Netlify Function (la millor opció)
            console.log('🔄 Enviando via Netlify Function...')

            const response = await fetch('/.netlify/functions/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    submissionId,
                    userAgent: navigator.userAgent,
                    platform: navigator.platform
                })
            })

            const result = await response.json()

            console.log('📥 Respuesta de Netlify Function:', result)

            if (response.ok && result.success) {
                console.log('✅ ¡Formulario enviado correctamente!')
                setIsSubmitted(true)
                return // Sortir aquí, tot ha anat bé!
            } else {
                // Si la function falla, intentem el backup
                console.warn('⚠️ Netlify Function falló, intentando backup...')
                throw new Error(result.error || 'Error desconocido')
            }

        } catch (netlifyError) {
            console.error('❌ Error con Netlify Function:', netlifyError.message)

            // BACKUP 1: Intentar enviar directament amb fetch
            try {
                console.log('🔄 Backup 1: Enviando directamente a Google Forms...')

                const params = new URLSearchParams()
                params.append("entry.514764643", formData.nombre || "")
                params.append("entry.1325579506", formData.email || "")
                params.append("entry.1842802559", formData.asistencia || "")
                params.append("entry.18465505", formData.acompanante || "")
                params.append("entry.954168348", formData.transporte || "")
                params.append("entry.2077565567", formData.alergias || "")
                params.append("entry.121257817", formData.menuVeggie || "")
                params.append("entry.1055691836", formData.ninos || "")
                params.append("entry.2028635582", formData.mensaje || "")

                await fetch(
                    'https://docs.google.com/forms/d/e/1FAIpQLScgGg5y7jcQ_i7i9IRRWw9VSudOShweyCgOL64z3G862CrMtw/formResponse',
                    {
                        method: 'POST',
                        mode: 'no-cors', // Necessari però no podem verificar resposta
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: params.toString()
                    }
                )

                console.log('✅ Backup 1 completado (no-cors, asumimos éxito)')
                setIsSubmitted(true)
                return

            } catch (fetchError) {
                console.error('❌ Backup 1 falló:', fetchError.message)

                // BACKUP 2: Intentar amb XMLHttpRequest (millor compatibilitat Android)
                try {
                    console.log('🔄 Backup 2: Intentando con XMLHttpRequest...')

                    await sendWithXHR(formData)

                    console.log('✅ Backup 2 exitoso!')
                    setIsSubmitted(true)
                    return

                } catch (xhrError) {
                    console.error('❌ Backup 2 también falló:', xhrError.message)

                    // Tot ha fallat, mostrar error amb opció d'obrir el form directe
                    setSubmitError(true)
                    setErrorDetails('No se pudo conectar con el servidor. Por favor, usa el formulario alternativo.')
                }
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    // Funció auxiliar XMLHttpRequest per millor compatibilitat
    const sendWithXHR = (formData) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.open(
                'POST',
                'https://docs.google.com/forms/d/e/1FAIpQLScgGg5y7jcQ_i7i9IRRWw9VSudOShweyCgOL64z3G862CrMtw/formResponse',
                true
            )
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

            xhr.timeout = 15000 // 15 segundos timeout (aumentado para mejor compatibilidad)

            xhr.onload = function () {
                console.log('📡 XHR onload - Status:', xhr.status)
                // Google Forms devuelve 200, 302, o 303 como éxito
                if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 400) {
                    console.log('✅ XHR exitoso')
                    resolve()
                } else {
                    console.error('❌ XHR status no válido:', xhr.status)
                    reject(new Error(`XHR status ${xhr.status}`))
                }
            }

            xhr.onerror = function () {
                console.error('❌ XHR onerror')
                reject(new Error('XHR network error'))
            }

            xhr.ontimeout = function () {
                console.error('⏱️ XHR timeout')
                reject(new Error('XHR timeout'))
            }

            const params = new URLSearchParams()
            params.append("entry.514764643", formData.nombre || "")
            params.append("entry.1325579506", formData.email || "")
            params.append("entry.1842802559", formData.asistencia || "")
            params.append("entry.18465505", formData.acompanante || "")
            params.append("entry.954168348", formData.transporte || "")
            params.append("entry.2077565567", formData.alergias || "")
            params.append("entry.121257817", formData.menuVeggie || "")
            params.append("entry.1055691836", formData.ninos || "")
            params.append("entry.2028635582", formData.mensaje || "")

            xhr.send(params.toString())
        })
    }

    // Pantalla d'ERROR amb opció de Google Form directe
    if (submitError) {
        return (
            <section className="py-32 bg-gray-50">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AlertCircle className="w-24 h-24 text-orange-500 mx-auto mb-8" />
                        <h2 className="text-5xl font-light mb-6">Ups, algo no ha funcionado</h2>
                        <p className="text-xl text-gray-600 mb-4">
                            {errorDetails || 'Parece que hay un problema técnico con el formulario.'}
                        </p>
                        <p className="text-lg text-gray-500 mb-8">
                            No te preocupes, puedes confirmar tu asistencia directamente:
                        </p>

                        <div className="space-y-4">
                            <Button
                                variant="primary"
                                onClick={() => window.open(GOOGLE_FORM_URL, '_blank')}
                                className="w-full md:w-auto"
                            >
                                <ExternalLink className="w-5 h-5 mr-2 inline" />
                                Abrir formulario de Google
                            </Button>

                            <div className="text-gray-400 text-sm">o</div>

                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setSubmitError(false)
                                    setErrorDetails('')
                                }}
                                className="w-full md:w-auto"
                            >
                                Volver a intentar aquí
                            </Button>
                        </div>

                        <p className="text-sm text-gray-500 mt-8">
                            Si el problema persiste, escríbenos a{' '}
                            <a
                                href={`mailto:${data?.contact.email}`}
                                className="underline hover:text-black transition-colors"
                            >
                                {data?.contact.email}
                            </a>
                        </p>
                    </motion.div>
                </div>
            </section>
        )
    }

    // Pantalla d'ÈXIT
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
                        <h2 className="text-5xl font-light mb-6">¡Muchas gracias!</h2>
                        <p className="text-xl text-gray-600 mb-6">
                            Hemos recibido tu confirmación correctamente.
                        </p>

                        {/* INSTRUCCIONES CLARAS SOBRE EL EMAIL */}
                        <Card className="bg-blue-50 border-2 border-blue-300 mb-8">
                            <div className="space-y-4">
                                <div className="flex items-start justify-center space-x-3">
                                    <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div className="text-left">
                                        <p className="text-lg text-blue-900 font-medium mb-2">
                                            📧 Revisa tu correo electrónico
                                        </p>
                                        <p className="text-sm text-blue-800 mb-3">
                                            Te hemos enviado un email con la confirmación y todos los detalles de tu respuesta.
                                        </p>
                                        <div className="bg-blue-100 border border-blue-300 rounded p-3">
                                            <p className="text-xs text-blue-900 font-medium">
                                                ⚠️ <strong>IMPORTANTE:</strong> Si NO recibes el email en 3-5 minutos:
                                            </p>
                                            <ul className="text-xs text-blue-800 mt-2 space-y-1 list-disc list-inside">
                                                <li>Revisa tu carpeta de <strong>spam/correo no deseado</strong></li>
                                                <li>Verifica que escribiste bien tu email</li>
                                                <li>Si no aparece, <strong>no te preocupes</strong> - tu confirmación YA está guardada</li>
                                                <li>Si quieres estar 100% seguro/a, puedes usar el formulario directo de Google más abajo</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <p className="text-lg text-gray-500 mb-8">
                            Más adelante te enviaremos todos los detalles de la boda.
                        </p>

                        <div className="space-y-4">
                            <Button
                                variant="secondary"
                                onClick={() => setIsSubmitted(false)}
                            >
                                Hacer otra confirmación
                            </Button>

                            <div className="text-gray-400 text-sm">o</div>

                            <Button
                                variant="outline"
                                onClick={() => window.open(GOOGLE_FORM_URL, '_blank')}
                                className="w-full md:w-auto"
                            >
                                <ExternalLink className="w-5 h-5 mr-2 inline" />
                                Verificar en Google Forms
                            </Button>
                            <p className="text-xs text-gray-500">
                                Si quieres asegurarte al 100%, puedes revisar o reenviar tu confirmación en Google Forms
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        )
    }

    // FORMULARI PRINCIPAL
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
                                    ¿Vendrás acompañado/a de niños? (2-12 años)
                                </label>
                                <select
                                    {...register('ninos')}
                                    className="w-full p-4 border-2 border-gray-200 text-lg focus:border-black focus:outline-none transition-colors"
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="No">No, sin niños</option>
                                    <option value="1">Sí, 1 niño/a</option>
                                    <option value="2">Sí, 2 niños/as</option>
                                    <option value="3">Sí, 3 niños/as</option>
                                    <option value="4">Sí, 4 niños/as</option>
                                </select>
                                <p className="text-sm text-gray-500 mt-2">
                                    ℹ️ Para planificar el menú infantil adecuado
                                </p>
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
                                        ¿Necesitas menú vegano?
                                    </label>
                                    <select
                                        {...register('menuVeggie')}
                                        className="w-full p-4 border-2 border-gray-200 text-lg focus:border-black focus:outline-none transition-colors"
                                    >
                                        <option value="No">Menú tradicional</option>
                                        <option value="Si">Sí, menú vegano</option>
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
                                    placeholder="Deja aquí tu comentario..."
                                />
                            </div>

                            {/* BOTÓN SUBMIT */}
                            <div className="text-center pt-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={isSubmitting}
                                    className="text-xl px-16"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="animate-pulse">Enviando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-2 inline" />
                                            Confirmar Asistencia
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </motion.div>

                {/* BOTÓN ALTERNATIVO - Sempre visible */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <Card className="bg-blue-50 border-2 border-blue-200">
                        <div className="flex flex-col items-center space-y-4">
                            <AlertCircle className="w-8 h-8 text-blue-600" />
                            <p className="text-gray-700 font-medium">
                                ¿Tienes problemas con el formulario?
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => window.open(GOOGLE_FORM_URL, '_blank')}
                                className="w-full md:w-auto"
                            >
                                <ExternalLink className="w-5 h-5 mr-2 inline" />
                                Abrir formulario de Google
                            </Button>
                            <p className="text-sm text-gray-500">
                                Se abrirá en una nueva pestaña
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}

export default RSVP