import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-services',
	standalone: true,
	imports: [NgOptimizedImage],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="container py-16 md:py-20" id="services">
			<h2
				class="text-center font-header text-3xl font-semibold uppercase text-primary lg:text-5xl"
			>
				Here's what I'm good at
			</h2>
			<h3
				class="pt-6 text-center font-header text-xl font-medium text-black lg:text-2xl"
			>
				These are the services I offer
			</h3>

			<div
				class="grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3"
			>
				@for (service of services; track $index) {
					<div
						class="group rounded px-8 py-12 shadow hover:cursor-pointer hover:bg-primary"
					>
						<div
							class="relative mx-auto  h-24 w-24 text-center xl:h-28 xl:w-28"
						>
							<img
								class=" hidden group-hover:block"
								[ngSrc]="service.iconHover"
								[alt]="service.title"
								fill
							/>
							<img
								class=" block group-hover:hidden"
								[ngSrc]="service.icon"
								[alt]="service.title"
								fill
							/>
						</div>
						<div class="text-center">
							<h3
								class="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-yellow lg:text-xl"
							>
								{{ service.title }}
							</h3>
							<p
								class="pt-4 text-sm text-gray-500 group-hover:text-white md:text-base"
							>
								{{ service.description }}
							</p>
						</div>
					</div>
				}
			</div>
		</div>
	`,
})
export class ServicesComponent {
	services = [
		{
			title: 'Web Development',
			icon: 'assets/img/icon-development-black.svg',
			iconHover: 'assets/img/icon-development-white.svg',
			description: 'Crafting interactive digital experiences.',
		},
		{
			title: 'Technical Writing',
			icon: 'assets/img/icon-content-black.svg',
			iconHover: 'assets/img/icon-content-white.svg',
			description: 'Communicating complexity with clarity.',
		},
		{
			title: 'Mobile Development',
			icon: 'assets/img/icon-mobile-black.svg',
			iconHover: 'assets/img/icon-mobile-white.svg',
			description: 'Building seamless mobile applications.',
		},
		{
			title: 'Email Development',
			icon: 'assets/img/icon-email-black.svg',
			iconHover: 'assets/img/icon-email-white.svg',
			description: 'Crafting engaging and responsive email experiences.',
		},
		{
			title: 'Graphic Design',
			icon: 'assets/img/icon-graphics-black.svg',
			iconHover: 'assets/img/icon-graphics-white.svg',
			description: 'Visual storytelling through creative design.',
		},
		{
			title: 'Web Design',
			icon: 'assets/img/icon-design-black.svg',
			iconHover: 'assets/img/icon-design-white.svg',
			description: 'Creating visually stunning and user-centric websites.',
		},
	];
}
