import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {InstituteService} from "./service/institute.service";
import {IInstitute} from "./model/institute.model";
import {IButton, IListItem} from "../list/list.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ViewModalComponent} from "../modal/view-modal/view-modal.component";

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

  images?: {src: string}[];
  protected institutes?: IInstitute[];
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
    private instituteService: InstituteService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.instituteService.getAll()
      .subscribe(institutes => {
        this.institutes = institutes;
        this.listItems = institutes.map(institute => {
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
}
