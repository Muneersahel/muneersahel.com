import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-work-experience',
	standalone: true,
	imports: [NgOptimizedImage],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="container py-16 md:py-20" id="work">
			<h2
				class="text-center font-header text-4xl font-semibold uppercase text-primary lg:text-5xl"
			>
				My work experience
			</h2>
			<h3
				class="pt-6 text-center font-header text-xl font-medium text-black lg:text-2xl"
			>
				Here's my journey so far
			</h3>

			<div class="relative mx-auto mt-12 flex w-full flex-col lg:w-2/3">
				<span
					class="absolute inset-y-0 left-2/5 ml-10 hidden w-0.5 bg-gray-300 md:block"
				></span>

				@for (work of works; track $index) {
					<div class="mt-8 flex flex-col text-center md:flex-row md:text-left">
						<div class="md:w-2/5">
							<div class="flex justify-center md:justify-start">
								<span class="relative h-8 w-32 shrink-0">
									<img
										[ngSrc]="work.logo"
										class="object-contain"
										[alt]="work.company"
										fill
									/>
								</span>
								<div class="relative ml-3 hidden w-full md:block">
									<span
										class="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-gray-400"
									></span>
								</div>
							</div>
						</div>
						<div class="md:w-3/5">
							<div class="relative flex md:pl-18">
								<span
									class="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-gray-400 bg-white md:block"
								></span>

								<div class="mt-1 flex">
									<i
										class="bx bxs-right-arrow hidden text-primary md:block"
									></i>
									<div class="md:-mt-1 md:pl-8">
										<span class="block font-body font-semibold text-gray-600">
											{{ work.date }}
										</span>
										<span
											class="block pt-2 font-header text-lg font-bold uppercase text-primary"
										>
											{{ work.title }}
										</span>
										<div class="pt-2">
											<span class="block font-body text-gray-600">
												{{ work.description }}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
			</div>
		</div>
	`,
})
export class WorkExperienceComponent {
	works = [
		{
			title: 'CTO & Frontend Engineer',
			company: 'Medikea',
			date: 'Sep 2023 - Present',
			description:
				"Spearheaded Medikea's technology vision as Chief Technology Officer while crafting seamless user experiences as a Frontend Engineer.",
			logo: 'assets/images/logos/medikea.webp',
		},
		{
			title: 'Frontend Engineer',
			company: 'Medikea',
			date: 'Mar 2022 - Present',
			description:
				"Contributed expertise to Medikea's frontend, ensuring user-friendly interfaces and advancing digital solutions in healthcare technology.",
			logo: 'assets/images/logos/medikea.webp',
		},
		{
			title: 'Developer & Telecom Engineer',
			company: 'Zanzibar Multiplex Company (ZMUX)',
			date: 'Jul 2021 - Oct 2021',
			description:
				'Engaged in multifaceted roles at Zanzibar Multiplex, combining software development skills with telecom engineering expertise.',
			logo: 'assets/images/logos/zmux.webp',
		},
		{
			title: 'Student Coordinator',
			company: 'Institue of Engineers Tanzania',
			date: 'Nov 2020 - Apr 2021',
			description:
				'Facilitated student coordination at IET during my time at the University of Dar es Salaam, fostering engagement and collaboration within the engineering community.',
			logo: 'assets/images/logos/iet-logo.webp',
		},
	];
}
