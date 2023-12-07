import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Blog } from '../../core/services/blog.service';

@Component({
	selector: 'app-blog-card',
	standalone: true,
	imports: [RouterLink, NgOptimizedImage],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<a
			[routerLink]="['blogs', blog.slug]"
			class="group block shadow transition-transform hover:scale-105"
		>
			<div
				class="relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
			>
				<!-- [style]="'background-image: url(' + blog.coverImage + ')'" -->
				<img
					[ngSrc]="blog.coverImage"
					[alt]="blog.title"
					[fill]="true"
					class="h-full w-full object-cover"
				/>
				<span
					class="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"
				></span>
				<span
					class="absolute bottom-0 right-0 mb-4 mr-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white  md:text-base"
				>
					Read More
				</span>
			</div>
			<div class="bg-white px-5 py-6 xl:py-8">
				<span class="block font-body text-lg font-semibold text-black">
					{{ blog.title }}
				</span>
				<span class="block pt-2 font-body text-gray-500">
					{{ blog.brief }}
				</span>
			</div>
		</a>
	`,
})
export class BlogCardComponent {
	@Input({ required: true }) blog!: Blog;
}
