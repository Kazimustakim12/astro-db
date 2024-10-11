// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import { type Multilingual } from '@/i18n'

export const SITE_TITLE: string | Multilingual = 'DB Investing - Dream Big Investing'

export const SITE_DESCRIPTION: string | Multilingual = {
	en: 'DB Investing is an online trading platform that offers users access to various financial markets, including forex, stocks, indices, and commodities. It provides trading tools, educational resources, and advanced technology to help traders execute trades efficiently. The platform is designed for both beginner and experienced traders, offering features such as multiple account types, competitive spreads, and leverage options. DBInvesting aims to deliver a user-friendly experience with access to MetaTrader 5, a widely recognized trading software, and a customer support team available to assist with inquiries.',
	ja: 'i18n 対応の Astro スターターテンプレート。',
	'zh-hans': '具有 i18n 支持的 Astro 入门模板。',
	ar: 'قالب بداية لـ Astro مع دعم i18n.'
}

export const X_ACCOUNT: string | Multilingual = '@db_investing'

export const NOT_TRANSLATED_CAUTION: string | Multilingual = {
	en: 'This page is not available in your language.',
	ja: 'このページはご利用の言語でご覧いただけません。',
	'zh-hans': '此页面不支持您的语言。',
	ar: 'هذه الصفحة غير متوفرة بلغتك.'
}
