import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {IButton, IListItem} from "../list/list.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IMark} from "./model/mark.model";
import {MarkService} from "./service/mark.service";
import {ViewModalComponent} from "../modal/view-modal/view-modal.component";
import {CreateUpdateModalComponent} from "../modal/create-update-modal/create-update-modal.component";

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
      action: this.openUpdateModal.bind(this)
    }
  ];

  constructor(
    private markService: MarkService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.load();
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

  protected openUpdateModal(id: number): void {
    const mark = this.marks
      ?.find(element => element.id === id);
    if(!mark) {
      return;
    }
    const modalRef = this.modalService.open(CreateUpdateModalComponent, {
      backdrop: true,
    });
    modalRef.componentInstance.header = 'Изменение оценки';
    modalRef.componentInstance.inputs = [{
      label: 'Название',
      name: 'title',
      type: 'text',
      value: mark?.title
    }];
    modalRef.componentInstance.onCreateOrUpdate = (value: any) => this.update(mark, value);
  }

  private load() {
    this.markService.getAll()
      .subscribe(marks => {
        this.marks = marks;
        this.listItems = marks.map(mark => { return {
          id: mark.id,
          text: mark.title,
        }});
      });
  }

  private update(oldMark: IMark, newMark: any) {
    this.markService.update({
      id: oldMark.id,
      version: oldMark.version,
      ...newMark
    }).subscribe(() => this.load());
  }

}
