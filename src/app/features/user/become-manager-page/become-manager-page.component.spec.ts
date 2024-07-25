import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeManagerPageComponent } from './become-manager-page.component';

describe('BecomeManagerPageComponent', () => {
  let component: BecomeManagerPageComponent;
  let fixture: ComponentFixture<BecomeManagerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BecomeManagerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeManagerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
