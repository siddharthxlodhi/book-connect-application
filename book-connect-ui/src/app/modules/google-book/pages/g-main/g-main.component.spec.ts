import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GMainComponent } from './g-main.component';

describe('GMainComponent', () => {
  let component: GMainComponent;
  let fixture: ComponentFixture<GMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
