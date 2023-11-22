import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-clients',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="bg-gray-500" id="clients">
			<div class="container py-16 md:py-20">
				<div class="mx-auto w-full sm:w-3/4 lg:w-full">
					<h2
						class="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
					>
						My latest clients
					</h2>
					<div class="flex flex-wrap items-center justify-center pt-4 sm:pt-4">
						<span class="m-8 block">
							<img
								src="assets/img/logo-coca-cola.svg"
								alt="client logo"
								class="mx-auto block h-12 w-auto"
							/>
						</span>
						<span class="m-8 block">
							<img
								src="assets/img/logo-apple.svg"
								alt="client logo"
								class="mx-auto block h-12 w-auto"
							/>
						</span>

						<span class="m-8 block">
							<img
								src="assets/img/logo-netflix.svg"
								alt="client logo"
								class="mx-auto block h-12 w-auto"
							/>
						</span>

						<span class="m-8 block">
							<img
								src="assets/img/logo-amazon.svg"
								alt="client logo"
								class="mx-auto block h-12 w-auto"
							/>
						</span>

						<span class="m-8 block">
							<img
								src="assets/img/logo-stripe.svg"
								alt="client logo"
								class="mx-auto block h-12 w-auto"
							/>
						</span>
					</div>
				</div>
			</div>
		</div>
	`,
})
export class ClientsComponent {}
