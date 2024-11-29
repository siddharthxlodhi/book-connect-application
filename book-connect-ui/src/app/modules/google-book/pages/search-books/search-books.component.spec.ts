import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBooksComponent } from './search-books.component';

describe('SearchBooksComponent', () => {
  let component: SearchBooksComponent;
  let fixture: ComponentFixture<SearchBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
