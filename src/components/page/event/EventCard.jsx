import { formatDate } from '@fullcalendar/core/index.js'
import React from 'react'
import { useTranslations } from '@/i18n'
import { localizeEventDates } from '@/lib/utils'
const EventCard = ({ event, lang = 'en' }) => {
	const t = useTranslations(lang)
	const todayDate = new Date()
	const endDate = new Date(event.endDate)
	const localozedDates = localizeEventDates(event, lang)
	return (
		<article className="h-full">
			<a
				className="group relative flex h-full flex-col rounded-xl border border-gray-200 p-5 transition duration-300 hover:border-transparent hover:shadow-lg focus:border-transparent focus:shadow-lg focus:outline-none dark:border-neutral-700 dark:hover:border-transparent dark:hover:shadow-black/40 dark:focus:border-transparent dark:focus:shadow-black/40"
				href={`/${lang}/event/${event.slug}/`}
				aria-label={event.title}
			>
				<div className="aspect-w-16 aspect-h-11">
					<img
						className="rounded-md"
						src={event?.featuredImage?.node?.mediaItemUrl}
						alt={event?.featuredImage?.node?.altText}
						srcSet={event?.featuredImage?.node?.srcSet}
						loading="lazy"
						width={event?.featuredImage?.node?.mediaDetails?.width}
						height={event?.featuredImage?.node?.mediaDetails?.height}
					/>
				</div>
				<div className="pb-2 pt-4">
					{todayDate > endDate ? (
						<span className="px-1 text-red-600">
							{t({
								en: 'Event Ended',
								ar: 'انتهى الحدث',
								es: 'Evento terminado',
								fr: 'Événement terminé',
								hi: 'इवेंट समाप्त हुआ',
								id: 'Acara Berakhir',
								ms: 'Acara Berakhir',
								th: 'เหตุการณ์สิ้นสุด',
								vi: 'Sự kiện đã kết thúc',
								bn: 'ইভেন্ট শেষ',
								'zh-hans': '活动结束',
								'pt-br': 'Evento Encerrado'
							})}
						</span>
					) : (
						<span className="px-1 text-green-600">
							{t({
								en: 'Upcoming Event',
								ar: 'الحدث القادم',
								es: 'Próximo evento',
								fr: 'Événement à venir',
								hi: 'आगामी इवेंट',
								id: 'Acara Mendatang',
								ms: 'Acara Mendatang',
								th: 'เหตุการณ์ที่กำลังจะเกิดขึ้น',
								vi: 'Sự kiện sắp tới',
								bn: 'আসন্ন ইভেন্ট',
								'zh-hans': '即将举行的活动',
								'pt-br': 'Próximo Evento'
							})}
						</span>
					)}
				</div>
				<div className="flex flex-wrap gap-2">
					<span>{localozedDates.localizedStart}</span>
					<span>-</span>
					<span>{localozedDates.localizedEnd}</span>
				</div>
				<div className="mb-2 mt-2">
					<h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:group-hover:text-white">
						{event.title}
					</h3>
					<p
						className="mt-5 line-clamp-4 text-gray-600 dark:text-neutral-400"
						dangerouslySetInnerHTML={{ __html: event.excerpt }}
					/>
				</div>
			</a>
		</article>
	)
}

export default EventCard
