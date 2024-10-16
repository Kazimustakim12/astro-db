// src/pages/api/create-brevo-contact.ts

// Because I chose hybrid, I need to specify that this endpoint should run on the server:
export const prerender = false
import sgMail from '@sendgrid/mail'
// Initialize SendGrid with API Key from environment variables
sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY)
// Import the APIRoute type from Astro
import type { APIRoute } from 'astro'

// This is the function that will be called when the endpoint is hit
export const POST: APIRoute = async ({ request }) => {
	console.log('API route hit in dev mode')
	// Check if the request is a JSON request
	// if (request.headers.get('content-type') === 'application/json') {
	// 	// Get the body of the request
	// 	const body = await request.json()

	// 	// Get the email from the body
	// 	const email = body.email

	// 	// Declares the Brevo API URL
	// 	const BREVO_API_URL = 'https://api.brevo.com/v3/contacts'

	// 	// Gets the Brevo API Key from an environment variable
	// 	// Check the note on environment variables in the SSR section of this article to understand what is going on here
	// 	const BREVO_API_KEY = import.meta.env.BREVO_API_KEY ?? process.env.BREVO_API_KEY

	// 	// Just a simple check to make sure the API key is defined in an environment variable
	// 	if (!BREVO_API_KEY) {
	// 		console.error('No BREVO_API_KEY defined')
	// 		return new Response(null, { status: 400 })
	// 	}

	// 	// The payload that will be sent to Brevo
	// 	// This payload will create or update the contact and add it to the list with ID 3
	// 	const payload = {
	// 		updateEnabled: true,
	// 		email: email,
	// 		listIds: [3]
	// 	}

	// 	// Whatever process you want to do in your API endpoint should be inside a try/catch block
	// 	// In this case we're sending a POST request to Brevo
	// 	try {
	// 		// Make a POST request to Brevo
	// 		const response = await fetch(BREVO_API_URL, {
	// 			method: 'POST',
	// 			headers: {
	// 				accept: 'application/json',
	// 				'api-key': BREVO_API_KEY,
	// 				'content-type': 'application/json'
	// 			},
	// 			body: JSON.stringify(payload)
	// 		})

	// 		// Check if the request was successful
	// 		if (response.ok) {
	// 			// Request succeeded
	// 			console.log('Contact added successfully')

	// 			// Return a 200 status and the response to our frontend
	// 			return new Response(
	// 				JSON.stringify({
	// 					message: 'Contact added successfully'
	// 				}),
	// 				{
	// 					status: 200
	// 				}
	// 			)
	// 		} else {
	// 			// Request failed
	// 			console.error('Failed to add contact to Brevo')

	// 			// Return a 400 status to our frontend
	// 			return new Response(null, { status: 400 })
	// 		}
	// 	} catch (error) {
	// 		// An error occurred while doing our API operation
	// 		console.error('An unexpected error occurred while adding contact:', error)

	// 		// Return a 400 status to our frontend
	// 		return new Response(null, { status: 400 })
	// 	}
	// }
	console.log('API route hit in dev mode')
	if (request.headers.get('content-type') === 'application/json') {
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
	// If the POST request is not a JSON request, return a 400 status to our frontend
	return new Response(null, { status: 400 })
}

// This function will be called when the endpoint is hit with a GET request
export const GET: APIRoute = async ({ request }) => {
	// Do some stuff here

	// Return a 200 status and a response to the frontend
	return new Response(
		JSON.stringify({
			message: 'Send Email Operation Run successful'
		}),
		{
			status: 200
		}
	)
}
