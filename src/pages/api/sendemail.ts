export const prerender = false
import sgMail from '@sendgrid/mail'
// Initialize SendGrid with API Key from environment variables
sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY)
// Import the APIRoute type from Astro
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
	console.log('API route hit in dev mode')
	const {
		client,
		email,
		emailContactCheck,
		fullName,
		language,
		message,
		phone,
		query,
		subject,
		clientId
	} = await request.json()
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

	let toEmails: string[] = []

	switch (query) {
		case 'General Enquiry':
			toEmails = ['cs@dbinvesting.com', 'kazi@onetek.pro', 'george@onetek.pro']
			// toEmails = ['kazi@onetek.pro', 'george@onetek.pro']
			break
		case 'Onboarding Support':
			toEmails = ['backoffice@dbinvesting.com', 'kazi@onetek.pro', 'george@onetek.pro']
			break
		case 'Deposit Support':
			toEmails = [
				'backoffice@dbinvesting.com',
				'finance@dbinvesting.com',
				'kazi@onetek.pro',
				'george@onetek.pro'
			]
			break
		case 'Withdrawal Support':
			toEmails = [
				'backoffice@dbinvesting.com',
				'finance@dbinvesting.com',
				'kazi@onetek.pro',
				'george@onetek.pro'
			]
			break
		case 'Technical Issue Support':
			toEmails = [
				'backoffice@dbinvesting.com',
				'it@dbinvesting.com',
				'kazi@onetek.pro',
				'george@onetek.pro'
			]
			break
		case 'Complaint':
			toEmails = [
				'backoffice@dbinvesting.com',
				'complaint@dbinvesting.com',
				'kazi@onetek.pro',
				'george@onetek.pro'
			]
			break
		default:
			toEmails = ['cs@dbinvesting.com', 'kazi@onetek.pro', 'george@onetek.pro'] // Fallback option
	}
	console.log(toEmails, 'to emails')
	const msg = {
		from: 'backoffice@dbinvesting.com', // Verified sender email in SendGrid
		replyTo: email, // Your email or the recipient's email
		to: toEmails,
		subject: `New contact message from ${fullName} for query ${query}`,
		html: `<body style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" width="100%" border="0"   role="presentation" style="max-width:37.5em">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0"   role="presentation" style="padding:30px 20px">
              <tbody>
                <tr>
                  <td>
                    <a href="https://dbinvesting.com/" target="_blank">
                      <img src="https://cdn.dbinvesting.com/branding/base/db_log_update.png" style="display:block;outline:none;border:none;text-decoration:none;max-width: 200px;margin: auto;" alt="dbinvesting-logo-img">
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0"   role="presentation" style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0"   role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%"><img src="https://react-email-demo-3kjjfblod-resend.vercel.app/static/yelp-header.png" style="display:block;outline:none;border:none;text-decoration:none;max-width:100%" width="620" /></tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0"   role="presentation" style="padding:20px;padding-bottom:0">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td data-id="__react-email-column">
                            <h1 style="font-size:22px;font-weight:bold;text-align:left">Contact Details</h1>
                            <h2 style="font-size:18px;font-weight:bold;text-align:left">We need your assistance with some recent contact form data that we have observed.</h2>
                            <p style="font-size:16px;line-height:24px;margin:16px 0"><b>Existing Client: </b>${client}</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0"><b>Client ID: </b>${clientId}</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"><b>Full Name: </b>${fullName}</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"><b>Type of Query: </b>${query}</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"><b>Language preferred for support: </b>${language}</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"><b>Email: </b>${email?.toString()}</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"><b>Phone: </b>${phone}</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"><b>How may we contact you?: </b>${emailContactCheck}</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"><b>Subject: </b>${subject}</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"><b>Message: </b>${message}</p>  
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:12px;line-height:24px;margin:16px 0;text-align:center;color:rgb(0,0,0, 0.7)">© 2024 | DB Investing Limited.| www.dbinvesting.com</p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>`
	}

	try {
		await sgMail.send(msg)

		return new Response(JSON.stringify({ success: true, message: 'Email sent successfully!' }), {
			status: 200
		})
	} catch (error) {
		console.error('Error sending email:', error)
		return new Response(JSON.stringify({ success: false, message: error }), {
			status: 500
		})
	}
}

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
