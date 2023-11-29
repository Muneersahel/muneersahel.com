import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-statistics',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div
			class="bg-cover bg-top bg-no-repeat pb-16 md:py-16 lg:py-24"
			style="background-image: url(assets/img/experience-figure.png)"
			id="statistics"
		>
			<div class="container">
				<div
					class="mx-auto w-5/6 bg-white py-16 shadow md:w-11/12 lg:py-20 xl:py-24 2xl:w-full"
				>
					<div class="grid grid-cols-2 gap-5 md:gap-8 xl:grid-cols-4 xl:gap-5">
						<div
							class="flex flex-col items-center justify-center text-center md:flex-row md:text-left"
						>
							<div>
								<img
									src="assets/img/icon-project.svg"
									class="mx-auto h-12 w-auto md:h-20"
									alt="icon project"
								/>
							</div>
							<div class="pt-5 md:pl-5 md:pt-0">
								<h3
									class="font-body text-2xl font-bold text-primary md:text-4xl"
								>
									12
								</h3>
								<h4
									class="font-header text-base font-medium leading-loose text-gray-700 md:text-xl"
								>
									Finished Projects
								</h4>
							</div>
						</div>

						<div
							class="flex flex-col items-center justify-center text-center md:flex-row md:text-left"
						>
							<div>
								<img
									src="assets/img/icon-award.svg"
									class="mx-auto h-12 w-auto md:h-20"
									alt="icon award"
								/>
							</div>
							<div class="pt-5 md:pl-5 md:pt-0">
								<h3
									class="font-body text-2xl font-bold text-primary md:text-4xl"
								>
									3
								</h3>
								<h4
									class="font-header text-base font-medium leading-loose text-gray-700 md:text-xl"
								>
									Awards Won
								</h4>
							</div>
						</div>

						<div
							class="mt-6 flex flex-col items-center justify-center text-center md:mt-10 md:flex-row md:text-left lg:mt-0"
						>
							<div>
								<img
									src="assets/img/icon-happy.svg"
									class="mx-auto h-12 w-auto md:h-20"
									alt="icon happy clients"
								/>
							</div>
							<div class="pt-5 md:pl-5 md:pt-0">
								<h3
									class="font-body text-2xl font-bold text-primary md:text-4xl"
								>
									8
								</h3>
								<h4
									class="font-header text-base font-medium leading-loose text-gray-700 md:text-xl"
								>
									Happy Clients
								</h4>
							</div>
						</div>

						<div
							class="mt-6 flex flex-col items-center justify-center text-center md:mt-10 md:flex-row md:text-left lg:mt-0"
						>
							<div>
								<img
									src="assets/img/icon-puzzle.svg"
									class="mx-auto h-12 w-auto md:h-20"
									alt="icon puzzle"
								/>
							</div>
							<div class="pt-5 md:pl-5 md:pt-0">
								<h3
									class="font-body text-2xl font-bold text-primary md:text-4xl"
								>
									99
								</h3>
								<h4
									class="font-header text-base font-medium leading-loose text-gray-700 md:text-xl"
								>
									Bugs Fixed
								</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
})
export class StatisticsComponent {}
