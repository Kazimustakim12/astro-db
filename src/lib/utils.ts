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
export function localizeEventDates(event: any, lang: string) {
	// Get visitor's time zone
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

	// Create Date objects (assuming the provided dates are in UTC)
	const startDatelocal = new Date(event?.startDate + 'Z') // Add 'Z' to indicate UTC
	const endDatelocal = new Date(event?.endDate + 'Z')

	// Localize Dates with custom format
	const localizedStart = startDatelocal.toLocaleString(lang, {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		hour12: true,
		hour: '2-digit',
		minute: '2-digit',
		timeZone: userTimeZone
	})

	const localizedEnd = endDatelocal.toLocaleString(lang, {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		hour12: true,
		hour: '2-digit',
		minute: '2-digit',
		timeZone: userTimeZone
	})

	// Return localized dates
	return {
		localizedStart,
		localizedEnd
	}
}
