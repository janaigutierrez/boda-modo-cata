// src/components/ui/Button.jsx
import { motion } from 'framer-motion'

const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
    const variants = {
        primary: 'bg-black text-white hover:bg-gray-800',
        secondary: 'bg-white text-black border-2 border-black hover:bg-black hover:text-white',
        outline: 'border-2 border-black text-black hover:bg-black hover:text-white'
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`
        px-8 py-4 rounded-2xl font-medium text-lg
        transition-all duration-300 
        ${variants[variant]} 
        ${className}
      `}
        >
            {children}
        </motion.button>
    )
}

export default Button