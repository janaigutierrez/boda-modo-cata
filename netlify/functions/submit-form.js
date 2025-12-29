// netlify/functions/submit-form.js
import { Resend } from 'resend'
import { Heart, Send, CheckCircle, AlertCircle, ExternalLink, Mail } from 'lucide-react'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function handler(event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    }

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' }
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        }
    }

    try {
        const formData = JSON.parse(event.body)

        console.log('📥 Formulario recibido de:', formData.nombre || 'Sin nombre')
        console.log('📧 Email destinatario:', formData.email)
        console.log('🆔 Submission ID:', formData.submissionId || 'No ID')
        console.log('📱 User Agent:', formData.userAgent || 'Unknown')
        console.log('💻 Platform:', formData.platform || 'Unknown')
        console.log('⏰ Server Time:', new Date().toISOString())

        // ============================================
        // PASO 1: ENVIAR A GOOGLE FORMS
        // ============================================
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

        // Aumentar timeout a 15 segundos para mejores conexiones
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000)

        const googleResponse = await fetch(
            'https://docs.google.com/forms/d/e/1FAIpQLScgGg5y7jcQ_i7i9IRRWw9VSudOShweyCgOL64z3G862CrMtw/formResponse',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params.toString(),
                signal: controller.signal
            }
        )

        clearTimeout(timeoutId)
        console.log('✅ Google Forms respuesta:', googleResponse.status, googleResponse.statusText)

        // ============================================
        // VERIFICAR QUE GOOGLE FORMS HA FUNCIONAT
        // ============================================
        const googleSuccess = googleResponse.ok || googleResponse.status === 302 || googleResponse.status === 303

        if (!googleSuccess) {
            console.error('❌ Google Forms falló, NO se enviará email')
            throw new Error(`Google Forms respondió con status ${googleResponse.status}`)
        }

        console.log('✅ Google Forms OK, procediendo a enviar email...')

        // ============================================
        // PASO 2: ENVIAR EMAIL DE CONFIRMACIÓN (SOLO SI GOOGLE FORMS OK)
        // ============================================

        // Formatear datos para el email
        const asistenciaTexto = formData.asistencia === 'Si'
            ? '✅ ¡Sí, estaré ahí! 🎉'
            : '❌ No podré asistir 😢'

        const acompananteTexto = formData.acompanante
            ? formData.acompanante
            : 'No especificado'

        const transporteTexto = formData.transporte === 'Si'
            ? '🚌 Sí, autobús desde Caldes de Montbui'
            : formData.transporte === 'No'
                ? '🚗 No necesito transporte'
                : 'No especificado'

        const ninosTexto = formData.ninos && formData.ninos !== 'No' && formData.ninos !== ''
            ? `👶 ${formData.ninos} niño/s`
            : '👤 Sin niños'

        const alergiasTexto = formData.alergias === 'Si'
            ? '⚠️ Sí (ver mensaje)'
            : '✅ No'

        const menuVeggieTexto = formData.menuVeggie === 'Si'
            ? '🌱 Menú vegano'
            : '🍖 Menú tradicional'

        try {
            // Enviar email de confirmación al invitado
            const emailResult = await resend.emails.send({
                from: 'Boda Raquel y Daniel <onboarding@resend.dev>', // Temporal, canviar després
                to: formData.email,
                subject: '✅ Confirmación recibida - Boda Raquel y Daniel',
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>
                    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f5f5f5;">
                        <div style="max-width: 600px; margin: 40px auto; background-color: white; border: 2px solid #1a1a1a;">
                            
                            <!-- Header -->
                            <div style="background-color: #1a1a1a; color: white; padding: 40px 30px; text-align: center;">
                                <h1 style="margin: 0; font-size: 32px; font-weight: 300;">
                                    ¡Gracias, ${formData.nombre}!
                                </h1>
                                <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">
                                    Confirmación recibida correctamente ✅
                                </p>
                            </div>

                            <!-- Body -->
                            <div style="padding: 40px 30px;">
                                <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0 0 20px 0;">
                                    Hemos recibido tu confirmación de asistencia para nuestra boda. 
                                    Aquí tienes un resumen de tu respuesta:
                                </p>

                                <!-- Datos confirmación -->
                                <div style="background-color: #f9f9f9; border: 2px solid #e5e5e5; padding: 25px; margin: 30px 0;">
                                    <div style="margin-bottom: 15px;">
                                        <strong style="color: #1a1a1a;">Asistencia:</strong><br>
                                        <span style="font-size: 18px;">${asistenciaTexto}</span>
                                    </div>
                                    
                                    <div style="margin-bottom: 15px;">
                                        <strong style="color: #1a1a1a;">Acompañante:</strong><br>
                                        <span>${acompananteTexto}</span>
                                    </div>
                                    
                                    <div style="margin-bottom: 15px;">
                                        <strong style="color: #1a1a1a;">Transporte:</strong><br>
                                        <span>${transporteTexto}</span>
                                    </div>
                                    
                                    <div style="margin-bottom: 15px;">
                                        <strong style="color: #1a1a1a;">Niños (2-12 años):</strong><br>
                                        <span>${ninosTexto}</span>
                                    </div>
                                    
                                    <div style="margin-bottom: 15px;">
                                        <strong style="color: #1a1a1a;">Alergias/Intolerancias:</strong><br>
                                        <span>${alergiasTexto}</span>
                                    </div>
                                    
                                    <div style="margin-bottom: ${formData.mensaje ? '15px' : '0'};">
                                        <strong style="color: #1a1a1a;">Menú:</strong><br>
                                        <span>${menuVeggieTexto}</span>
                                    </div>
                                    
                                    ${formData.mensaje ? `
                                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
                                        <strong style="color: #1a1a1a;">Tu mensaje:</strong><br>
                                        <span style="font-style: italic; color: #555;">"${formData.mensaje}"</span>
                                    </div>
                                    ` : ''}
                                </div>

                                ${formData.asistencia === 'Si' ? `
                                <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0;">
                                    <p style="margin: 0; font-size: 14px; color: #1e40af; line-height: 1.6;">
                                        <strong>📅 Fecha:</strong> 17 de Julio de 2026<br>
                                        <strong>⏰ Ceremonia:</strong> 17:30h<br>
                                        <strong>🍽️ Banquete:</strong> 19:30h<br><br>
                                        Más adelante te enviaremos todos los detalles.
                                    </p>
                                </div>
                                ` : ''}

                                <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 30px 0 10px 0;">
                                    ¡Nos vemos pronto! 💕
                                </p>
                                
                                <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0;">
                                    <strong>Raquel y Daniel</strong> (y Cata 🐕)
                                </p>
                            </div>

                            <!-- Footer -->
                            <div style="background-color: #f9f9f9; padding: 25px 30px; border-top: 2px solid #e5e5e5;">
                                <p style="margin: 0; font-size: 13px; color: #666; line-height: 1.6;">
                                    Si tienes alguna pregunta, escríbenos a 
                                    <a href="mailto:bodaenmodocata@gmail.com" style="color: #1a1a1a; text-decoration: none;">
                                        bodaenmodocata@gmail.com
                                    </a>
                                </p>
                                <p style="margin: 15px 0 0 0; font-size: 12px; color: #999;">
                                    Si no has sido tú quien ha rellenado este formulario, por favor ignora este email.
                                </p>
                            </div>

                        </div>
                    </body>
                    </html>
                `
            })

            console.log('✅ Email enviado correctamente:', emailResult.id)

            // ============================================
            // PASO 3: ENVIAR NOTIFICACIÓN BACKUP A LOS NOVIOS
            // ============================================
            // Esto asegura que SIEMPRE sepáis cuando alguien confirma, incluso si el email al invitado falla
            try {
                await resend.emails.send({
                    from: 'Sistema RSVP <onboarding@resend.dev>',
                    to: 'bodaenmodocata@gmail.com',
                    subject: `✅ Nueva confirmación: ${formData.nombre}`,
                    html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="utf-8">
                        </head>
                        <body style="font-family: Arial, sans-serif; padding: 20px;">
                            <h2>✅ Nueva confirmación recibida</h2>
                            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                            <p><strong>Submission ID:</strong> ${formData.submissionId || 'N/A'}</p>
                            <p><strong>Estado email al invitado:</strong> Enviado correctamente ✅</p>
                            <hr>
                            <h3>Información técnica:</h3>
                            <ul style="font-size: 12px; color: #666;">
                                <li><strong>User Agent:</strong> ${formData.userAgent || 'Unknown'}</li>
                                <li><strong>Platform:</strong> ${formData.platform || 'Unknown'}</li>
                            </ul>
                            <hr>
                            <h3>Datos del invitado:</h3>
                            <ul>
                                <li><strong>Nombre:</strong> ${formData.nombre}</li>
                                <li><strong>Email:</strong> ${formData.email}</li>
                                <li><strong>Asistencia:</strong> ${asistenciaTexto}</li>
                                <li><strong>Acompañante:</strong> ${acompananteTexto}</li>
                                <li><strong>Transporte:</strong> ${transporteTexto}</li>
                                <li><strong>Niños:</strong> ${ninosTexto}</li>
                                <li><strong>Alergias:</strong> ${alergiasTexto}</li>
                                <li><strong>Menú:</strong> ${menuVeggieTexto}</li>
                                ${formData.mensaje ? `<li><strong>Mensaje:</strong> "${formData.mensaje}"</li>` : ''}
                            </ul>
                            <hr>
                            <p style="color: #666; font-size: 12px;">
                                Este email se envía automáticamente para asegurar que tengáis registro de todas las confirmaciones.
                            </p>
                        </body>
                        </html>
                    `
                })
                console.log('✅ Email backup a novios enviado')
            } catch (backupEmailError) {
                console.error('⚠️ Error enviando email backup a novios:', backupEmailError)
                // No fallar la petición por esto, solo loguear
            }

        } catch (emailError) {
            console.error('⚠️ Error enviando email:', emailError)

            // Email al invitado falló, pero Google Forms funcionó
            // Enviar notificación a los novios con WARNING
            try {
                await resend.emails.send({
                    from: 'Sistema RSVP <onboarding@resend.dev>',
                    to: 'bodaenmodocata@gmail.com',
                    subject: `⚠️ Confirmación recibida (email falló): ${formData.nombre}`,
                    html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="utf-8">
                        </head>
                        <body style="font-family: Arial, sans-serif; padding: 20px;">
                            <h2>⚠️ Nueva confirmación recibida (con problema de email)</h2>
                            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
                                <p><strong>⚠️ ATENCIÓN:</strong> El formulario se guardó correctamente en Google Forms,
                                pero el email de confirmación al invitado NO se pudo enviar.</p>
                                <p><strong>Error:</strong> ${emailError.message}</p>
                            </div>
                            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                            <p><strong>Submission ID:</strong> ${formData.submissionId || 'N/A'}</p>
                            <hr>
                            <h3>Información técnica:</h3>
                            <ul style="font-size: 12px; color: #666;">
                                <li><strong>User Agent:</strong> ${formData.userAgent || 'Unknown'}</li>
                                <li><strong>Platform:</strong> ${formData.platform || 'Unknown'}</li>
                                <li><strong>Error completo:</strong> ${emailError.stack || emailError.message}</li>
                            </ul>
                            <hr>
                            <h3>Datos del invitado:</h3>
                            <ul>
                                <li><strong>Nombre:</strong> ${formData.nombre}</li>
                                <li><strong>Email:</strong> ${formData.email}</li>
                                <li><strong>Asistencia:</strong> ${formData.asistencia}</li>
                                <li><strong>Acompañante:</strong> ${formData.acompanante || 'N/A'}</li>
                                <li><strong>Transporte:</strong> ${formData.transporte || 'N/A'}</li>
                                <li><strong>Niños:</strong> ${formData.ninos || 'No'}</li>
                                <li><strong>Alergias:</strong> ${formData.alergias || 'No'}</li>
                                <li><strong>Menú:</strong> ${formData.menuVeggie || 'Tradicional'}</li>
                                ${formData.mensaje ? `<li><strong>Mensaje:</strong> "${formData.mensaje}"</li>` : ''}
                            </ul>
                            <hr>
                            <p style="color: #666; font-size: 12px;">
                                💡 <strong>Recomendación:</strong> Considera contactar manualmente con ${formData.nombre}
                                en ${formData.email} para confirmar que recibió la información de la boda.
                            </p>
                        </body>
                        </html>
                    `
                })
                console.log('✅ Email de warning a novios enviado')
            } catch (backupEmailError) {
                console.error('❌ Error crítico: No se pudo enviar ni email al invitado ni backup a novios')
            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    emailSent: false,
                    warning: 'Formulario guardado pero email no enviado',
                    timestamp: new Date().toISOString()
                })
            }
        }

        // ============================================
        // RESPOSTA D'ÈXIT
        // ============================================
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                emailSent: true,
                message: 'Formulario enviado y email de confirmación enviado',
                timestamp: new Date().toISOString()
            })
        }

    } catch (error) {
        console.error('❌ Error general:', error.message)

        if (error.name === 'AbortError') {
            return {
                statusCode: 504,
                headers,
                body: JSON.stringify({
                    success: false,
                    error: 'Timeout al conectar con Google Forms'
                })
            }
        }

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                error: error.message
            })
        }
    }
}