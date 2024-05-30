import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSemesterModalComponent } from './create-semester-modal.component';

describe('CreateSemesterModalComponent', () => {
  let component: CreateSemesterModalComponent;
  let fixture: ComponentFixture<CreateSemesterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSemesterModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSemesterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
