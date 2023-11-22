import { Injectable, computed, signal } from '@angular/core';

export interface Blog {
	title: string;
	brief: string;
	slug: string;
	dateAdded: string;
	coverImage: string;
}

export interface SingleBlog {
	title: string;
	brief: string;
	coverImage: string;
	slug: string;
	author: { name: string; image: string };
	markdown: string;
}

interface BlogState {
	blogs: Blog[];
	status: 'idle' | 'loading' | 'loaded' | 'success' | 'error';
	error: string | null;
	activeBlog: SingleBlog | null;
}

type BlogPostParams = { query: string; first: number; after?: string };

const QUERY_BLOGS = `
  query Publication($first: Int!, $after: String) {
    publication(host: "blog.muneersahel.com") {
      posts(first: $first, after: $after) {
        edges {
          node {
            title
            brief
            slug
            author {
              username
              profilePicture
            }
            coverImage {
              url
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

const QUERY_SINGLE_BLOG = `
  query Publication($slug: String!) {
    publication(host: "blog.muneersahel.com") {
      post(slug: $slug) {
        title
        brief
        author {
          username
          profilePicture
        }
        coverImage {
          url
        }
        slug
        content {
          markdown
        }
      }
    }
  }
`;

@Injectable({
	providedIn: 'root',
})
export class BlogService {
	#state = signal<BlogState>({
		blogs: [],
		status: 'idle',
		error: null,
		activeBlog: null,
	});
	blogs = computed(() => this.#state().blogs);
	status = computed(() => this.#state().status);
	error = computed(() => this.#state().error);
	activeBlog = computed(() => this.#state().activeBlog);

	constructor() {
		this.#state.update((state) => {
			return { ...state, status: 'loading' };
		});
		this.getPosts()
			.then((result) => {
				this.#state.update((state) => {
					return {
						...state,
						blogs: result.data.publication.posts.edges.map((edge: any) => {
							return {
								title: edge.node.title,
								brief: edge.node.brief,
								slug: edge.node.slug,
								dateAdded: edge.node.dateAdded,
								coverImage: edge.node.coverImage.url,
							};
						}),
						status: 'success',
					};
				});
			})
			.catch((error) => {
				this.#state.update((state) => {
					return { ...state, status: 'error', error: error.message };
				});
			});
	}

	async getPosts(params: BlogPostParams = { query: QUERY_BLOGS, first: 10 }) {
		const data = await fetch('https://gql.hashnode.com/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: params.query,
				variables: { first: params.first, after: params.after },
			}),
		});
		return data.json();
	}

	async getBlog(slug: string) {
		this.#state.update((state) => {
			return { ...state, status: 'loading' };
		});
		const data = await fetch('https://gql.hashnode.com/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: QUERY_SINGLE_BLOG,
				variables: { slug: slug },
			}),
		});
		const results = await data.json();

		this.#state.update((state) => {
			return {
				...state,
				activeBlog: {
					title: results.data.publication.post.title,
					brief: results.data.publication.post.brief,
					coverImage: results.data.publication.post.coverImage.url,
					author: {
						name: results.data.publication.post.author.username,
						image: results.data.publication.post.author.profilePicture,
					},
					slug: results.data.publication.post.slug,
					markdown: results.data.publication.post.content.markdown,
				},
				status: 'success',
			};
		});
	}
}
