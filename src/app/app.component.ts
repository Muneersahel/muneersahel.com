import { AsyncPipe, DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { Observable, fromEvent, map } from 'rxjs';

import { HeaderComponent } from './core/header.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		HeaderComponent,
		MatButtonModule,
		MatIconModule,
		AsyncPipe,
	],
	template: `
		<app-header />
		<router-outlet></router-outlet>

		@if (showScrollBtn$ | async) {
			<button
				mat-mini-fab
				color="primary"
				class="fixed bottom-8 right-8 lg:bottom-10 lg:right-10"
				(click)="
					viewport.scrollToPosition([0, 0]);
					router.navigate([], { fragment: '' })
				"
			>
				<mat-icon>arrow_upward</mat-icon>
			</button>
		}
	`,
})
export class AppComponent {
	protected router = inject(Router);
	protected viewport = inject(ViewportScroller);

	readonly showScrollBtn$: Observable<boolean>;

	constructor(@Inject(DOCUMENT) private readonly document: Document) {
		this.showScrollBtn$ = fromEvent(this.document, 'scroll').pipe(
			takeUntilDestroyed(),
			map(() => this.viewport.getScrollPosition()[1] > 350),
		);
	}
}
