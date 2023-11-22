import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { UiService } from '../core/services/ui.service';
import { AboutComponent } from './ui/about.component';
import { ClientsComponent } from './ui/clients.component';
import { ContactComponent } from './ui/contact.component';
import { CtaComponent } from './ui/cta.component';
import { HeroComponent } from './ui/hero.component';
import { PortfolioComponent } from './ui/portfolio.component';
import { RecentBlogsComponent } from './ui/recent-blogs.component';
import { ServicesComponent } from './ui/services.component';
import { StatisticsComponent } from './ui/statistics.component';
import { WorkExperienceComponent } from './ui/work-experience.component';

@Component({
	selector: 'app-home',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatIconModule,
		HeroComponent,
		AboutComponent,
		ServicesComponent,
		PortfolioComponent,
		ClientsComponent,
		WorkExperienceComponent,
		StatisticsComponent,
		RecentBlogsComponent,
		ContactComponent,
		CtaComponent,
	],
	template: `
		<app-hero />
		<app-about />
		<app-services />
		<app-portfolio />
		<!-- <app-clients /> -->
		<app-work-experience />
		<app-statistics />
		<app-recent-blogs />
		<app-contact />

		<div
			class="h-72 bg-cover bg-center bg-no-repeat sm:h-64 md:h-72 lg:h-96"
			style="background-image: url(assets/img/map.png)"
		></div>

		<app-cta />
	`,
})
export default class HomeComponent {
	#ui = inject(UiService);

	constructor() {
		this.#ui.isHomePage.set(true);
	}
}
