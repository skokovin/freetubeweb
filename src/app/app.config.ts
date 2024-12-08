import {ApplicationConfig, ErrorHandler, importProvidersFrom, inject, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FirebaseApp, initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAnalytics, initializeAnalytics, provideAnalytics, ScreenTrackingService} from '@angular/fire/analytics';
import {config} from "rxjs";
import {AnalyticsSettings} from "@firebase/analytics";
import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";





export const appConfig: ApplicationConfig = {
  providers: [
    NgbModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {
      provide: ErrorHandler,
      useClass: AppComponent
    },
    provideFirebaseApp(() => initializeApp({
      "projectId": "bend-extractor",
      "appId": "1:355924148512:web:a8a9bd76870726afa5d745",
      "storageBucket": "bend-extractor.appspot.com",
      "apiKey": "AIzaSyDYhwXoAF20OhHB6hil8-Kj5Z63oE91ZOc",
      "authDomain": "bend-extractor.web.app", //"authDomain": "bend-extractor.firebaseapp.com",
      "messagingSenderId": "355924148512",
      "measurementId": "G-JTPQYBPCSY"
    })),
    provideAnalytics(() =>getAnalytics()),
    ScreenTrackingService,
  ]
};

