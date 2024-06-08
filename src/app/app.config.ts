import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  ScreenTrackingService,
  getAnalytics,
  provideAnalytics,
} from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideMarkdown({ loader: HttpClient }),
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
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    provideFirestore(() => getFirestore()),
  ],
};
