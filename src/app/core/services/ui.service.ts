import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class UiService {
	isHomePage = signal(true);

	constructor() {}
}
