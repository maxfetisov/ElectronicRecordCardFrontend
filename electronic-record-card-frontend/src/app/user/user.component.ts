import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {IButton, IListItem} from "../list/list.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IUser} from "./model/user.model";
import {UserService} from "./service/user.service";
import {ViewModalComponent} from "../modal/view-modal/view-modal.component";
import {Page} from "../pagination/model/pagination.model";
import {PAGE_SIZE} from "../pagination/constants/pagination.constants";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ListComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  protected userPage?: Page<IUser>;
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
    private userService: UserService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.load(1)
  }

  protected load(pageNumber: number): void {
    this.userService.getAllInPage(pageNumber - 1, PAGE_SIZE)
      .subscribe(page => {
        this.userPage = page;
        this.listItems = page.content?.map(user => { return {
          id: user.id,
          text: user.login,
          additionalText: user.lastName + ' ' + user.firstName + ' ' + (user.middleName ?? '')
        }});
      });
  }

  protected openViewModal(id: number) {
    this.userService.getById(id).subscribe(user => {
      const modalRef = this.modalService.open(ViewModalComponent, {
        backdrop: true
      });
      modalRef.componentInstance.header = 'Просмотр пользователя';
      modalRef.componentInstance.values = {
        'Логин': user.login,
        'Фамилия': user.lastName,
        'Имя': user.firstName,
        'Отчество': user.middleName,
        'Номер телефона': user.phoneNumber,
        'E-mail': user.email,
        'Номер зачетной книжки': user.recordBookNumber
      }
    })
  }

}
