import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-cta',
	standalone: true,
	imports: [MatButtonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div
			class="relative bg-primary bg-cover bg-center bg-no-repeat py-16 bg-blend-multiply lg:py-24"
			style="background-image: url(assets/img/bg-cta.jpg)"
		>
			<div class="container relative z-30">
				<h3
					class="text-center font-header text-3xl uppercase leading-tight tracking-wide text-white sm:text-4xl lg:text-5xl"
				>
					Keep
					<span class="font-bold">up-to-date</span>
					<br />
					with what I'm up to
				</h3>
				<form class="mt-6 flex flex-col justify-center sm:flex-row">
					<input
						class="w-full rounded px-4 py-3 font-body text-black sm:w-2/5 sm:py-4 lg:w-1/3"
						type="text"
						placeholder="Give me your Email"
					/>
					<button
						mat-raised-button
						class="mt-2 rounded  px-8 py-3 font-body text-base font-bold uppercase sm:ml-2 sm:mt-0 sm:py-4 md:text-lg"
					>
						Join the club
					</button>
				</form>
			</div>
		</div>
	`,
})
export class CtaComponent {}
