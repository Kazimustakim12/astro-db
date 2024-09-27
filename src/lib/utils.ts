import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
export function formatDate(dateString: string) {
	const date = new Date(dateString)

	// Use toLocaleDateString to format the date as "Month Day, Year"
	const options = { year: 'numeric', month: 'long', day: 'numeric' }
	return date.toLocaleDateString('en-US', options)
}
