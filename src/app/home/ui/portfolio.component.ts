import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
	selector: 'app-portfolio',
	standalone: true,
	imports: [MatTooltipModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="container py-16 md:py-20" id="portfolio">
			<h2
				class="text-center font-header text-4xl font-semibold uppercase text-primary lg:text-5xl"
			>
				Check out my Portfolio
			</h2>
			<h3
				class="pt-6 text-center font-header text-xl font-medium text-black lg:text-2xl"
			>
				Here's what I have done with the past
			</h3>

			<div
				class="mx-auto grid w-full grid-cols-1 gap-8 pt-12 sm:w-3/4 md:gap-10 lg:w-full lg:grid-cols-2"
			>
				@for (item of portfolio; track $index) {
					<a
						[href]="item.link"
						target="_blank"
						rel="noopener noreferrer"
						[matTooltip]="item.name"
						class="mx-auto transform transition-all hover:scale-105 md:mx-0"
					>
						<img
							[src]="item.image"
							class="h-full w-full object-cover shadow"
							[alt]="item.name"
						/>
					</a>
				}
			</div>
		</div>
	`,
})
export class PortfolioComponent {
	portfolio = [
		{
			name: 'Medikea',
			image: 'assets/images/medikea.png',
			link: 'https://medikea.co.tz',
		},
		{
			name: 'Aflafood',
			image: 'assets/images/aflafood.png',
			link: 'https://aflafood.co.tz',
		},
		{
			name: 'Pharmacy Management System',
			image: 'assets/images/pharmacy-ms.png',
			link: 'https://stockmanager.co.tz',
		},
		{
			name: 'Zaimu Travel & Tours',
			image: 'assets/images/zaimutraveltours.png',
			link: 'https://zaimutraveltours.com',
		},
	];
}
