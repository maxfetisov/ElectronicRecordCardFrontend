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
import {DeleteModalComponent} from "../modal/delete-modal/delete-modal.component";
import {CreateUpdateModalComponent} from "../modal/create-update-modal/create-update-modal.component";

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

  protected selectedPage = 1;

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
      action: this.openDeleteModal.bind(this)
    }
  ];
  protected addAction: IButton = {
    icon: "heroPlus",
    action: this.openCreateModal.bind(this)
  };


  constructor(
    private subjectService: SubjectService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.load(this.selectedPage);
  }

  protected load(pageNumber: number): void {
    this.selectedPage = pageNumber;
    this.subjectService.getAllInPage(this.selectedPage - 1, PAGE_SIZE)
      .subscribe(page => {
        this.subjectPage = page;
        this.listItems = page.content?.map(subject => {
          return {
            id: subject.id!,
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

  protected openCreateModal(): void {
    const modalRef = this.modalService.open(CreateUpdateModalComponent, {
      backdrop: true,
    });
    modalRef.componentInstance.header = 'Создание предмета';
    modalRef.componentInstance.inputs = [{
      label: 'Название',
      name: 'name',
      type: 'text'
    }];
    modalRef.componentInstance.onCreateOrUpdate = (value: any) => this.create(value);
  }

  protected openDeleteModal(id: number): void {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      backdrop: true,
    });
    modalRef.componentInstance.header = 'Удаление предмета';
    modalRef.componentInstance.onDelete = () => this.delete(id);
  }

  private create(subject: any): void {
    this.subjectService.create(subject)
      .subscribe(() => this.load(this.selectedPage));
  }

  private delete(id: number): void {
    const version = this.subjectPage?.content
      ?.find(subject => subject.id === id)?.version
    this.subjectService.delete(id, version ?? 1)
      .subscribe(() => this.load(this.selectedPage));
  }

}
