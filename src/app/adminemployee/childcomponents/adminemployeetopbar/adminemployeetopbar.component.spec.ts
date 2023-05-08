import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminemployeetopbarComponent } from './adminemployeetopbar.component';

describe('AdminemployeetopbarComponent', () => {
  let component: AdminemployeetopbarComponent;
  let fixture: ComponentFixture<AdminemployeetopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminemployeetopbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminemployeetopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
