import { useState, useEffect } from 'react'

const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const target = new Date(targetDate).getTime()
            const now = new Date().getTime()
            const difference = target - now

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((difference % (1000 * 60)) / 1000)

                setTimeLeft({ days, hours, minutes, seconds })
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            }
        }

        // Calcular inmediatamente
        calculateTimeLeft()

        // Actualizar cada segundo
        const timer = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    const timeUnits = [
        { label: 'Días', value: timeLeft.days },
        { label: 'Horas', value: timeLeft.hours },
        { label: 'Minutos', value: timeLeft.minutes },
        { label: 'Segundos', value: timeLeft.seconds }
    ]

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="bg-black text-white px-8 py-4 border-2 border-black font-mono text-2xl tracking-wider">
                {timeLeft.days.toString().padStart(2, '0')}:
                {timeLeft.hours.toString().padStart(2, '0')}:
                {timeLeft.minutes.toString().padStart(2, '0')}:
                {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="flex justify-center space-x-8 text-sm text-gray-500 font-mono">
                <span>DÍAS</span>
                <span>HRS</span>
                <span>MIN</span>
                <span>SEG</span>
            </div>
        </div>
    )
}

export default CountdownTimer