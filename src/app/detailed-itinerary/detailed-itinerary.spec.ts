import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedItinerary } from './detailed-itinerary';

describe('DetailedItinerary', () => {
  let component: DetailedItinerary;
  let fixture: ComponentFixture<DetailedItinerary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedItinerary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedItinerary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
