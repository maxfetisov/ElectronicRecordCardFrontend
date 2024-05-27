import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IInput} from "./model/create-update.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-create-update-modal',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './create-update-modal.component.html',
  styleUrls: ['../modal.scss', './create-update-modal.component.scss']
})
export class CreateUpdateModalComponent implements OnInit {

  @Input() header?: string;

  @Input() inputs?: IInput[];

  @Input() onCreateOrUpdate?: Function;

  protected form = this.formBuilder.group({});

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.inputs
      ?.forEach(input => this.form
        .addControl(input.name, new FormControl<any>(input.value ?? '')));
  }

  createOrUpdate(): void {
    if(this.onCreateOrUpdate) {
      this.onCreateOrUpdate(this.form.value);
    }
    this.close();
  }

  protected close(): void {
    this.activeModal.dismiss();
  }

  protected readonly FormControl = FormControl;
}
