import { NgClass, NgOptimizedImage } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { UiService } from './services/ui.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [NgClass, MatButtonModule, RouterLink, NgOptimizedImage],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<!-- Large screeen menu -->
		<div
			class="z-50 w-full  py-3 sm:py-5"
			[ngClass]="{
				'absolute top-0': ui.isHomePage(),
				'bg-primary': ui.isHomePage() === false
			}"
		>
			<div class="container flex items-center justify-between">
				<a routerLink="/">
					<div class="relative h-12 w-24 lg:w-48">
						<img
							ngSrc="assets/img/logo.svg"
							class="object-contain"
							fill
							alt="logo image"
						/>
					</div>
				</a>
				<div class="hidden lg:block">
					<ul class="flex items-center">
						@for (menu of menuList(); track $index) {
							<li class="group pl-6" (click)="navigateTo(menu.link)">
								<span
									class="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white"
								>
									{{ menu.name }}
								</span>

								<span
									class="block h-0.5 w-full bg-transparent group-hover:bg-yellow"
								></span>
							</li>
						}
					</ul>
				</div>
				<div class="block lg:hidden">
					<button
						mat-icon-button
						(click)="mobileMenu.set(true)"
						class="flex items-center justify-center"
						aria-label="Open menu button"
					>
						<i class="bx bx-menu text-4xl text-white"></i>
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile menu -->
		<div
			class="pointer-events-none fixed inset-0 z-70 min-h-screen bg-black bg-opacity-70 opacity-0 transition-opacity lg:hidden"
			[ngClass]="{ 'pointer-events-auto opacity-100': mobileMenu() }"
		>
			<div
				class="absolute right-0 min-h-screen w-2/3 bg-primary px-8 py-4 shadow md:w-1/3"
			>
				<button
					mat-icon-button
					class="absolute right-0 top-0 mr-4 mt-4 flex items-center justify-center"
					(click)="mobileMenu.set(false)"
					aria-label="Close menu button"
				>
					<img
						ngSrc="assets/img/icon-close.svg"
						class="h-auto w-auto"
						width="40"
						height="40"
						alt=""
					/>
				</button>

				<ul class="mt-8 flex flex-col">
					@for (menu of menuList(); track $index) {
						<li
							class="py-2"
							(click)="navigateTo(menu.link); mobileMenu.set(false)"
						>
							<span
								class="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white"
							>
								{{ menu.name }}
							</span>
						</li>
					}
				</ul>
			</div>
		</div>
	`,
})
export class HeaderComponent {
	#router = inject(Router);
	protected ui = inject(UiService);
	protected mobileMenu = signal(false);

	protected menuList = signal([
		{ name: 'About', link: 'about' },
		{ name: 'Services', link: 'services' },
		{ name: 'Portfolio', link: 'portfolio' },
		// { name: 'Clients', link: 'clients' },
		{ name: 'Work', link: 'work' },
		{ name: 'Statistics', link: 'statistics' },
		{ name: 'Blog', link: 'blog' },
		// { name: 'Contact', link: 'contact' },
	]);

	navigateTo(link: string) {
		this.#router.navigate(['/'], { fragment: link });
	}
}
