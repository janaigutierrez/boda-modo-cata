// src/components/common/Header.jsx
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
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-black">D | R</div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {[
                            { name: 'Inicio', id: 'hero' },
                            { name: 'Catalina', id: 'catalina' },
                            { name: 'Detalles', id: 'detalles' },
                            { name: 'RSVP', id: 'rsvp' }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-gray-600 hover:text-black transition-colors font-medium"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden mt-4 bg-white rounded-2xl p-6 shadow-lg"
                    >
                        {[
                            { name: 'Inicio', id: 'hero' },
                            { name: 'Catalina', id: 'catalina' },
                            { name: 'Detalles', id: 'detalles' },
                            { name: 'RSVP', id: 'rsvp' }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="block w-full text-left py-3 text-gray-600 hover:text-black transition-colors font-medium"
                            >
                                {item.name}
                            </button>
                        ))}
                    </motion.div>
                )}
            </nav>
        </motion.header>
    )
}

export default Header