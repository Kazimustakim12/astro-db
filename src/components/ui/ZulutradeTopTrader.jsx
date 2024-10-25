'use client'
import React from 'react'
import { ContainerScroll } from './ContainerScroll'
import { Safari } from '../magicui/SafariMock'
import { useTranslations } from '@/i18n'

const ZulutradeTopTrader = ({ lang }) => {
	const t = useTranslations(lang)
	return (
		<ContainerScroll
			titleComponent={
				<>
					<h1 className="text-4xl font-semibold text-black dark:text-white">
						{t({
							en: 'Top Traders Ranked',
							ar: 'أفضل المتداولين مرتبة',
							es: 'Los mejores traders clasificados',
							fr: 'Meilleurs traders classés',
							hi: 'शीर्ष व्यापारियों की रैंकिंग',
							id: 'Pedagang Teratas Diberi Peringkat',
							ms: 'Pedagang Teratas Diberi Peringkat',
							th: 'ผู้ค้าอันดับต้น ๆ',
							vi: 'Nhà giao dịch hàng đầu được xếp hạng',
							bn: 'শীর্ষ ব্যবসায়ীদের র‍্যাঙ্কিং',
							'zh-hans': '顶级交易员排名',
							'pt-br': 'Top Traders Ranqueados'
						})}{' '}
						<br />
						<span className="mt-1 text-4xl font-bold leading-none text-dbgreen-500 md:text-[6rem]">
							{t({
								en: 'ZuluTrade',
								ar: 'زولو تريد',
								es: 'ZuluTrade',
								fr: 'ZuluTrade',
								hi: 'जुलु ट्रेड',
								id: 'ZuluTrade',
								ms: 'ZuluTrade',
								th: 'ZuluTrade',
								vi: 'ZuluTrade',
								bn: 'জুলু ট্রেড',
								'zh-hans': 'ZuluTrade',
								'pt-br': 'ZuluTrade'
							})}
						</span>
					</h1>
				</>
			}
		>
			<Safari
				url="dbinvesting.zulutrade.com"
				className="size-full"
				ifrmaeSrc="https://www.zulutrade.com/widgets/performance?size=20&view=7&lang=row"
			/>
		</ContainerScroll>
	)
}

export default ZulutradeTopTrader
