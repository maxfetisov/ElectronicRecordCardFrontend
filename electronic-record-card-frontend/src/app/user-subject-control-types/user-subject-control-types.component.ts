import {Component, OnInit} from '@angular/core';
import {SubjectService} from "../subject/service/subject.service";
import {ISubject} from "../subject/model/subject.model";
import {NgIcon} from "@ng-icons/core";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {UserService} from "../user/service/user.service";
import {IUser} from "../user/model/user.model";
import {Role} from "../account/model/account.model";
import {UserSubjectControlTypeService} from "./service/user-subject-control-type.service";
import {IUserSubjectControlType} from "./model/user-subject-control-type.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  UserSubjectControlTypeUpdateModalComponent
} from "../modal/user-subject-control-type-update-modal/user-subject-control-type-update-modal.component";
import {CreateSemesterModalComponent} from "../modal/create-semester-modal/create-semester-modal.component";

@Component({
  selector: 'app-user-subject-control-types',
  standalone: true,
  imports: [
    NgIcon,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './user-subject-control-types.component.html',
  styleUrl: './user-subject-control-types.component.scss'
})
export class UserSubjectControlTypesComponent implements OnInit {

  protected subjects?: ISubject[]

  protected teachers?: IUser[];

  protected selectedSubject?: ISubject;

  protected selectedTeacher?: IUser;

  protected userSubjectControlTypes?: Map<number, IUserSubjectControlType[]>;

  constructor(
    private subjectService: SubjectService,
    private userService: UserService,
    private userSubjectControlTypeService: UserSubjectControlTypeService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.subjectService.getAll()
      .subscribe(res => this.subjects = res);
    this.userService.getByCriteria({
      "roles.name": Role.TEACHER
    }).subscribe(res => this.teachers = res);
  }

  protected selectSubject(subject: ISubject): void {
    if(this.selectedSubject === subject) {
      this.userSubjectControlTypes = undefined;
      this.selectedTeacher = undefined;
      this.selectedSubject = undefined;
    }
    else {
      this.userSubjectControlTypes = undefined;
      this.selectedTeacher = undefined;
      this.selectedSubject = subject;
    }
  }

  protected selectTeacher(teacher: IUser): void {
    if(this.selectedTeacher === teacher) {
      this.selectedTeacher = undefined;
      this.userSubjectControlTypes = undefined;
    }
    else {
      this.userSubjectControlTypeService.getByCriteria({
        "subject.id": this.selectedSubject?.id,
        "teacher.id": teacher?.id
      }).subscribe(res => {
        this.selectedTeacher = teacher;
        this.userSubjectControlTypes = undefined;
        this.userSubjectControlTypes = new Map<number, IUserSubjectControlType[]>();
        res.forEach(usct => {
          this.userSubjectControlTypes!.set(
            usct.semester,
            this.userSubjectControlTypes!.get(usct.semester) ?
              [...this.userSubjectControlTypes!.get(usct.semester)!, usct]
              : [usct]
          );
        });
      })
    }
  }

  openUpdateModal(semester: number): void {
    const modalRef = this.modalService.open(UserSubjectControlTypeUpdateModalComponent, {
      backdrop: true
    });
    modalRef.componentInstance.subject = this.selectedSubject;
    modalRef.componentInstance.teacher = this.selectedTeacher;
    modalRef.componentInstance.semester = semester;
    modalRef.componentInstance.userSubjectControlTypes = this.userSubjectControlTypes?.get(semester);
  }

  openCreateSemesterModal(): void {
    const modalRef = this.modalService.open(CreateSemesterModalComponent, {
      backdrop: true
    });
    modalRef.componentInstance.onCreate = (semester: number) => this.createSemester(semester);
  }

  createSemester(semester: number): void {
    if(this.userSubjectControlTypes?.has(semester)) {
      return;
    }
    this.userSubjectControlTypes?.set(semester, []);
  }

}
