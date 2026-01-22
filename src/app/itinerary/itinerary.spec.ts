import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryComponent } from './itinerary';

describe('Itinerary', () => {
  let component: ItineraryComponent;
  let fixture: ComponentFixture<ItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItineraryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
