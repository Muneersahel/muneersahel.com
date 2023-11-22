import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SocialMediaComponent } from './social-media.component';

@Component({
	selector: 'app-about',
	standalone: true,
	imports: [SocialMediaComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="bg-gray-50" id="about">
			<div
				class="container flex flex-col items-center py-16 md:py-20 lg:flex-row"
			>
				<div class="w-full text-center sm:w-3/4 lg:w-3/5 lg:text-left">
					<h2
						class="font-header text-3xl font-semibold uppercase text-primary lg:text-5xl"
					>
						Who am I?
					</h2>
					<h4
						class="pt-6 font-header text-xl font-medium text-black lg:text-2xl"
					>
						I'm Munir Issa, a Frontend engineer & CTO at
						<a
							class="text-primary hover:underline"
							href="https://medikea.co.tz"
							target="_blank"
							rel="noopener noreferrer"
						>
							Medikea
						</a>
					</h4>
					<p class="pt-6 font-body leading-relaxed text-gray-600">
						Welcome! I'm Munir Issa, a dedicated Frontend Engineer and CTO at
						Medikea. With a passion for crafting seamless user experiences, I
						bring expertise to healthcare technology.
					</p>
					<p class="pt-6 font-body leading-relaxed text-gray-600">
						As a seasoned Frontend Engineer, I specialize in dynamic and
						user-friendly interfaces, staying at the forefront of web
						development trends. As CTO at Medikea, I lead a dynamic team,
						leveraging innovative technologies to revolutionize healthcare
						solutions for enhanced patient experiences and streamlined
						workflows.
					</p>
					<div
						class="flex flex-col justify-center pt-6 sm:flex-row lg:justify-start"
					>
						<div class="flex items-center justify-center sm:justify-start">
							<p
								class="font-body text-lg font-semibold uppercase text-gray-600"
							>
								Connect with me
							</p>
							<div class="hidden sm:block">
								<i class="bx bx-chevron-right text-2xl text-primary"></i>
							</div>
						</div>
						<app-social-media textColor="primary" />
					</div>
				</div>
				<div class="w-full pl-0 pt-10 sm:w-3/4 lg:w-2/5 lg:pl-12 lg:pt-0">
					<div>
						<div class="flex items-end justify-between">
							<h4 class="font-body font-semibold uppercase text-black">
								HTML & CSS
							</h4>
							<h3 class="font-body text-3xl font-bold text-primary">85%</h3>
						</div>
						<div class="mt-2 h-3 w-full rounded-full bg-lila">
							<div class="h-3 rounded-full bg-primary" style="width: 85%"></div>
						</div>
					</div>
					<div class="pt-6">
						<div class="flex items-end justify-between">
							<h4 class="font-body font-semibold uppercase text-black">
								Python
							</h4>
							<h3 class="font-body text-3xl font-bold text-primary">70%</h3>
						</div>
						<div class="mt-2 h-3 w-full rounded-full bg-lila">
							<div class="h-3 rounded-full bg-primary" style="width: 70%"></div>
						</div>
					</div>
					<div class="pt-6">
						<div class="flex items-end justify-between">
							<h4 class="font-body font-semibold uppercase text-black">
								Javascript
							</h4>
							<h3 class="font-body text-3xl font-bold text-primary">98%</h3>
						</div>
						<div class="mt-2 h-3 w-full rounded-full bg-lila">
							<div class="h-3 rounded-full bg-primary" style="width: 98%"></div>
						</div>
					</div>
					<div class="pt-6">
						<div class="flex items-end justify-between">
							<h4 class="font-body font-semibold uppercase text-black">
								Figma
							</h4>
							<h3 class="font-body text-3xl font-bold text-primary">91%</h3>
						</div>
						<div class="mt-2 h-3 w-full rounded-full bg-lila">
							<div class="h-3 rounded-full bg-primary" style="width: 91%"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
})
export class AboutComponent {}
