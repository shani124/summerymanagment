import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummerylistComponent } from './summerylist.component';

describe('SummerylistComponent', () => {
  let component: SummerylistComponent;
  let fixture: ComponentFixture<SummerylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummerylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummerylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
