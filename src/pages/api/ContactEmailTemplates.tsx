import {
	Body,
	Button,
	Container,
	Column,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Row,
	Section,
	Text
} from '@react-email/components'
import React from 'react';

interface ContactEmailTemplatesProps {
	client?: string,
	email?: string,
	message?: string
	emailContactCheck?: string[]
	fullName?: string,
	language?:string,
	phone?: string,
	query?: string,
	clientId?: string,
	subject?: string
  }

const ContactEmailTemplates = ({
	client ,
	email ,
	message ,
	emailContactCheck,
	fullName ,
	language,
	phone ,
	query ,
	clientId ,
	subject '
}:ContactEmailTemplatesProps) => {
	return (
		<Html>
			<Head />
			<Preview>DBInvesting Contact Details</Preview>
			<Body style={main}>
				<Container>
					<Section style={logo}>
						<Img
							style={dblogo}
							src={`https://cdn.dbinvesting.com/branding/base/db_log_update.png`}
						/>
					</Section>

					<Section style={content}>
						<Row style={{ ...boxInfos, paddingBottom: '0' }}>
							<Column>
								<Heading
									style={{
										fontSize: 22,
										fontWeight: 'bold',
										textAlign: 'left'
									}}
								>
									Contact Details:
								</Heading>
								<Heading
									as="h2"
									style={{
										fontSize: 18,
										fontWeight: 'bold',
										textAlign: 'left'
									}}
								>
									We need your assistance with some recent contact form data that we have observed.
								</Heading>

								<Text style={paragraph}>
									<b>Existing Client: </b>
									{client}
								</Text>

								<Text style={paragraph}>
									<b>Client ID: </b>
									{clientId}
								</Text>

								<Text style={paragraph}>
									<b>Full Name: </b>
									{fullName}
								</Text>

								<Text style={paragraph}>
									<b>Type of Query: </b>
									{query}
								</Text>

								<Text style={paragraph}>
									<b>Language preferred for support: </b>
									{language}
								</Text>

								<Text style={paragraph}>
									<b>Email: </b>
									{email}
								</Text>

								<Text style={paragraph}>
									<b>Phone: </b>
									{phone}
								</Text>

								<Text style={paragraph}>
									<b>How may we contact you?: </b>
									{emailContactCheck.toLocaleString()}
								</Text>

								<Text style={paragraph}>
									<b>Subject: </b>
									{subject}
								</Text>

								<Text style={paragraph}>
									<b>Message: </b>
									{message}
								</Text>
							</Column>
						</Row>
					</Section>
					<Text
						style={{
							textAlign: 'center',
							fontSize: 12,
							color: 'rgb(0,0,0, 0.7)'
						}}
					>
						© 2024 | DB Investing Limited.| www.dbinvesting.com
					</Text>
				</Container>
			</Body>
		</Html>
	)
}

export default ContactEmailTemplates

const main = {
	backgroundColor: '#fff',
	color: '#000',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
}

const paragraph = {
	fontSize: 16
}

const logo = {
	padding: '30px 20px'
}

const containerButton = {
	display: 'flex',
	justifyContent: 'center',
	width: '100%'
}

const button = {
	backgroundColor: '#e00707',
	borderRadius: 3,
	color: '#FFF',
	fontWeight: 'bold',
	border: '1px solid rgb(0,0,0, 0.1)',
	cursor: 'pointer',
	padding: '12px 30px'
}

const content = {
	border: '1px solid rgb(0,0,0, 0.1)',
	borderRadius: '3px',
	overflow: 'hidden'
}

const image = {
	maxWidth: '100%'
}

const dblogo = {
	maxWidth: '200px',
	margin: 'auto',
	marginBottom: '20px'
}

const boxInfos = {
	padding: '20px'
}

const containerImageFooter = {
	padding: '45px 0 0 0'
}
