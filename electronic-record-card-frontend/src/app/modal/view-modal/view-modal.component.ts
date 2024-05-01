import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {KeyValuePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-view-modal',
  standalone: true,
  imports: [
    NgForOf,
    KeyValuePipe
  ],
  templateUrl: './view-modal.component.html',
  styleUrls: ['../modal.scss', './view-modal.component.scss']
})
export class ViewModalComponent {

  @Input() header?: string;

  @Input() values?: Map<string, string>;

  constructor(
    protected activeModal: NgbActiveModal
  ) {
  }

  protected close(): void {
    this.activeModal.dismiss();
  }

}
