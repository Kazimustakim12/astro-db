import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'

function renderEventContent(eventInfo) {
	console.log(eventInfo, 'event info')
	return (
		<div
			className={`"flex p-1" flex-wrap gap-1 ${eventInfo.isPast ? 'opacity-65' : 'opacity-100'}`}
		>
			{eventInfo.event.extendedProps.image !== '' && (
				<img width={130} src={eventInfo.event.extendedProps.image} alt={eventInfo.event.title} />
			)}
			<div className="flex gap-2 py-3">
				{eventInfo.isPast ? (
					<span className="px-1 text-red-600">Ended</span>
				) : (
					<span className="px-1 text-green-600">Upcoming</span>
				)}

				<p className="text-neutral-800 dark:text-neutral-300">{eventInfo.timeText}</p>
			</div>
			<p className="text-[12px] text-neutral-800 dark:text-neutral-300">{eventInfo.event.title}</p>
		</div>
	)
}

const Calendar = ({ data, locale }) => {
	console.log(data, 'CalendarEvent data')
	return (
		<FullCalendar
			displayEventEnd={true}
			eventColor="green"
			plugins={[dayGridPlugin]}
			initialView="dayGridMonth"
			events={data}
			locale={locale}
			eventContent={renderEventContent}
		/>
	)
}

export default Calendar
