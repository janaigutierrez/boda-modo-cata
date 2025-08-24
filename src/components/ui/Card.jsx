// src/components/ui/Card.jsx  
import { motion } from 'framer-motion'

const Card = ({ children, className = '', hover = true }) => {
    return (
        <motion.div
            whileHover={hover ? { y: -10, scale: 1.02 } : {}}
            className={`
        bg-white p-8 rounded-3xl shadow-lg 
        border border-gray-100
        transition-all duration-300
        ${hover ? 'hover:shadow-2xl' : ''}
        ${className}
      `}
        >
            {children}
        </motion.div>
    )
}

export default Card