import { motion } from 'framer-motion'
import { Heart, Mail, Camera, Gift } from 'lucide-react'
import { useState } from 'react'

const Footer = ({ data }) => {
    const [showIBAN, setShowIBAN] = useState(false)
    const [copied, setCopied] = useState(false)

    const IBAN = "ES90 0073 0100 5908 6244 6837"

    const copyToClipboard = () => {
        navigator.clipboard.writeText(IBAN.replace(/\s/g, ''))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }
    return (

        <footer className="bg-[#292421] text-white py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-5xl font-light mb-8">¡Nos casamos!</h3>

                    {/* Logo + Fecha */}
                    <div className="mb-12 flex flex-col items-center space-y-6">
                        <div className="flex items-center justify-center space-x-6">
                            <div className="text-3xl font-light">
                                {data?.date.full}
                            </div>
                            <img
                                src="/images/logo-black.jpeg"
                                alt="Logo"
                                className="h-12 w-auto"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-6 mb-12 relative">
                        <motion.a
                            href={`mailto:${data?.contact.email || 'bodaenmodocata@gmail.com'}`}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="bg-white/10 p-4 border border-white/20 hover:bg-white hover:text-black transition-all"
                            aria-label="Enviar email"
                        >
                            <Mail className="w-6 h-6" />
                        </motion.a>

                        <motion.a
                            href={data?.contact.photoAlbum || "https://photos.app.goo.gl/ENLACE_DEL_ALBUM"}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="bg-white/10 p-4 border border-white/20 hover:bg-white hover:text-black transition-all"
                            aria-label="Ver álbum de fotos"
                        >
                            <Camera className="w-6 h-6" />
                        </motion.a>

                        {/* Botó Regalo amb popup */}
                        <div className="relative">
                            <motion.button
                                onClick={() => setShowIBAN(!showIBAN)}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="bg-white/10 p-4 border border-white/20 hover:bg-white hover:text-black transition-all"
                                aria-label="Ver número de cuenta"
                            >
                                <Gift className="w-6 h-6" />
                            </motion.button>

                            {/* Popup del IBAN */}
                            {showIBAN && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 bg-white text-black p-6  shadow-2xl border-2 border-gray-200 min-w-[320px] z-50"
                                >
                                    {/* Fletxa que apunta al botó */}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-2">
                                        <div className="w-4 h-4 bg-white border-b-2 border-r-2 border-gray-200 rotate-45"></div>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-2 font-medium">
                                        Número de cuenta
                                    </p>
                                    <p className="text-md font-mono font-bold text-black mb-4 select-all">
                                        {IBAN}
                                    </p>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={copyToClipboard}
                                            className="flex-1 bg-black text-white px-4 py-2  hover:bg-gray-800 transition-colors text-sm font-medium"
                                        >
                                            {copied ? '✓ Copiado!' : 'Copiar'}
                                        </button>
                                        <button
                                            onClick={() => setShowIBAN(false)}
                                            className="px-4 py-2 border-2 border-gray-200 hover:bg-gray-100 transition-colors text-sm font-medium"
                                        >
                                            Cerrar
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Hashtag */}
                    <div className="text-2xl font-light mb-8 text-gray-300">
                        {data?.contact.hashtag}
                    </div>

                    {/* Call to action del álbum */}
                    <div className="mb-12">
                        <p className="text-gray-300 mb-4">
                            ¡Comparte tus fotos de la boda con nosotros!
                        </p>
                        <motion.a
                            href={data?.contact.photoAlbum || "https://photos.app.goo.gl/dSDsppXbDSu5ZxTNA"}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block bg-white text-black px-8 py-3 font-medium hover:bg-gray-200 transition-all"
                        >
                            Subir fotos al álbum
                        </motion.a>
                    </div>

                    {/* Credits */}
                    <div className="border-t border-gray-800 pt-8 text-gray-400">
                        <div className="flex justify-center items-center space-x-2">
                            <span>Made with</span>
                            <Heart className="w-4 h-4 text-red-500" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer