import {Component, Input} from '@angular/core';
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [
    KeyValuePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './delete-modal.component.html',
  styleUrls: ['../modal.scss', './delete-modal.component.scss']
})
export class DeleteModalComponent {

  @Input() header?: string;

  @Input() onDelete?: Function;

  constructor(
    private activeModal: NgbActiveModal
  ) {
  }

  protected close(): void {
    this.activeModal.dismiss();
  }

  protected delete(): void {
    if(this.onDelete) {
      this.onDelete();
    }
    this.close();
  }

}
