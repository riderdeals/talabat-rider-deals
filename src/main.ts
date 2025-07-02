import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import { RestaurentService } from './app/services/restaurent.service';
import { environment } from './environments/environment';

// Log baseUrl for debugging purposes
console.log('Base URL:', environment.baseUrl);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


// bootstrapApplication(AppComponent, {
//   providers: [RestaurentService],
// });