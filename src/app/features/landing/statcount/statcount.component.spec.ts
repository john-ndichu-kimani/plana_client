import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatcountComponent } from './statcount.component';

describe('StatcountComponent', () => {
  let component: StatcountComponent;
  let fixture: ComponentFixture<StatcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatcountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
