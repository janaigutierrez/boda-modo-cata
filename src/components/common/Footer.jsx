// src/components/common/Footer.jsx
import { motion } from 'framer-motion'
import { Heart, Instagram, Mail, Camera } from 'lucide-react'
import Button from '../ui/Button'

const Footer = ({ data }) => {
    return (
        <footer className="bg-black text-white py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-5xl font-light mb-8">¡Nos casamos!</h3>
                    <p className="text-xl text-gray-300 mb-12">
                        {data?.messages.footerMessage}
                    </p>

                    {/* Countdown o fecha */}
                    <div className="mb-12">
                        <div className="text-3xl font-light mb-4">
                            {data?.date.full}
                        </div>
                        <div className="text-gray-400">
                            {data?.couple.bride} & {data?.couple.groom} junto a {data?.couple.dog} 🐕
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-6 mb-12">
                        <motion.a
                            href={`https://instagram.com/${data?.contact.instagram?.replace('@', '') || 'raqueldani2025'}`}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-all"
                        >
                            <Instagram className="w-6 h-6" />
                        </motion.a>
                        <motion.a
                            href={`mailto:${data?.contact.email || 'raqueldani2025@gmail.com'}`}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-all"
                        >
                            <Mail className="w-6 h-6" />
                        </motion.a>
                        <motion.a
                            href="#galeria"
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-all"
                        >
                            <Camera className="w-6 h-6" />
                        </motion.a>
                    </div>

                    {/* Hashtag */}
                    <div className="text-2xl font-light mb-12 text-gray-300">
                        {data?.contact.hashtag}
                    </div>

                    {/* Botón RSVP adicional */}
                    <div className="mb-8">
                        <Button
                            variant="secondary"
                            onClick={() => {
                                document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                        >
                            ¿Aún no has confirmado?
                        </Button>
                    </div>

                    {/* Credits */}
                    <div className="border-t border-gray-800 pt-8 text-gray-400">
                        <p>Con amor, {data?.couple.bride}, {data?.couple.groom} y {data?.couple.dog} 🐕</p>
                        <div className="flex justify-center items-center space-x-2 mt-4">
                            <span>Made with</span>
                            <Heart className="w-4 h-4 text-red-500" />
                            <span>en modo cata</span>
                        </div>
                        <div className="mt-2 text-sm">
                            bodaenmodocata.netlify.app ✨
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer