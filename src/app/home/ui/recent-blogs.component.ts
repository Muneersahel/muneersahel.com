import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BlogService } from '../../core/services/blog.service';
import { BlogCardComponent } from '../../shared/ui/blog-card.component';

@Component({
	selector: 'app-recent-blogs',
	standalone: true,
	imports: [BlogCardComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="bg-gray-50" id="blog">
			<div class="container py-16 md:py-20">
				<h2
					class="text-center font-header text-4xl font-semibold uppercase text-primary lg:text-5xl"
				>
					I also like to write
				</h2>
				<h4
					class="pt-6 text-center font-header text-xl font-medium text-black lg:text-2xl"
				>
					Check out my latest posts!
				</h4>

				<div
					class="mx-auto grid w-full grid-cols-1 gap-6 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10"
				>
					@for (blog of blogService.blogs(); track $index) {
						<app-blog-card [blog]="blog" />
					}
				</div>
			</div>
		</div>
	`,
})
export class RecentBlogsComponent {
	protected blogService = inject(BlogService);
}
