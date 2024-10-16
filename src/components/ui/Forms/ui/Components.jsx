// import React from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// const FormSchema = z.object({
// 	client: z.boolean(),
// 	username: z
// 		.string()
// 		.min(3, 'Username must not be lesser than 3 characters')
// 		.max(25, 'Username must not be greater than 25 characters')
// 		.regex(/^[a-zA-Z0-9_]+$/, 'The username must contain only letters, numbers and underscore (_)'),
// 	email: z.string().email('Invalid email. Email must be a valid email address'),
// 	password: z
// 		.string()
// 		.min(3, 'Password must not be lesser than 3 characters')
// 		.max(16, 'Password must not be greater than 16 characters'),
// 	fullName: z.string().min(3, 'Name must not be lesser than 3 characters'),
// 	age: z.string().refine(
// 		(age) => {
// 			return Number(age) >= 18
// 		},
// 		{ message: 'You must be 18 years or older' }
// 	)
// })

// export function Form({ defaultValues, children, onSubmit }) {
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors }
// 	} = useForm({
// 		resolver: zodResolver(FormSchema)
// 	})

// 	return (
// 		<form onSubmit={handleSubmit(onSubmit)}>
// 			{Array.isArray(children)
// 				? children.map((child) => {
//                         const name = child.props.name
// 						return child.props.name ? (
// 							<>
// 								{React.createElement(child.type, {
// 									...{
// 										...child.props,
// 										register,
// 										key: child.props.name
// 									}
// 								})}
// 								{errors?.`${name}`?.message && (
// 									<p className="mb-4 text-red-700">{errors.username.message}</p>
// 								)}
// 							</>
// 						) : (
// 							child
// 						)
// 					})
// 				: children}
// 		</form>
// 	)
// }

// export function FormInput({ register, name, ...rest }) {
// 	return <input {...register(name)} {...rest} />
// }

// export function Select({ register, options, name, ...rest }) {
// 	return (
// 		<select {...register(name)} {...rest}>
// 			{options.map((value) => (
// 				<option value={value}>{value}</option>
// 			))}
// 		</select>
// 	)
// }
