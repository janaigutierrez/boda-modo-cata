// netlify/functions/submit-form.js
export async function handler(event, context) {
    // Headers CORS per permetre peticions des del frontend
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    }

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        }
    }

    // Només acceptem POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        }
    }

    try {
        // Parsejar el body
        const formData = JSON.parse(event.body)

        console.log('📥 Formulario recibido de:', formData.nombre || 'Sin nombre')
        console.log('📱 Headers:', event.headers['user-agent'])

        // Construir URLSearchParams per Google Forms
        const params = new URLSearchParams()
        params.append("entry.514764643", formData.nombre || "")
        params.append("entry.1325579506", formData.email || "")
        params.append("entry.1842802559", formData.asistencia || "")
        params.append("entry.18465505", formData.acompanante || "")
        params.append("entry.954168348", formData.transporte || "")
        params.append("entry.2077565567", formData.alergias || "")
        params.append("entry.121257817", formData.menuVeggie || "")
        params.append("entry.1055691836", formData.ninos || "")
        params.append("entry.2028635582", formData.mensaje || "")

        console.log('📤 Enviando a Google Forms...')

        // Fer la petició a Google Forms amb timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 segons timeout

        const response = await fetch(
            'https://docs.google.com/forms/d/e/1FAIpQLScgGg5y7jcQ_i7i9IRRWw9VSudOShweyCgOL64z3G862CrMtw/formResponse',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
                signal: controller.signal
            }
        )

        clearTimeout(timeoutId)

        console.log('✅ Respuesta de Google:', response.status, response.statusText)

        // Google Forms normalment retorna 200 OK o 302 redirect
        if (response.ok || response.status === 302 || response.status === 303) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    message: 'Formulario enviado correctamente a Google Sheets',
                    timestamp: new Date().toISOString()
                })
            }
        } else {
            console.error('⚠️ Google Forms respuesta inesperada:', response.status)

            // Retornar error però amb info
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    success: false,
                    error: 'Error al enviar a Google Forms',
                    details: `Status ${response.status}`,
                    googleStatus: response.status
                })
            }
        }

    } catch (error) {
        console.error('❌ Error en la función:', error.message)

        // Diferenciar tipus d'error
        if (error.name === 'AbortError') {
            return {
                statusCode: 504,
                headers,
                body: JSON.stringify({
                    success: false,
                    error: 'Timeout al conectar con Google Forms',
                    details: 'La petición tardó demasiado'
                })
            }
        }

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                error: 'Error interno del servidor',
                details: error.message
            })
        }
    }
}