import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
	ScreenTrackingService,
	UserTrackingService,
	getAnalytics,
	provideAnalytics,
} from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideClientHydration(),
		importProvidersFrom(
			provideFirebaseApp(() =>
				initializeApp({
					projectId: 'muneersahel',
					appId: '1:1049500314015:web:b0f618cd743a58a9b3b5aa',
					storageBucket: 'muneersahel.appspot.com',
					// locationId: 'us-central',
					apiKey: 'AIzaSyAsjcjQCJvJuJcZPt_5r0M5OLX5ZGP8te8',
					authDomain: 'muneersahel.firebaseapp.com',
					messagingSenderId: '1049500314015',
					measurementId: 'G-G2BMEHD10R',
				}),
			),
			provideAuth(() => getAuth()),
			provideAnalytics(() => getAnalytics()),
			provideFirestore(() => getFirestore()),
			provideMessaging(() => getMessaging()),
			provideStorage(() => getStorage()),
		),
		ScreenTrackingService,
		UserTrackingService,
		provideAnimationsAsync(),
	],
};
