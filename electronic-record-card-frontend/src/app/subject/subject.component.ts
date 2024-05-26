import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {IButton, IListItem} from "../list/list.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ISubject} from "./model/subject.model";
import {SubjectService} from "./service/subject.service";
import {ViewModalComponent} from "../modal/view-modal/view-modal.component";
import {Page} from "../pagination/model/pagination.model";
import {PAGE_SIZE} from "../pagination/constants/pagination.constants";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [
    ListComponent,
    NgIf
  ],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent implements OnInit {

  protected subjectPage?: Page<ISubject>;

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
    this.load(1);
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

  load(pageNumber: number): void {
    this.subjectService.getAllInPage(pageNumber - 1, PAGE_SIZE)
      .subscribe(page => {
        this.subjectPage = page;
        this.listItems = page.content?.map(subject => {
          return {
            id: subject.id,
            text: subject.name
          }
        });
      });
  }

}
