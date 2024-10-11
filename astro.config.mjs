import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import node from '@astrojs/node'
import react from '@astrojs/react'
import cloudflare from '@astrojs/cloudflare'

import vercel from '@astrojs/vercel/serverless'

export default defineConfig({
	site: 'http://localhost:4321/',
	integrations: [
		tailwind({ applyBaseStyles: false }),
		icon(),
		react()
	],

	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'fr', 'zh-hans', 'ar', 'es', 'hi', 'id', 'ms', 'th', 'vi', 'bn', 'pt-br'],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false
		}
	},
	output: 'hybrid',
	adapter: node({
		mode: 'standalone'
	}),
	image: {
		domains: ['astro.build', 'dev.dbinvesting.com']
	}
})
