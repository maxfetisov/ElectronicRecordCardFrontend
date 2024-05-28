import {Component, Input, OnInit} from '@angular/core';
import {IUserSubjectControlType} from "../../user-subject-control-types/model/user-subject-control-type.model";
import {ISubject} from "../../subject/model/subject.model";
import {IUser} from "../../user/model/user.model";
import {KeyValuePipe, NgClass, NgForOf} from "@angular/common";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../user/service/user.service";
import {Role} from "../../account/model/account.model";
import {NgIcon} from "@ng-icons/core";

@Component({
  selector: 'app-user-subject-control-type-update-modal',
  standalone: true,
  imports: [
    KeyValuePipe,
    NgForOf,
    NgIcon,
    NgClass
  ],
  templateUrl: './user-subject-control-type-update-modal.component.html',
  styleUrls: ['../modal.scss', './user-subject-control-type-update-modal.component.scss']
})
export class UserSubjectControlTypeUpdateModalComponent implements OnInit {

  @Input() subject?: ISubject;

  @Input() teacher?: IUser;

  @Input() semester?: number;

  @Input() userSubjectControlTypes?: IUserSubjectControlType[];

  protected students?: IUser[];

  protected selectedStudent?: IUser;

  constructor(
    protected activeModal: NgbActiveModal,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.getByCriteria({
      "roles.name": Role.STUDENT,
      "studentUserSubjectControlTypes.semester": this.semester,
      "studentUserSubjectControlTypes.teacher.id": this.teacher?.id,
      "studentUserSubjectControlTypes.subject.id": this.subject?.id,
    }).subscribe(res => this.students = res);
  }

  protected close(): void {
    this.activeModal.dismiss();
  }

  protected selectStudent(student: IUser) {
    if(this.selectedStudent === student) {
      this.selectedStudent = undefined;
    }
    else {
      this.selectedStudent = student;
    }
  }

}
