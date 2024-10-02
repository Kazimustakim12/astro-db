import React, { useEffect } from 'react'
import { useState } from 'react'
import gql from 'graphql-tag'
import client from '@/lib/apolloClient'
import { useTranslations } from '@/i18n'
import Calendar from './Calendar'
import EventCard from './EventCard'

// GraphQL query to get Event with cursor-based pagination
const GET_EVENTS = gql`
	query GET_EVENTS($language: String, $first: Int) {
		events(first: $first, where: { status: PUBLISH, language: $language }) {
			pageInfo {
				endCursor
				hasNextPage
				hasPreviousPage
				startCursor
			}
			nodes {
				id
				endDate
				date
				startDate
				title
				timezone
				status
				hideFromUpcoming
				link
				phone
				slug
				featured
				excerpt
				content
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

const BlogList = ({ lang }) => {
	const t = useTranslations(lang)
	const [Event, setEvent] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [isGrid, setIsGrid] = useState(false)
	const [CalendarEvent, setCalendarEvent] = useState([])
	const loadMoreEvent = async (variables) => {
		setLoading(true)
		const { data, loading, error } = await client.query({
			query: GET_EVENTS,
			variables: variables
				? variables
				: {
						language: lang,
						first: 8
					}
		})
		if (error) return `Error! ${error.message}`
		if (data) {
			const modifiedData = data.events.nodes.map((item) => ({
				title: item.title,
				start: new Date(item.startDate).toISOString(),
				end: new Date(item.endDate).toISOString(),
				url: `/${lang}/event/${item.slug}`,
				allDay: false,
				description: item.excerpt,
				image: item?.featuredImage !== null ? item?.featuredImage.node?.sourceUrl : ''
			}))
			setEvent(data.events)
			setCalendarEvent(modifiedData)
		}
		setLoading(false)
	}
	useEffect(() => {
		loadMoreEvent()
	}, [])
	if (error) return <p className="text-3xl text-red-600">{error[0].message}</p>

	return (
		<>
			{loading ? (
				<>
					<div className="flex animate-pulse sm:grid-cols-2 lg:grid-cols-2">
						<div className="shrink-0">
							<span className="block size-12 rounded-full bg-gray-200 dark:bg-neutral-700"></span>
						</div>

						<div className="ms-4 mt-2 w-full">
							<p className="h-4 rounded-full bg-gray-200 dark:bg-neutral-700"></p>

							<ul className="mt-5 space-y-3">
								<li className="h-4 w-full rounded-full bg-gray-200 dark:bg-neutral-700"></li>
								<li className="h-4 w-full rounded-full bg-gray-200 dark:bg-neutral-700"></li>
								<li className="h-4 w-full rounded-full bg-gray-200 dark:bg-neutral-700"></li>
								<li className="h-4 w-full rounded-full bg-gray-200 dark:bg-neutral-700"></li>
							</ul>
						</div>
					</div>
				</>
			) : Event && Event.nodes.length > 0 ? (
				<div>
					<div className="mb-10 flex items-center justify-center gap-3">
						<button
							className={`${isGrid ? '' : 'btn_gradient text-white'} dark:focus:bg-neutral-700" inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-dbgreen-900 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700`}
							onClick={() => {
								setIsGrid(false)
							}}
						>
							<span>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<rect width="14" height="0" x="5" y="5" fill="currentColor">
										<animate
											fill="freeze"
											attributeName="height"
											begin="0.6s"
											dur="0.2s"
											values="0;3"
										/>
									</rect>
									<g
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
									>
										<path
											strokeDasharray="64"
											strokeDashoffset="64"
											d="M12 4h7c0.55 0 1 0.45 1 1v14c0 0.55 -0.45 1 -1 1h-14c-0.55 0 -1 -0.45 -1 -1v-14c0 -0.55 0.45 -1 1 -1Z"
										>
											<animate
												fill="freeze"
												attributeName="stroke-dashoffset"
												dur="0.6s"
												values="64;0"
											/>
										</path>
										<path strokeDasharray="4" strokeDashoffset="4" d="M7 4v-2M17 4v-2">
											<animate
												fill="freeze"
												attributeName="stroke-dashoffset"
												begin="0.6s"
												dur="0.2s"
												values="4;0"
											/>
										</path>
										<path strokeDasharray="12" strokeDashoffset="12" d="M7 11h10">
											<animate
												fill="freeze"
												attributeName="stroke-dashoffset"
												begin="0.8s"
												dur="0.2s"
												values="12;0"
											/>
										</path>
										<path strokeDasharray="8" strokeDashoffset="8" d="M7 15h7">
											<animate
												fill="freeze"
												attributeName="stroke-dashoffset"
												begin="1s"
												dur="0.2s"
												values="8;0"
											/>
										</path>
									</g>
								</svg>
							</span>
							Calender View
						</button>

						<button
							className={`${isGrid ? 'btn_gradient text-white' : ''} inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-dbgreen-900 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700`}
							onClick={() => {
								setIsGrid(true)
							}}
						>
							<span>
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16">
									<path
										fill="currentColor"
										d="M0 0h4v4H0zm0 6h4v4H0zm0 6h4v4H0zM6 0h4v4H6zm0 6h4v4H6zm0 6h4v4H6zm6-12h4v4h-4zm0 6h4v4h-4zm0 6h4v4h-4z"
									/>
								</svg>
							</span>
							Grid View
						</button>
					</div>
					{isGrid ? (
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
							{Event.nodes.map((item, index) => {
								return (
									<div data-aos="fade-up-sm" data-aos-delay={`${index + 1}00`}>
										<EventCard event={item} lang={lang} />
									</div>
								)
							})}
						</div>
					) : (
						<Calendar data={CalendarEvent} locale={lang} />
					)}
				</div>
			) : (
				<div>
					{t({
						en: 'No Event were found...',
						ar: 'لم يتم العثور على منشورات...',
						es: 'No se encontraron publicaciones...',
						fr: 'Aucun post trouvé...',
						hi: 'कोई पोस्ट नहीं मिली...',
						id: 'Tidak ada postingan yang ditemukan...',
						ms: 'Tiada pos ditemui...',
						th: 'ไม่พบโพสต์...',
						vi: 'Không tìm thấy bài đăng...',
						bn: 'কোন পোস্ট পাওয়া যায়নি...',
						'zh-cn': '未找到帖子...',
						'pt-br': 'Nenhum post encontrado...'
					})}
				</div>
			)}
		</>
	)
}

export default BlogList
