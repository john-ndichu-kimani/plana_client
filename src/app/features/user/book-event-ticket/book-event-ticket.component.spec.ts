import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEventTicketComponent } from './book-event-ticket.component';

describe('BookEventTicketComponent', () => {
  let component: BookEventTicketComponent;
  let fixture: ComponentFixture<BookEventTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookEventTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookEventTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
