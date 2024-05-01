import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {IButton, IListItem} from "../list/list.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IGroup} from "./model/group.model";
import {GroupService} from "./service/group.service";
import {ViewModalComponent} from "../modal/view-modal/view-modal.component";

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    ListComponent
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent implements OnInit{

protected groups?: IGroup[];
protected listItems?: IListItem[];
protected actions: IButton[] = [
    {
      icon: "heroEye",
      action: this.openViewModal.bind(this)
    },
    {
      icon: "heroPencil",
      action: () => {}
    },
    {
      icon: "heroTrash",
      action: () => {}
    }
  ];
protected addAction: IButton = {
    icon: "heroPlus",
    action: () => {}
  };


  constructor(
    private groupService: GroupService,
    private modalService: NgbModal
) {
  }

  ngOnInit(): void {
    this.groupService.getAll()
      .subscribe(groups => {
        this.groups = groups;
        this.listItems = groups.map(group => { return {
          id: group.id,
          text: group.name,
          additionalText: group.fullName
        }});
      });
  }

  protected openViewModal(id: number) {
    this.groupService.getById(id).subscribe(group => {
      const modalRef = this.modalService.open(ViewModalComponent, {
        backdrop: true
      });
      modalRef.componentInstance.header = 'Просмотр группы';
      modalRef.componentInstance.values = {
        'Название': group.name,
        'Полное название': group.fullName,
        'Дата поступления': group.admissionDate
      }
    })
  }

}