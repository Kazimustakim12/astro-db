import { Controller, useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
export default function ContactForm() {
	const [status, setStatus] = useState('')
	const [statusCode, setStatusCode] = useState('')

	const {
		register,
		handleSubmit,
		isDirty,
		formState: { errors },
		watch,
		getValues,
		control
	} = useForm()
	// const onSubmit = (data) => console.log(data)
	const onSubmit = async (data) => {
		setStatus('Sending...')
		console.log(data, 'Data')

		try {
			const response = await fetch('/api/sendemail', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			})

			const result = await response.json()

			if (result.success) {
				setStatus('Email sent successfully!')
				setStatusCode(result.success)
			} else {
				setStatus('Failed to send email.')
			}
		} catch (error) {
			setStatus('Error occurred while sending email.')
		}
	}
	console.log(errors)
	const isClient = watch('client')

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					Existing Client: <span className="text-red-500">*</span>
				</label>
				<select
					className="w-full rounded border border-gray-600 p-2"
					{...register('client', { required: 'Please atleast one option' })}
				>
					<option value="No">No</option>
					<option value="yes">yes</option>
				</select>
				{errors?.client && <p className="mt-2 text-sm text-red-600">{errors?.client?.message}</p>}
			</div>
			{isClient === 'yes' && (
				<div className="mb-4">
					<label className="text-md mb-2 block font-bold text-green-500">
						Client ID: <span className="text-red-500">*</span>
					</label>
					<input
						className="w-full rounded border border-gray-600 p-2"
						type="number"
						placeholder="Your Client ID"
						{...register('clientId', { required: 'This is  required' })}
					/>
					{errors?.clientId && (
						<p className="mt-2 text-sm text-red-600">{errors?.clientId?.message}</p>
					)}
				</div>
			)}
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					Full Name: <span className="text-red-500">*</span>
				</label>
				<input
					className="w-full rounded border border-gray-600 p-2"
					type="text"
					placeholder="Full Name"
					{...register('fullName', { required: 'This is  required' })}
				/>
				{errors?.fullName && (
					<p className="mt-2 text-sm text-red-600">{errors?.fullName?.message}</p>
				)}
			</div>
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					Type of Query: <span className="text-red-500">*</span>
				</label>
				<select
					className="w-full rounded border border-gray-600 p-2"
					{...register('query', { required: 'This is  required' })}
				>
					<option value="General Enquiry">Genral Enquiry (no client)</option>
					<option value="Onboarding Support">Onboarding Support</option>
					<option value="Deposit Support">Deposit Suport</option>
					<option value="Withdrawal Support">Wihdrawal Suport</option>
					<option value="Technical Issue Support">Technical Issue Suport</option>
					<option value="Complaint">Complaint</option>
				</select>
				{errors?.query && <p className="mt-2 text-sm text-red-600">{errors?.query?.message}</p>}
			</div>
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					Language preferred for support: <span className="text-red-500">*</span>
				</label>
				<select
					className="w-full rounded border border-gray-600 p-2"
					{...register('language', { required: 'This is  required' })}
				>
					<option value="English">English</option>
					<option value="Arabic">Arabic</option>
					<option value="Spanish">Spanish</option>
					<option value="Portuguese">Portuguese</option>
				</select>
				{errors?.language && (
					<p className="mt-2 text-sm text-red-600">{errors?.language?.message}</p>
				)}
			</div>
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					Email: <span className="text-red-500">*</span>
				</label>
				<input
					className="w-full rounded border border-gray-600 p-2 placeholder:text-neutral-400"
					type="text"
					placeholder="Email"
					{...register('email', {
						required: 'Invalid email. Email must be a valid email address',
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'Entered value does not match email format'
						}
					})}
				/>
				{errors?.email && <p className="mt-2 text-sm text-red-600">{errors?.email?.message}</p>}
			</div>
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					Phone: <span className="text-red-500">*</span>
				</label>
				<Controller
					control={control}
					name="phone"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						// <ReactDatePicker
						// 	onChange={onChange} // send value to hook form
						// 	onBlur={onBlur} // notify when input is touched/blur
						// 	selected={value}
						// />
						<PhoneInput defaultCountry="ua" value={value} onChange={onChange} onBlur={onBlur} />
					)}
				/>
				{/* <input
					className="w-full rounded border border-gray-600 p-2 placeholder:text-neutral-400"
					type="tel"
					placeholder="Phone Number"
					{...register('phoneNumber', { required: 'This is  required' })}
				/> */}
				{errors?.phoneNumber && (
					<p className="mt-2 text-sm text-red-600">{errors?.phoneNumber?.message}</p>
				)}
			</div>
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					How may we contact you? <span className="text-red-500">*</span>
				</label>
				<div className="mb-4 flex items-center gap-4">
					<label className="flex items-center">
						<input
							type="checkbox"
							value="email"
							className="mr-2"
							placeholder="emailContactCheck"
							{...register('emailContactCheck', {
								validate: {
									atLeastOneRequired: (value) =>
										(value && value.length >= 1) || 'Please Choose one method to Contact You'
								}
							})}
						/>
						<span className="text-white">Email</span>
					</label>
					<label className="flex items-center">
						<input
							type="checkbox"
							value="phone"
							className="mr-2"
							placeholder="phoneContactCheck"
							{...register('emailContactCheck', {
								validate: {
									atLeastOneRequired: (value) =>
										(value && value.length >= 1) || 'Please choose one method to contact you'
								}
							})}
						/>
						<span className="text-white">Phone</span>
					</label>
				</div>
				{errors?.emailContactCheck && (
					<p className="mt-2 text-sm text-red-600">{errors?.emailContactCheck?.message}</p>
				)}
			</div>

			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					Subject: <span className="text-red-500">*</span>
				</label>
				<input
					className="w-full rounded border border-gray-600 p-2 placeholder:text-neutral-400"
					type="text"
					placeholder="Subject"
					{...register('subject', { required: 'This is  required' })}
				/>
				{errors?.subject && <p className="mt-2 text-sm text-red-600">{errors?.subject?.message}</p>}
			</div>
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					Message: <span className="text-red-500">*</span>
				</label>
				<input
					className="w-full rounded border border-gray-600 p-2 placeholder:text-neutral-400"
					type="text"
					placeholder="Message"
					{...register('message', { required: 'This is  required' })}
				/>
				{errors?.message && <p className="mt-2 text-sm text-red-600">{errors?.message?.message}</p>}
			</div>

			<p className={`my-6 text-sm ${setStatusCode ? 'text-green-400' : ''}`}>{status}</p>
			<button class="btn_gradient group relative inline-flex h-12 w-full items-center justify-center gap-x-2 overflow-hidden rounded-full bg-black px-6 text-center text-white transition dark:bg-white">
				<span class="relative">Submit</span>
				<div class="animate-shine-infinite absolute inset-0 -top-[20px] flex h-[calc(100%+40px)] w-full justify-center blur-[12px]">
					<div class="relative h-full w-8 bg-white/30" />
				</div>
			</button>
		</form>
	)
}
