export const DEFAULT_LOCALE_SETTING = 'en'

export const LOCALES_SETTING: LocaleSetting = {
	en: {
		label: 'English',
		iconName: 'circle-flags:uk'
	},
	es: {
		label: 'Español',
		iconName: 'circle-flags:es'
	},
	'zh-hans': {
		label: '简体中文',
		lang: 'zh-hans',
		iconName: 'circle-flags:zh'
	},
	ar: {
		label: 'العربية',
		dir: 'rtl',
		iconName: 'circle-flags:sa'
	},
	fr: {
		label: 'Français',
		iconName: 'circle-flags:fr'
	},
	hi: {
		label: 'हिंदी',
		iconName: 'circle-flags:in'
	},
	id: {
		label: 'Indonesia',
		iconName: 'circle-flags:id'
	},
	ms: {
		label: 'Melayu',
		iconName: 'circle-flags:my'
	},
	th: {
		label: 'แบบไทย',
		iconName: 'circle-flags:th'
	},
	vi: {
		label: 'Tiếng Việt',
		iconName: 'circle-flags:vn'
	},
	bn: {
		label: 'বাংলা',
		iconName: 'circle-flags:bd'
	},
	'pt-br': {
		label: 'Português',
		iconName: 'circle-flags:br'
	}
}

interface LocaleSetting {
	[key: Lowercase<string>]: {
		label: string
		iconName: String
		lang?: string
		dir?: 'rtl' | 'ltr'
	}
}
