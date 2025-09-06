import { motion } from 'framer-motion'
import { Heart, Mail, Camera } from 'lucide-react'

const Footer = ({ data }) => {
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
                    <div className="flex justify-center space-x-6 mb-12">
                        <motion.a
                            href={`mailto:${data?.contact.email || 'bodaenmodocata@gmail.com'}`}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="bg-white/10 p-4 border border-white/20 hover:bg-white hover:text-black transition-all"
                        >
                            <Mail className="w-6 h-6" />
                        </motion.a>
                        <motion.a
                            href="https://photos.app.goo.gl/ENLACE_DEL_ALBUM"
                            target="_blank"
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="bg-white/10 p-4 border border-white/20 hover:bg-white hover:text-black transition-all"
                        >
                            <Camera className="w-6 h-6" />
                        </motion.a>
                    </div>

                    {/* Hashtag */}
                    <div className="text-2xl font-light mb-12 text-gray-300">
                        {data?.contact.hashtag}
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