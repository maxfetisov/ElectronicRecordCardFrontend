import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {IButton, IListItem} from "../list/list.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IUser} from "./model/user.model";
import {UserService} from "./service/user.service";
import {ViewModalComponent} from "../modal/view-modal/view-modal.component";
import {Page} from "../pagination/model/pagination.model";
import {PAGE_SIZE} from "../pagination/constants/pagination.constants";
import {DeleteModalComponent} from "../modal/delete-modal/delete-modal.component";
import {CreateUpdateModalComponent} from "../modal/create-update-modal/create-update-modal.component";
import {AccountService} from "../account/service/account.service";
import {GroupService} from "../group/service/group.service";
import {InstituteService} from "../institute/service/institute.service";
import {combineLatest} from "rxjs";

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
    private userService: UserService,
    private modalService: NgbModal,
    private accountService: AccountService,
    private groupService: GroupService,
    private instituteService: InstituteService
  ) {
  }

  ngOnInit(): void {
    this.load(this.selectedPage)
  }

  protected load(pageNumber: number): void {
    this.selectedPage = pageNumber;
    this.userService.getAllInPage(this.selectedPage - 1, PAGE_SIZE)
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

  protected openCreateModal(): void {
    combineLatest([
      this.groupService.getAll(),
      this.instituteService.getAll(),
      this.accountService.getRoles()
    ]).subscribe(([groups, institutes, roles]) => {
      const modalRef = this.modalService.open(CreateUpdateModalComponent, {
        backdrop: true,
      });
      modalRef.componentInstance.header = 'Создание пользователя';
      modalRef.componentInstance.inputs = [{
        label: 'Логин',
        name: 'login',
        type: 'text'
      },
        {
          label: 'Пароль',
          name: 'password',
          type: 'password'
        },
        {
          label: 'Фамилия',
          name: 'lastName',
          type: 'text'
        },
        {
          label: 'Имя',
          name: 'firstName',
          type: 'text'
        },
        {
          label: 'Отчество',
          name: 'middleName',
          type: 'text'
        },
        {
          label: 'Номер телефона',
          name: 'phoneNumber',
          type: 'tel'
        },
        {
          label: 'Адрес электронной почты',
          name: 'email',
          type: 'email'
        },
        {
          label: 'Номер зачетной книжки',
          name: 'recordBookNumber',
          type: 'text'
        },
        {
          label: 'Группа',
          name: 'groupId',
          type: 'select',
          options: groups.map(group => {
            return {
              id: group.id,
              title: group.name
            }
          })
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
        },
        {
          label: 'Роли',
          name: 'roles',
          type: 'select',
          multiple: true,
          options: roles.map(role => {
            return {
              id: role.id,
              title: role.name
            }
          })
        }];
      modalRef.componentInstance.onCreateOrUpdate = (value: any) => this.create(value);
    });
  }

  protected openUpdateModal(id: number): void {
    combineLatest([
      this.groupService.getAll(),
      this.instituteService.getAll(),
      this.accountService.getRoles()
    ]).subscribe(([groups, institutes, roles]) => {
      const user = this.userPage?.content
        ?.find(element => element.id === id);
      if (!user) {
        return;
      }
      const modalRef = this.modalService.open(CreateUpdateModalComponent, {
        backdrop: true,
      });
      modalRef.componentInstance.header = 'Изменение пользователя';
      modalRef.componentInstance.inputs = [{
        label: 'Логин',
        name: 'login',
        type: 'text',
        value: user.login
      },
        {
          label: 'Фамилия',
          name: 'lastName',
          type: 'text',
          value: user.lastName
        },
        {
          label: 'Имя',
          name: 'firstName',
          type: 'text',
          value: user.firstName
        },
        {
          label: 'Отчество',
          name: 'middleName',
          type: 'text',
          value: user.middleName
        },
        {
          label: 'Номер телефона',
          name: 'phoneNumber',
          type: 'tel',
          value: user.phoneNumber
        },
        {
          label: 'Адрес электронной почты',
          name: 'email',
          type: 'email',
          value: user.email
        },
        {
          label: 'Номер зачетной книжки',
          name: 'recordBookNumber',
          type: 'text',
          value: user.recordBookNumber
        },
        {
          label: 'Группа',
          name: 'groupId',
          type: 'select',
          value: [user.groupId],
          options: groups.map(group => {
            return {
              id: group.id,
              title: group.name
            }
          })
        },
        {
          label: 'Институт',
          name: 'instituteId',
          type: 'select',
          value: [user.instituteId],
          options: institutes.map(institute => {
            return {
              id: institute.id,
              title: institute.name
            }
          })
        },
        {
          label: 'Роли',
          name: 'roles',
          type: 'select',
          value: user.roles,
          multiple: true,
          options: roles.map(role => {
            return {
              id: role.id,
              title: role.name
            }
          })
        }];
      modalRef.componentInstance.onCreateOrUpdate = (value: any) => this.update(user, value);
    });
  }

  protected openDeleteModal(id: number): void {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      backdrop: true,
    })
    modalRef.componentInstance.header = 'Удаление пользователя';
    modalRef.componentInstance.onDelete = () => this.delete(id);
  }

  private create(user: any): void {
    user.instituteId = user.instituteId[0];
    user.groupId = user.groupId[0];
    if(user.recordBookNumber === "") {
      user.recordBookNumber = null;
    }
    this.userService.create(user)
      .subscribe(() => this.load(this.selectedPage));
  }

  private update(oldUser: IUser, newUser: any) {
    newUser.instituteId = newUser.instituteId[0];
    newUser.groupId = newUser.groupId[0];
    if(newUser.recordBookNumber === "") {
      newUser.recordBookNumber = null;
    }
    this.userService.update({
      id: oldUser.id,
      version: oldUser.version,
      ...newUser
    }).subscribe(() => this.load(this.selectedPage));
  }

  private delete(id: number): void {
    const version = this.userPage?.content
      ?.find(user => user.id === id)?.version
    this.userService.delete(id, version ?? 1)
      .subscribe(() => this.load(this.selectedPage));
  }

}
