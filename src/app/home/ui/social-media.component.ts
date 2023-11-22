import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-social-media',
	imports: [NgClass],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	template: `
		<div
			class="flex items-center justify-center pl-2 pt-5 sm:justify-start sm:pt-0"
		></div>
		<div class="flex items-center justify-center gap-4 sm:justify-start">
			@for (item of socialMedia; track $index) {
				<a
					[href]="item.url"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex"
				>
					<i
						class="bx text-2xl hover:text-yellow"
						[ngClass]="{
							'text-white': textColor === 'white',
							'text-primary': textColor === 'primary'
						}"
						[class]="'bxl-' + item.icon"
					></i>
				</a>
			}
		</div>
	`,
})
export class SocialMediaComponent {
	@Input() textColor: 'white' | 'primary' = 'white';
	socialMedia = [
		{ icon: 'facebook-square', url: 'https://www.facebook.com/muneersaheel' },
		{ icon: 'twitter', url: 'https://twitter.com/Muneersahel' },
		{ icon: 'linkedin', url: 'https://www.linkedin.com/in/muneersahel/' },
		{ icon: 'instagram', url: 'https://www.instagram.com/muneersahel' },
	];
}
