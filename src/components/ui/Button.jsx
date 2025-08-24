import { motion } from 'framer-motion'

const Button = ({ children, variant = 'primary', onClick, className = '', icon: Icon }) => {
    const variants = {
        primary: 'bg-black text-white hover:bg-gray-800 border-2 border-black',
        secondary: 'bg-white text-black border-2 border-black hover:bg-black hover:text-white',
        outline: 'bg-transparent border-2 border-black text-black hover:bg-black hover:text-white'
    }

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
        px-8 py-4 font-medium text-lg
        transition-all duration-300 
        ${variants[variant]} 
        ${className}
        flex items-center justify-center space-x-2
      `}
        >
            <span>{children}</span>
            {Icon && <Icon className="w-5 h-5" />}
        </motion.button>
    )
}

export default Button