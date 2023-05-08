import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminemployeedateComponent } from './adminemployeedate.component';

describe('AdminemployeedateComponent', () => {
  let component: AdminemployeedateComponent;
  let fixture: ComponentFixture<AdminemployeedateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminemployeedateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminemployeedateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
