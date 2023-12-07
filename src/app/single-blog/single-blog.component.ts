import { JsonPipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
	effect,
	inject,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { BlogService } from '../core/services/blog.service';
import { UiService } from '../core/services/ui.service';

@Component({
	selector: 'app-single-blog',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [JsonPipe, MarkdownModule],
	template: `
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="py-8">
				@if (blogService.activeBlog(); as blog) {
					<div class="mx-auto max-w-3xl">
						<h1 class="text-3xl font-extrabold  sm:text-4xl">
							{{ blog.title }}
						</h1>
						<div class="mt-6 border-t border-gray-200 pt-6">
							<figure class="">
								<img
									[alt]="blog.title"
									[src]="blog.coverImage"
									class="max-h-[300px] w-full rounded-lg object-cover"
								/>
								<!-- <figcaption class="mt-2 text-sm ">
									{{ blog.title }}
								</figcaption> -->
							</figure>
							<div class="prose prose-indigo prose-lg mx-auto mt-4 ">
								<markdown clipboard [data]="blog.markdown"></markdown>
							</div>
						</div>
					</div>
				}
			</div>
		</div>
	`,
})
export default class SingleBlogComponent implements OnInit {
	#ui = inject(UiService);
	#title = inject(Title);
	#meta = inject(Meta);
	@Input({ required: true }) slug!: string;

	protected blogService = inject(BlogService);

	constructor() {
		this.#ui.isHomePage.set(false);
		const host = window.location.host; // todo: remove window since it's not available in ssr

		effect(() => {
			const blog = this.blogService.activeBlog();
			if (blog !== null) {
				this.#title.setTitle(blog.title);
				this.#meta.updateTag({ name: 'description', content: blog.brief });
				this.#meta.updateTag({ name: 'og:title', content: blog.title });
				this.#meta.updateTag({ name: 'og:description', content: blog.brief });
				this.#meta.updateTag({ name: 'og:image', content: blog.coverImage });
				this.#meta.updateTag({
					name: 'og:url',
					content: `${host}/blogs/${blog.slug}`,
				});
				this.#meta.updateTag({ name: 'twitter:title', content: blog.title });
				this.#meta.updateTag({
					name: 'twitter:description',
					content: blog.brief,
				});
				this.#meta.updateTag({
					name: 'twitter:image',
					content: blog.coverImage,
				});
				this.#meta.updateTag({
					name: 'twitter:card',
					content: 'summary_large_image',
				});
				this.#meta.updateTag({ name: 'twitter:site', content: '@Muneersahel' });
				this.#meta.updateTag({
					name: 'twitter:creator',
					content: '@Muneersahel',
				});
				this.#meta.updateTag({
					name: 'twitter:url',
					content: `${host}/blogs/${blog.slug}`,
				});
			}
		});
	}

	ngOnInit(): void {
		this.blogService.getBlog(this.slug);
	}
}
