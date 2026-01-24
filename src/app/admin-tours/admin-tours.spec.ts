import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTours } from './admin-tours';

describe('AdminTours', () => {
  let component: AdminTours;
  let fixture: ComponentFixture<AdminTours>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTours]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTours);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
