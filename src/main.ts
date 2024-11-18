import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './app/firebase/firebase.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

initializeApp(firebaseConfig);
