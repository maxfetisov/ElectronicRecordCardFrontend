import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTypeComponent } from './control-type.component';

describe('ControlTypeComponent', () => {
  let component: ControlTypeComponent;
  let fixture: ComponentFixture<ControlTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
