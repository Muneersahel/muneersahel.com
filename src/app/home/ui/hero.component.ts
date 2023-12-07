import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SocialMediaComponent } from './social-media.component';

@Component({
	selector: 'app-hero',
	standalone: true,
	imports: [SocialMediaComponent, NgOptimizedImage],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div
			class="relative bg-cover bg-center bg-no-repeat py-8"
			style="background-image: url(assets/img/bg-hero.jpg)"
		>
			<div
				class="absolute inset-0 z-20 bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to bg-cover bg-center bg-no-repeat"
			></div>

			<div
				class="container relative z-30 pb-12 pt-20 sm:pb-48 sm:pt-56 lg:pb-48 lg:pt-64"
			>
				<div class="flex flex-col items-center justify-center lg:flex-row">
					<div
						class="relative h-48 w-48 overflow-hidden rounded-full border-8 border-primary shadow-xl sm:h-56 sm:w-56"
					>
						<img
							ngSrc="assets/images/munir-issa.jpg"
							class="object-cover"
							alt="Munir I Said"
							fill
							priority
						/>
					</div>
					<div class="pt-8 sm:pt-10 lg:pl-8 lg:pt-0">
						<h1
							class="text-center font-header text-4xl text-white sm:text-left sm:text-5xl md:text-6xl"
						>
							Hello I'm Munir Issa!
						</h1>
						<div
							class="flex flex-col items-center justify-center gap-2 pt-3 sm:flex-row sm:gap-4 sm:pt-5 lg:justify-start"
						>
							<div class="flex items-center justify-center sm:justify-start">
								<p class="font-body text-lg uppercase text-white">
									Let's connect
								</p>
								<div class="hidden sm:block">
									<i class="bx bx-chevron-right text-3xl text-yellow"></i>
								</div>
							</div>

							<app-social-media />
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
})
export class HeroComponent {}
