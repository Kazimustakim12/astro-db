import React from 'react'

const BlogCard = ({ post, locale }) => {
	return (
		<article className="h-full">
			<a
				className="group flex h-full flex-col rounded-xl border border-gray-200 p-5 transition duration-300 hover:border-transparent hover:shadow-lg focus:border-transparent focus:shadow-lg focus:outline-none dark:border-neutral-700 dark:hover:border-transparent dark:hover:shadow-black/40 dark:focus:border-transparent dark:focus:shadow-black/40"
				href={`/${locale}/blog/${post.slug}/`}
				aria-label={post.title}
			>
				<div className="aspect-w-16 aspect-h-11">
					<img
						src={post?.featuredImage?.node?.mediaItemUrl}
						alt={post?.featuredImage?.node?.altText}
						srcSet={post?.featuredImage?.node?.srcSet}
						loading="lazy"
						width={post?.featuredImage?.node?.mediaDetails?.width}
						height={post?.featuredImage?.node?.mediaDetails?.height}
					/>
				</div>
				<div className="flex flex-wrap gap-2 pt-3">
					{post?.categories?.edges.slice(0, 5).map((cat) => (
						<a
							class="inline-flex items-center gap-x-1.5 rounded-lg bg-dbgreen-50 px-3 py-1.5 text-xs font-medium text-dbgreen-900 dark:bg-neutral-50/10 dark:text-dbgreen-800"
							href={`/${post?.languageCode}/category/${cat?.node?.slug}`}
							key={`/${post?.languageCode}/category/${cat?.node?.slug}`}
						>
							{cat.node.name}
						</a>
					))}
				</div>
				<div className="my-6">
					<h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:group-hover:text-white">
						{post.title}
					</h3>
					<p
						className="mt-5 line-clamp-4 text-gray-600 dark:text-neutral-400"
						dangerouslySetInnerHTML={{ __html: post.excerpt }}
					/>
				</div>
				<div className="mt-auto flex items-center gap-x-3">
					<img
						className="size-8 rounded-full"
						src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
						alt="Avatar"
					/>
					<div>
						<h5 className="text-sm text-gray-800 dark:text-neutral-200">
							{post?.author?.node?.name}
						</h5>
					</div>
				</div>
			</a>
		</article>
	)
}

export default BlogCard
