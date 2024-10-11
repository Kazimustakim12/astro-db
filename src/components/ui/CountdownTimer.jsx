import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import client from '@/lib/apolloClient'
import { useTranslations } from '@/i18n'
import { formatDate } from '@fullcalendar/core/index.js'
import { localizeEventDates } from '@/lib/utils'

const CountdownTimer = ({ lang }) => {
	const t = useTranslations(lang)
	const GET_EVENTS = gql`
		query GET_EVENTS($language: String, $first: Int) {
			events(first: $first, where: { status: PUBLISH, language: $language }) {
				nodes {
					id
					endDate
					date
					excerpt
					startDate
					title
					timezone
					slug
					featuredImage {
						node {
							srcSet
							sourceUrl
							altText
							mediaDetails {
								height
								width
							}
						}
					}
				}
			}
		}
	`
	const [eventdata, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [currentEvent, setCurrentEvent] = useState(null)
	const [timeLeft, setTimeLeft] = useState(null)
	// Get the current date
	const currentDate = new Date()
	// load data from api for the to 10 events
	const loadEvent = async () => {
		setLoading(true)
		const { data, loading, error } = await client.query({
			query: GET_EVENTS,
			variables: {
				language: lang,
				first: 10
			}
		})
		const now = new Date()
		// Filter and sort upcoming events based on startDate
		const upcomingEvents = data.events.nodes
			.filter((event) => new Date(event.endDate) > now)
			.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

		if (upcomingEvents.length > 0) {
			setCurrentEvent(upcomingEvents[0])
		}

		setData(data.events.nodes)
		setLoading(false)
	}

	useEffect(() => {
		loadEvent()
	}, [])
	useEffect(() => {
		if (currentEvent) {
			const countdownInterval = setInterval(() => {
				const now = new Date()
				const startDate = new Date(currentEvent.startDate)
				const endDate = new Date(currentEvent.endDate)

				if (now < startDate) {
					// Countdown to startDate
					setTimeLeft(startDate - now)
				} else if (now >= startDate && now < endDate) {
					// Event ongoing, countdown to endDate
					setTimeLeft(endDate - now)
				} else {
					// If endDate has passed, move to the next event
					const nextEvent = getNextEvent()
					if (nextEvent) {
						setCurrentEvent(nextEvent)
					} else {
						clearInterval(countdownInterval) // No more events
						setTimeLeft(null)
					}
				}
			}, 1000)

			return () => clearInterval(countdownInterval)
		}
	}, [currentEvent])

	// Get the next event from the sorted list of events
	const getNextEvent = () => {
		const now = new Date()
		const upcomingEvents = eventdata.events.nodes
			.filter((event) => new Date(event.endDate) > now)
			.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

		if (upcomingEvents.length > 0) {
			return upcomingEvents[0] // Return the next event
		}
		return null
	}
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
	// Format time in hours, minutes, and seconds
	const formatTimeLeft = (time) => {
		const days = Math.floor(time / (1000 * 60 * 60 * 24))
		const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((time % (1000 * 60)) / 1000)

		return (
			<div>
				<div class="count-down-main flex w-full items-start justify-start gap-2">
					<div class="timer w-16">
						<div class="overflow-hidden rounded-lg border border-gray-200 px-2 py-4 dark:border-neutral-700">
							<h3 class="countdown-element days font-Cormorant text-center text-2xl font-semibold text-black dark:text-white">
								{days}
							</h3>
						</div>
						<p class="font-Cormorant mt-1 w-full text-center text-lg font-medium text-green-700 dark:text-green-400">
							days
						</p>
					</div>
					<h3 class="font-manrope mt-[20px] text-2xl font-semibold text-green-700 dark:text-green-400">
						:
					</h3>
					<div class="timer w-16">
						<div class="overflow-hidden rounded-lg border border-gray-200 px-2 py-4 dark:border-neutral-700">
							<h3 class="countdown-element hours font-Cormorant text-center text-2xl font-semibold text-black dark:text-white">
								{hours}
							</h3>
						</div>
						<p class="font-Cormorant mt-1 w-full text-center text-lg font-normal text-green-700 dark:text-green-400">
							hours
						</p>
					</div>
					<h3 class="font-manrope mt-[20px] text-2xl font-semibold text-green-700 dark:text-green-400">
						:
					</h3>
					<div class="timer w-16">
						<div class="overflow-hidden rounded-lg border border-gray-200 px-2 py-4 dark:border-neutral-700">
							<h3 class="countdown-element minutes font-Cormorant text-center text-2xl font-semibold text-black dark:text-white">
								{minutes}
							</h3>
						</div>
						<p class="font-Cormorant mt-1 w-full text-center text-lg font-normal text-green-700 dark:text-green-400">
							minutes
						</p>
					</div>
					<h3 class="font-manrope mt-[20px] text-2xl font-semibold text-green-700 dark:text-green-400">
						:
					</h3>
					<div class="timer w-16">
						<div class="overflow-hidden rounded-lg border border-gray-200 px-2 py-4 dark:border-neutral-700">
							<h3 class="countdown-element seconds font-Cormorant animate-countinsecond text-center text-2xl font-semibold text-black dark:text-white">
								{seconds}
							</h3>
						</div>
						<p class="font-Cormorant mt-1 w-full text-center text-lg font-normal text-green-700 dark:text-green-400">
							seconds
						</p>
					</div>
				</div>
			</div>
		)
	}
	return loading ? (
		<>
			<div class="flex animate-pulse">
				<div class="ms-4 mt-2 w-full">
					<p class="h-4 rounded-full bg-gray-200 dark:bg-neutral-700"></p>

					<ul class="mt-5 space-y-3">
						<li class="h-4 w-full rounded-full bg-gray-200 dark:bg-neutral-700"></li>
						<li class="h-4 w-full rounded-full bg-gray-200 dark:bg-neutral-700"></li>
						<li class="h-4 w-full rounded-full bg-gray-200 dark:bg-neutral-700"></li>
						<li class="h-4 w-full rounded-full bg-gray-200 dark:bg-neutral-700"></li>
					</ul>
				</div>
			</div>
		</>
	) : (
		<div>
			{currentEvent ? (
				<div>
					<div className="my-5">
						{timeLeft ? <> {formatTimeLeft(timeLeft)}</> : 'Event has ended'}
					</div>
					<h2 className="sm:text-md mb-6 text-2xl font-bold">{currentEvent.title}</h2>
					{currentEvent.featuredImage !== null ? (
						<img
							className="w-full max-w-[280px] rounded-md"
							src={currentEvent?.featuredImage?.node?.mediaItemUrl}
							alt={currentEvent?.featuredImage?.node?.altText}
							srcSet={currentEvent?.featuredImage?.node?.srcSet}
							loading="lazy"
							width={currentEvent?.featuredImage?.node?.mediaDetails?.width}
							height={currentEvent?.featuredImage?.node?.mediaDetails?.height}
						/>
					) : null}
					<div className="my-4 flex flex-wrap gap-2 font-semibold text-green-700 dark:text-green-400">
						<span>
							{/* {new Date(currentEvent.startDate).toLocaleString('en-US', {
								...formatOptions,
								timeZone: currentEvent.timezone
							})} */}
							{localizeEventDates(currentEvent, lang).localizedStart}
						</span>
						<span>-</span>
						<span>
							{/* {new Date(currentEvent.endDate).toLocaleString('en-US', {
								...formatOptions,
								timeZone: currentEvent.timezone
							})} */}
							{/* {localozedDates.localizedEnd} */}
							{localizeEventDates(currentEvent, lang).localizedEnd}
						</span>
					</div>
					<p
						className="mt-5 text-gray-600 dark:text-neutral-400"
						dangerouslySetInnerHTML={{ __html: currentEvent.excerpt }}
					/>
					<a
						href="https://www.youtube.com/@dbinvesting"
						target="_blank"
						class='dark:focus:bg-neutral-700" mt-6 inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-black shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700'
					>
						<span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="34.14"
								height="24"
								viewBox="0 0 256 180"
							>
								<path
									fill="#f00"
									d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"
								/>
								<path fill="#fff" d="m102.421 128.06l66.328-38.418l-66.328-38.418z" />
							</svg>
						</span>
						{t({
							en: 'Watch on YouTube',
							ar: 'شاهد على يوتيوب',
							es: 'Ver en YouTube',
							fr: 'Regarder sur YouTube',
							hi: 'यूट्यूब पर देखें',
							id: 'Tonton di YouTube',
							ms: 'Tonton di YouTube',
							th: 'ดูบน YouTube',
							vi: 'Xem trên YouTube',
							bn: 'ইউটিউবে দেখুন',
							'zh-hans': '在YouTube上观看',
							'pt-br': 'Assistir no YouTube'
						})}
					</a>
				</div>
			) : (
				<p>
					{t({
						en: 'No upcoming events',
						ar: 'لا توجد أحداث قادمة',
						es: 'No hay eventos próximos',
						fr: 'Aucun événement à venir',
						hi: 'कोई आगामी इवेंट नहीं',
						id: 'Tidak ada acara yang akan datang',
						ms: 'Tiada acara yang akan datang',
						th: 'ไม่มีเหตุการณ์ที่จะเกิดขึ้น',
						vi: 'Không có sự kiện sắp tới',
						bn: 'কোন আসন্ন ইভেন্ট নেই',
						'zh-hans': '没有即将到来的活动',
						'pt-br': 'Nenhum evento futuro'
					})}
				</p>
			)}
		</div>
	)
}

export default CountdownTimer
