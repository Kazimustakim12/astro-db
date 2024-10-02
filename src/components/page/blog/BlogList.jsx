import React, { useEffect } from 'react'
import { useState } from 'react'

import gql from 'graphql-tag'
import client from '@/lib/apolloClient'
import BlogCard from './BlogCard'
import { useTranslations } from '@/i18n'

// GraphQL query to get posts with cursor-based pagination
const GET_POSTS = gql`
	query GET_PAGINATED_POSTS(
		$language: String
		$categoryName: String
		$tagName: String
		$first: Int
		$last: Int
		$after: String
		$before: String
		$search: String
	) {
		posts(
			where: { language: $language, categoryName: $categoryName, tag: $tagName, search: $search }
			first: $first
			last: $last
			after: $after
			before: $before
		) {
			pageInfo {
				hasNextPage
				hasPreviousPage
				startCursor
				endCursor
			}
			edges {
				cursor
				node {
					author {
						node {
							id
							name
							url
						}
					}
					tags {
						edges {
							node {
								id
								name
								slug
							}
						}
					}
					categories {
						edges {
							node {
								id
								name
								slug
							}
						}
					}
					excerpt
					id
					slug
					postId
					title
					languageCode
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
	}
`

const BlogList = ({ lang, categoryName = '', tagName = '', search = '' }) => {
	const t = useTranslations(lang)
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const loadMorePosts = async (variables) => {
		setLoading(true)
		const { data, loading, error } = await client.query({
			query: GET_POSTS,
			variables: variables
				? variables
				: {
						search: search,
						tagName: tagName,
						categoryName: categoryName,
						language: lang,
						first: 8,
						last: null,
						after: null,
						before: null
					}
		})
		if (error) return `Error! ${error.message}`

		setPosts(data.posts)
		setLoading(false)
	}
	useEffect(() => {
		loadMorePosts()
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
			) : posts && posts.edges.length > 0 ? (
				<div>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
						{posts.edges.map((edge, index) => {
							const { node } = edge

							return (
								<div data-aos="fade-up-sm" data-aos-delay={`${index + 1}00`}>
									<BlogCard key={node.id} locale={lang} post={node} />
								</div>
							)
						})}
					</div>
					<nav className="mt-8 flex items-center justify-center gap-3" aria-label="Pagination">
						{posts.pageInfo.hasPreviousPage ? (
							<button
								type="button"
								className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-1.5 rounded-lg border border-gray-200 px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
								aria-label="Previous"
								onClick={() => {
									loadMorePosts({
										search: search,
										tagName: tagName,
										categoryName,
										language: lang,
										first: null,
										after: null,
										last: 9,
										before: posts.pageInfo.startCursor || null
									})
								}}
								disabled={loading}
							>
								<svg
									className="size-3.5 shrink-0"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="m15 18-6-6 6-6"></path>
								</svg>
								<span>
									{loading
										? t({
												en: 'Loading...',
												ar: 'جارٍ التحميل...',
												es: 'Cargando...',
												fr: 'Chargement...',
												hi: 'लोड हो रहा है...',
												id: 'Memuat...',
												ms: 'Memuat...',
												th: 'กำลังโหลด...',
												vi: 'Đang tải...',
												bn: 'লোড হচ্ছে...',
												'zh-cn': '加载中...',
												'pt-br': 'Carregando...'
											})
										: t({
												en: 'Previous',
												ar: 'السابق',
												es: 'Anterior',
												fr: 'Précédent',
												hi: 'पिछला',
												id: 'Sebelumnya',
												ms: 'Sebelumnya',
												th: 'ก่อนหน้า',
												vi: 'Trước',
												bn: 'পূর্ববর্তী',
												'zh-cn': '上一步',
												'pt-br': 'Anterior'
											})}
								</span>
							</button>
						) : null}

						{posts.pageInfo.hasNextPage ? (
							<button
								type="button"
								className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-1.5 rounded-lg border border-neutral-200 px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
								aria-label="Next"
								onClick={() =>
									loadMorePosts({
										search: search,
										tagName: tagName,
										categoryName,
										language: lang,
										first: 8,
										after: posts.pageInfo.endCursor || null,
										last: null,
										before: null
									})
								}
								disabled={loading}
							>
								<span>
									{loading
										? t({
												en: 'Loading...',
												ar: 'جارٍ التحميل...',
												es: 'Cargando...',
												fr: 'Chargement...',
												hi: 'लोड हो रहा है...',
												id: 'Memuat...',
												ms: 'Memuat...',
												th: 'กำลังโหลด...',
												vi: 'Đang tải...',
												bn: 'লোড হচ্ছে...',
												'zh-cn': '加载中...',
												'pt-br': 'Carregando...'
											})
										: t({
												en: 'Next',
												ar: 'التالي',
												es: 'Siguiente',
												fr: 'Suivant',
												hi: 'अगला',
												id: 'Berikutnya',
												ms: 'Seterusnya',
												th: 'ถัดไป',
												vi: 'Tiếp theo',
												bn: 'পরবর্তী',
												'zh-cn': '下一步',
												'pt-br': 'Próximo'
											})}
								</span>
								<svg
									className="size-3.5 shrink-0"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="m9 18 6-6-6-6"></path>
								</svg>
							</button>
						) : null}
					</nav>
				</div>
			) : (
				<div>
					{t({
						en: 'No posts were found...',
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
