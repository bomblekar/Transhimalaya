import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailed-itinerary',
  standalone: true,
  templateUrl: './detailed-itinerary.html',
  styleUrls: ['./detailed-itinerary.css']
})
export class DetailedItineraryComponent {
  packageName: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.packageName = this.route.snapshot.paramMap.get('packageName');
  }
}