import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {IButton, IListItem} from "../list/list.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ISubject} from "./model/subject.model";
import {SubjectService} from "./service/subject.service";
import {ViewModalComponent} from "../modal/view-modal/view-modal.component";

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [
    ListComponent
  ],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent implements OnInit {

  protected subjects?: ISubject[];
  protected listItems?: IListItem[];
  protected actions: IButton[] = [
    {
      icon: "heroEye",
      action: this.openViewModal.bind(this)
    },
    {
      icon: "heroPencil",
      action: () => {
      }
    },
    {
      icon: "heroTrash",
      action: () => {
      }
    }
  ];
  protected addAction: IButton = {
    icon: "heroPlus",
    action: () => {
    }
  };


  constructor(
    private subjectService: SubjectService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.subjectService.getAll()
      .subscribe(subjects => {
        this.subjects = subjects;
        this.listItems = subjects.map(subject => {
          return {
            id: subject.id,
            text: subject.name
          }
        });
      });
  }

  protected openViewModal(id: number): void {
    this.subjectService.getById(id).subscribe(subject => {
      const modalRef = this.modalService.open(ViewModalComponent, {
        backdrop: true
      });
      modalRef.componentInstance.header = 'Просмотр предмета';
      modalRef.componentInstance.values = {
        'Название': subject.name
      }
    });
  }

}
