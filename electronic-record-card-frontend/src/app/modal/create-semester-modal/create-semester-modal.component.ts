import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {KeyValuePipe, NgForOf} from "@angular/common";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-create-semester-modal',
  standalone: true,
  imports: [
    KeyValuePipe,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './create-semester-modal.component.html',
  styleUrls: ['../modal.scss', './create-semester-modal.component.scss']
})
export class CreateSemesterModalComponent {

  @Input() onCreate?: Function;

  protected form = new FormGroup({
    semester: new FormControl<number>(0)
  })

  constructor(
    private activeModal: NgbActiveModal
  ) {
  }

  protected create(): void {
    if(this.onCreate) {
      this.onCreate(this.form.controls.semester.value);
    }
    this.close();
  }

  protected close(): void {
    this.activeModal.dismiss();
  }

}
