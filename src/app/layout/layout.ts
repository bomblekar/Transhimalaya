import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ItineraryComponent } from '../itinerary/itinerary';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, ItineraryComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  encapsulation: ViewEncapsulation.None
})
export class Layout {
  constructor(private translate: TranslateService) {
    this.translate.use('en'); // default
  }
  changeLang(lang: string) {
    this.translate.use(lang);
  }
}
