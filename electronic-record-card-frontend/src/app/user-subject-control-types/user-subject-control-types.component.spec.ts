import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubjectControlTypesComponent } from './user-subject-control-types.component';

describe('UserSubjectControlTypesComponent', () => {
  let component: UserSubjectControlTypesComponent;
  let fixture: ComponentFixture<UserSubjectControlTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSubjectControlTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSubjectControlTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
