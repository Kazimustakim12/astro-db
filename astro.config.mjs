import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'

import react from '@astrojs/react'

import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({ nesting: true, applyBaseStyles: false }),
		icon({
			include: {
				// Include only three `mdi` icons in the bundle
				mdi: ['*'],
				// Include all `uis` icons
				uis: ['*']
			}
		}),
		react()
	],

	output: 'hybrid',

	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'fr', 'zh-hans', 'ar', 'es', 'hi', 'id', 'ms', 'th', 'vi', 'bn', 'pt-br'],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false
		}
	},

	adapter: cloudflare()
})
