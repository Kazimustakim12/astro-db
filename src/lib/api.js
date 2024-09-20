export async function PagePostsQuery(lang) {
	const response = await fetch(import.meta.env.WPGRAPHQL_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: ` query PagePostsQuery($language: String!) {
                    posts(where: {language: $language}) {
                      nodes {
                        date
                        uri
						            languageCode
                        slug
                        title
                        commentCount
                        excerpt
                        categories {
                          nodes {
                            name
                            uri
                          }
                        }
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
                  }`,
			variables: {
				language: lang
			}
		})
	})
	const { data } = await response.json()
	return data
}

export async function getSinglrPostById(slug) {
	const response = await fetch(import.meta.env.WPGRAPHQL_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `query SinglePost($id: ID = "${slug}" ) {
          post(idType: SLUG, id: $id) {
            date
            content
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
            `,
			variables: {
				id: slug
			}
		})
	})
	const { data } = await response.json()

	return data
}

export async function getAllUris() {
	const response = await fetch(import.meta.env.WPGRAPHQL_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `query GetAllUris {
						terms {
							nodes {
							uri
							}
						}
						posts(where: {language: "all"},first:200) {
							nodes {
							slug
							uri
							languageCode
							}
						}
						pages {
							nodes {
							uri
							}
						}
						} `
		})
	})
	const { data } = await response.json()
	return data
}

export async function paginationPost(language, first = 10, last, before, after) {
	const response = await fetch(import.meta.env.WPGRAPHQL_API_URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: ` query GET_PAGINATED_POSTS($language: String, $first: Int, $last: Int, $after: String, $before: String) {
  posts(
    where: {language: $language}
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
        content
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
}`,
			variables: {
				language: language,
				first: first,
				last: last,
				after: after,
				before: before
			}
		})
	})
	const { data } = await response.json()
	console.log(data, 'data from api')
	return data
}
