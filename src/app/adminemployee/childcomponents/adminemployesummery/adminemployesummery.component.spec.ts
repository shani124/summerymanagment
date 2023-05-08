import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminemployesummeryComponent } from './adminemployesummery.component';

describe('AdminemployesummeryComponent', () => {
  let component: AdminemployesummeryComponent;
  let fixture: ComponentFixture<AdminemployesummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminemployesummeryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminemployesummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
