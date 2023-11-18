import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-hero',
	standalone: true,
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
					<div class="rounded-full border-8 border-primary shadow-xl">
						<img
							src="assets/images/munir-issa.jpg"
							class="h-48 rounded-full sm:h-56"
							alt="Munir I Said"
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

							<div
								class="flex items-center justify-center gap-4 sm:justify-start"
							>
								<a href="/" class="inline-flex">
									<i
										class="bx bxl-facebook-square text-2xl text-white hover:text-yellow"
									></i>
								</a>

								<a href="/" class="inline-flex">
									<i
										class="bx bxl-twitter text-2xl text-white hover:text-yellow"
									></i>
								</a>
								<a href="/" class="inline-flex">
									<i
										class="bx bxl-linkedin text-2xl text-white hover:text-yellow"
									></i>
								</a>
								<a href="/" class="inline-flex">
									<i
										class="bx bxl-instagram text-2xl text-white hover:text-yellow"
									></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
})
export class HeroComponent {}
