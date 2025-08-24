// src/components/common/Header.jsx - CON LOGO Y ESTILOS ANGULARES
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({
            behavior: 'smooth'
        })
        setIsMobileMenuOpen(false)
    }

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-[#d7dddf] backdrop-blur-md shadow-lg'
                : 'bg-[#d7dddf] backdrop-blur-md shadow-lg'
                }`}

        >
            <nav className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo + Texto */}
                    <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold text-black">D | R</div>
                        <img
                            src="/images/logo-white.jpeg"
                            alt="Logo"
                            className="h-8 w-auto"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                    </div>

                    {/* Desktop Menu - ESTILOS ANGULARES */}
                    <div className="hidden md:flex space-x-8">
                        {[
                            { name: 'Inicio', id: 'hero' },
                            { name: 'Historia', id: 'story' },
                            { name: 'Detalles', id: 'detalles' },
                            { name: 'RSVP', id: 'rsvp' }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-gray-600 hover:text-black transition-colors font-medium px-4 py-2 border border-transparent hover:border-black rounded-none"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 border border-black rounded-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu - ESTILO ANGULAR */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden mt-4 bg-white border border-black shadow-lg rounded-none"
                    >
                        <div className="p-6 space-y-2">
                            {[
                                { name: 'Inicio', id: 'hero' },
                                { name: 'Historia', id: 'story' },
                                { name: 'Detalles', id: 'detalles' },
                                { name: 'RSVP', id: 'rsvp' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="block w-full text-left py-3 px-4 text-gray-600 hover:text-black hover:bg-gray-100 transition-colors font-medium border-b border-gray-200 last:border-b-0"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </nav>
        </motion.header>
    )
}

export default Header