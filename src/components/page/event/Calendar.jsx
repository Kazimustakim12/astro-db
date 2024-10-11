import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useTranslations } from '@/i18n'

function renderEventContent(eventInfo) {
	console.log(eventInfo.view.dateEnv.locale, 'code')
	const t = useTranslations(eventInfo.view.dateEnv.locale.codeArg)

	return (
		<div
			className={`flex w-full flex-wrap gap-1 p-1 ${eventInfo.isPast ? 'opacity-65' : 'opacity-100'}`}
		>
			{eventInfo.event.extendedProps.image !== '' && (
				<img width={130} src={eventInfo.event.extendedProps.image} alt={eventInfo.event.title} />
			)}
			<div className="flex gap-2 py-3">
				{eventInfo.isPast ? (
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
					<span className="px-1 text-green-600" style={{ overflowWrap: 'anywhere' }}>
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
			<p className="mb-1 text-neutral-800 dark:text-neutral-300">{eventInfo.timeText}</p>
			<p
				className="overflow-ellipsis text-[12px] text-neutral-800 dark:text-neutral-300"
				style={{ overflowWrap: 'anywhere' }}
			>
				{eventInfo.event.title}
			</p>
		</div>
	)
}

const Calendar = ({ data, locale = 'en' }) => {
	const t = useTranslations(locale)
	console.log(data, 'CalendarEvent data')
	return (
		<FullCalendar
			height="680px"
			displayEventEnd={true}
			eventColor="green"
			plugins={[dayGridPlugin]}
			initialView="dayGridMonth"
			events={data}
			locale={locale}
			eventContent={renderEventContent}
			buttonText={{
				today: t({
					en: 'Today',
					ar: 'اليوم',
					es: 'Hoy',
					fr: "Aujourd'hui",
					hi: 'आज',
					id: 'Hari ini',
					ms: 'Hari ini',
					th: 'วันนี้',
					vi: 'Hôm nay',
					bn: 'আজ',
					'zh-hans': '今天',
					'pt-br': 'Hoje'
				})
			}}
		/>
	)
}

export default Calendar
