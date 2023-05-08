import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminemployeprojectComponent } from './adminemployeproject.component';

describe('AdminemployeprojectComponent', () => {
  let component: AdminemployeprojectComponent;
  let fixture: ComponentFixture<AdminemployeprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminemployeprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminemployeprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
