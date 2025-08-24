import { motion } from 'framer-motion'

const Card = ({ children, className = '', hover = true, gradient = false }) => {
    return (
        <motion.div
            whileHover={hover ? { y: -5, scale: 1.01 } : {}}
            className={`
        bg-white p-8 shadow-lg 
        border-2 border-gray-200
        transition-all duration-300
        ${hover ? 'hover:shadow-xl hover:border-black' : ''}
        ${gradient ? 'bg-gradient-to-br from-white to-gray-50' : ''}
        ${className}
      `}
        >
            {children}
        </motion.div>
    )
}

export default Card