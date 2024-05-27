import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {IButton, IListItem} from "../list/list.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IGroup} from "./model/group.model";
import {GroupService} from "./service/group.service";
import {ViewModalComponent} from "../modal/view-modal/view-modal.component";
import {Page} from "../pagination/model/pagination.model";
import {PAGE_SIZE} from "../pagination/constants/pagination.constants";
import {DeleteModalComponent} from "../modal/delete-modal/delete-modal.component";
import {CreateUpdateModalComponent} from "../modal/create-update-modal/create-update-modal.component";
import {InstituteService} from "../institute/service/institute.service";

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

protected groupPage?: Page<IGroup>;
protected listItems?: IListItem[];
protected selectedPage = 1;
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
      action: this.openDeleteModal.bind(this)
    }
  ];
protected addAction: IButton = {
    icon: "heroPlus",
    action: this.openCreateModal.bind(this)
  };


  constructor(
    private groupService: GroupService,
    private modalService: NgbModal,
    private instituteService: InstituteService
) {
  }

  ngOnInit(): void {
    this.load(this.selectedPage);
  }

  protected load(pageNumber: number): void {
    this.selectedPage = pageNumber;
    this.groupService.getAllInPage(this.selectedPage - 1, PAGE_SIZE)
      .subscribe(page => {
        this.groupPage = page;
        this.listItems = page.content?.map(group => { return {
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

  protected openCreateModal(): void {
    this.instituteService.getAll().subscribe(institutes => {
      const modalRef = this.modalService.open(CreateUpdateModalComponent, {
        backdrop: true,
      });
      modalRef.componentInstance.header = 'Создание группы';
      modalRef.componentInstance.inputs = [{
        label: 'Название',
        name: 'name',
        type: 'text'
      },
        {
          label: 'Полное название',
          name: 'fullName',
          type: 'text'
        },
        {
          label: 'Дата поступления',
          name: 'admissionDate',
          type: 'date'
        },
        {
          label: 'Институт',
          name: 'instituteId',
          type: 'select',
          options: institutes.map(institute => {
            return {
              id: institute.id,
              title: institute.name
            }
          })
        }];
      modalRef.componentInstance.onCreateOrUpdate = (value: any) => this.create(value);
    });
  }


  protected openDeleteModal(id: number): void {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      backdrop: true,
    })
    modalRef.componentInstance.header = 'Удаление группы';
    modalRef.componentInstance.onDelete = () => this.delete(id);
  }

  private create(group: any): void {
    group.instituteId = group.instituteId[0];
    this.groupService.create(group)
      .subscribe(() => this.load(this.selectedPage));
  }

  private delete(id: number): void {
    const version = this.groupPage?.content
      ?.find(group => group.id === id)?.version
    this.groupService.delete(id, version ?? 1).subscribe(() => this.load(1));
  }

}
