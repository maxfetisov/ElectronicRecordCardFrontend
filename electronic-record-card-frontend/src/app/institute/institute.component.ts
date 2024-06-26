import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {InstituteService} from "./service/institute.service";
import {IInstitute} from "./model/institute.model";
import {IButton, IListItem} from "../list/list.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ViewModalComponent} from "../modal/view-modal/view-modal.component";
import {Page} from "../pagination/model/pagination.model";
import {PAGE_SIZE} from "../pagination/constants/pagination.constants";
import {DeleteModalComponent} from "../modal/delete-modal/delete-modal.component";
import {CreateUpdateModalComponent} from "../modal/create-update-modal/create-update-modal.component";

@Component({
  selector: 'app-institute',
  standalone: true,
  imports: [
    ListComponent
  ],
  templateUrl: './institute.component.html',
  styleUrl: './institute.component.scss'
})
export class InstituteComponent implements OnInit {

  protected institutePage?: Page<IInstitute>;
  protected listItems?: IListItem[];
  protected selectedPage = 1;
  protected actions: IButton[] = [
    {
      icon: "heroEye",
      action: this.openViewModal.bind(this)
    },
    {
      icon: "heroPencil",
      action: this.openUpdateModal.bind(this)
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
    private instituteService: InstituteService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.load(this.selectedPage);
  }

  protected load(pageNumber: number) {
    this.selectedPage = pageNumber;
    this.instituteService.getAllInPage(this.selectedPage - 1, PAGE_SIZE)
      .subscribe(page => {
        this.institutePage = page;
        this.listItems = page.content?.map(institute => {
          return {
            id: institute.id,
            text: institute.name,
            additionalText: institute.fullName
          }
        });
      });
  }

  protected openViewModal(id: number): void {
    this.instituteService.getById(id).subscribe(institute => {
      const modalRef = this.modalService.open(ViewModalComponent, {
        backdrop: true,
      })
      modalRef.componentInstance.header = 'Просмотр института';
      modalRef.componentInstance.values = {
        'Название': institute.name,
        'Полное название': institute.fullName
      }
    })
  }

  protected openCreateModal(): void {
    const modalRef = this.modalService.open(CreateUpdateModalComponent, {
      backdrop: true,
    });
    modalRef.componentInstance.header = 'Создание института';
    modalRef.componentInstance.inputs = [{
      label: 'Название',
      name: 'name',
      type: 'text'
    },
      {
        label: 'Полное название',
        name: 'fullName',
        type: 'text'
      }
    ];
    modalRef.componentInstance.onCreateOrUpdate = (value: any) => this.create(value);
  }
  protected openUpdateModal(id: number): void {
    const institute = this.institutePage?.content
      ?.find(element => element.id === id);
    if(!institute) {
      return;
    }
    const modalRef = this.modalService.open(CreateUpdateModalComponent, {
      backdrop: true,
    });
    modalRef.componentInstance.header = 'Изменение института';
    modalRef.componentInstance.inputs = [{
      label: 'Название',
      name: 'name',
      type: 'text',
      value: institute.name
    },
      {
        label: 'Полное название',
        name: 'fullName',
        type: 'text',
        value: institute.fullName
      }
    ];
    modalRef.componentInstance.onCreateOrUpdate = (value: any) => this.update(institute, value);
  }


  protected openDeleteModal(id: number): void {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      backdrop: true,
    })
    modalRef.componentInstance.header = 'Удаление института';
    modalRef.componentInstance.onDelete = () => this.delete(id);
  }

  private create(institute: any): void {
    this.instituteService.create(institute)
      .subscribe(() => this.load(this.selectedPage));
  }

  private update(oldInstitute: IInstitute, newInstitute: any) {
    this.instituteService.update({
      id: oldInstitute.id,
      version: oldInstitute.version,
      ...newInstitute
    }).subscribe(() => this.load(this.selectedPage));
  }

  private delete(id: number): void {
    const version = this.institutePage?.content
      ?.find(institute => institute.id === id)?.version
    this.instituteService.delete(id, version ?? 1)
      .subscribe(() => this.load(this.selectedPage));
  }
}
