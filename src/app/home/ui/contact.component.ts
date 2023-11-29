import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-contact',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="container py-16 md:py-20" id="contact">
			<h2
				class="text-center font-header text-4xl font-semibold uppercase text-primary lg:text-5xl"
			>
				Here's a contact form
			</h2>
			<h3
				class="pt-6 text-center font-header text-xl font-medium text-black lg:text-2xl"
			>
				Have Any Questions?
			</h3>
			<div class="mx-auto w-full pt-5 text-center sm:w-2/3 lg:pt-6">
				<p class="font-body text-gray-500">
					Lorem ipsum dolor sit amet consectetur adipiscing elit hendrerit
					condimentum turpis nisl sem, viverra habitasse urna ante lobortis
					fermentum accumsan. Viverra habitasse urna ante lobortis fermentum
					accumsan.
				</p>
			</div>
			<form class="mx-auto w-full pt-10 sm:w-3/4">
				<div class="flex flex-col md:flex-row">
					<input
						class="mr-3 w-full rounded border-gray-500 px-4 py-3 font-body text-black md:w-1/2 lg:mr-5"
						placeholder="Name"
						type="text"
						id="name"
					/>
					<input
						class="mt-6 w-full rounded border-gray-500 px-4 py-3 font-body text-black md:ml-3 md:mt-0 md:w-1/2 lg:ml-5"
						placeholder="Email"
						type="text"
						id="email"
					/>
				</div>
				<textarea
					class="mt-6 w-full rounded border-gray-500 px-4 py-3 font-body text-black md:mt-8"
					placeholder="Message"
					id="message"
					cols="30"
					rows="10"
				></textarea>
				<button
					class="mt-6 flex items-center justify-center rounded bg-primary px-8 py-3 font-header text-lg font-bold uppercase text-white hover:bg-gray-500"
				>
					Send
					<i class="bx bx-chevron-right relative -right-2 text-3xl"></i>
				</button>
			</form>
			<div class="flex flex-col pt-16 lg:flex-row">
				<div
					class="w-full border-b-2 border-l-2 border-r-2 border-t-2 border-gray-600 px-6 py-6 sm:py-8 lg:w-1/3"
				>
					<div class="flex items-center">
						<i class="bx bx-phone text-2xl text-gray-600"></i>
						<p
							class="pl-2 font-body font-bold uppercase text-gray-600 lg:text-lg"
						>
							My Phone
						</p>
					</div>
					<p class="pt-2 text-left font-body font-bold text-primary lg:text-lg">
						(+881) 111 222 333
					</p>
				</div>
				<div
					class="w-full border-b-2 border-l-2 border-r-2 border-t-0 border-gray-600 px-6 py-6 sm:py-8 lg:w-1/3 lg:border-l-0 lg:border-t-2"
				>
					<div class="flex items-center">
						<i class="bx bx-envelope text-2xl text-gray-600"></i>
						<p
							class="pl-2 font-body font-bold uppercase text-gray-600 lg:text-lg"
						>
							My Email
						</p>
					</div>
					<p class="pt-2 text-left font-body font-bold text-primary lg:text-lg">
						{{ 'name@mydomain.com' }}
					</p>
				</div>
				<div
					class="w-full border-b-2 border-l-2 border-r-2 border-t-0 border-gray-600 px-6 py-6 sm:py-8 lg:w-1/3 lg:border-l-0 lg:border-t-2"
				>
					<div class="flex items-center">
						<i class="bx bx-map text-2xl text-gray-600"></i>
						<p
							class="pl-2 font-body font-bold uppercase text-gray-600 lg:text-lg"
						>
							My Address
						</p>
					</div>
					<p class="pt-2 text-left font-body font-bold text-primary lg:text-lg">
						123 New York D Block 1100, 2011 USA
					</p>
				</div>
			</div>
		</div>
	`,
})
export class ContactComponent {}
