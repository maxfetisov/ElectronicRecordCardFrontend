import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {IButton, IListItem} from "../list/list.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IMark} from "./model/mark.model";
import {MarkService} from "./service/mark.service";
import {ViewModalComponent} from "../modal/view-modal/view-modal.component";

@Component({
  selector: 'app-mark',
  standalone: true,
    imports: [
        ListComponent
    ],
  templateUrl: './mark.component.html',
  styleUrl: './mark.component.scss'
})
export class MarkComponent implements OnInit{

  protected marks?: IMark[];
  protected listItems?: IListItem[];
  protected actions: IButton[] = [
    {
      icon: "heroEye",
      action: this.openViewModal.bind(this)
    },
    {
      icon: "heroPencil",
      action: () => {}
    }
  ];

  constructor(
    private markService: MarkService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.markService.getAll()
      .subscribe(marks => {
        this.marks = marks;
        this.listItems = marks.map(mark => { return {
          id: mark.id,
          text: mark.title,
        }});
      });
  }

  protected openViewModal(id: number): void {
    this.markService.getById(id).subscribe(mark => {
      const modalRef = this.modalService.open(ViewModalComponent, {
        backdrop: true
      });
      modalRef.componentInstance.header = "Просмотр оценки";
      modalRef.componentInstance.values = {
        'Название': mark.title
      };
    });
  }

}
