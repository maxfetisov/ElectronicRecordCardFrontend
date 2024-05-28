import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubjectControlTypeUpdateModalComponent } from './user-subject-control-type-update-modal.component';

describe('UserSubjectControlTypeUpdateModalComponent', () => {
  let component: UserSubjectControlTypeUpdateModalComponent;
  let fixture: ComponentFixture<UserSubjectControlTypeUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSubjectControlTypeUpdateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSubjectControlTypeUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
