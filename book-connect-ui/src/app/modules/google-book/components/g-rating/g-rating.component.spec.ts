import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GRatingComponent } from './g-rating.component';

describe('GRatingComponent', () => {
  let component: GRatingComponent;
  let fixture: ComponentFixture<GRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
