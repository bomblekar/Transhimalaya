import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
 
export class CustomLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> { 
    return this.http.get(`./public/locale/${lang}.json`);
  }
}
 
export function HttpLoaderFactory(http: HttpClient) {
  return new CustomLoader(http);
}
 
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),  
    provideRouter(routes),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ) 
  ]
};