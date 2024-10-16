import type { APIRoute } from 'astro'
import sgMail from '@sendgrid/mail'
// Initialize SendGrid with API Key from environment variables
sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY)

export const POST: APIRoute = async ({ request }) => {
	console.log('API route hit in dev mode')
	const { client, email, emailContactCheck, fullName, language, message, phone, query, subject } =
		await request.json()
	// Validate the data - you'll probably want to do more than this
	if (
		!client ||
		!email ||
		!message ||
		!emailContactCheck ||
		!fullName ||
		!language ||
		!phone ||
		!query ||
		!subject
	) {
		return new Response(
			JSON.stringify({
				message: 'Missing required fields'
			}),
			{ status: 400 }
		)
	}
	const msg = {
		to: 'developer@dbinvesting.com', // Your email or the recipient's email
		from: 'kazimustakim.mt.12@gmail.com', // Verified sender email in SendGrid
		subject: `New message from ${fullName}`,
		text: message,
		html: `<p>You have a new message from <strong>${fullName}</strong> (${email}):</p><p>${message}</p>`
	}

	try {
		await sgMail.send(msg)
		return new Response(JSON.stringify({ success: true, message: 'Email sent successfully!' }), {
			status: 200
		})
	} catch (error) {
		console.error('Error sending email:', error)
		return new Response(JSON.stringify({ success: false, message: 'Failed to send email.' }), {
			status: 500
		})
	}
}
