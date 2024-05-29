import {Component, Input, OnInit} from '@angular/core';
import {IUserSubjectControlType} from "../../user-subject-control-types/model/user-subject-control-type.model";
import {ISubject} from "../../subject/model/subject.model";
import {IUser} from "../../user/model/user.model";
import {KeyValuePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../user/service/user.service";
import {Role} from "../../account/model/account.model";
import {NgIcon} from "@ng-icons/core";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  UserSubjectControlTypeService
} from "../../user-subject-control-types/service/user-subject-control-type.service";
import {ControlTypeService} from "../../control-type/service/control-type.service";
import {IControlType} from "../../control-type/model/control-type.model";
import {GroupService} from "../../group/service/group.service";
import {IGroup} from "../../group/model/group.model";
import {ChoiceType} from "./choice-type";

@Component({
  selector: 'app-user-subject-control-type-update-modal',
  standalone: true,
  imports: [
    KeyValuePipe,
    NgForOf,
    NgClass,
    NgIcon,
    NgIf,
    ReactiveFormsModule
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

  protected allStudents?: IUser[];

  protected selectedStudent?: IUser;

  protected controlTypes?: IControlType[];

  protected createSelected = false;

  protected groups?: IGroup[];

  protected selectedChoice = ChoiceType.GROUP;

  constructor(
    protected activeModal: NgbActiveModal,
    private userService: UserService,
    private userSubjectControlTypeService: UserSubjectControlTypeService,
    private controlTypeService: ControlTypeService,
    private groupService: GroupService
  ) {
  }

  studentForm = new FormGroup({
    hoursNumber: new FormControl<number>(0),
    controlType: new FormControl<number>(0),
    note: new FormControl()
  });

  createForm = new FormGroup({
    hoursNumber: new FormControl<number>(0),
    controlType: new FormControl<number>(0),
    student: new FormControl<number>(0),
    group: new FormControl<number>(0),
    note: new FormControl()
  });

  ngOnInit(): void {
    this.load();
  }

  protected close(): void {
    this.activeModal.dismiss();
  }

  protected selectStudent(student: IUser) {
    if(this.selectedStudent === student) {
      this.selectedStudent = undefined;
    }
    else {
      const usct = this.userSubjectControlTypes
        ?.find(element => element.studentId === student.id);
      this.studentForm.controls.hoursNumber.patchValue(usct?.hoursNumber ?? 0);
      this.studentForm.controls.note.patchValue(usct?.note);
      this.studentForm.controls.controlType.patchValue(usct?.controlTypeId ?? null);
      this.selectedStudent = student;
      this.createSelected = false;
    }
  }

  protected selectCreate(): void {
    this.createSelected = !this.createSelected;
    if(this.createSelected) {
      this.selectedStudent = undefined;
    }
  }

  protected selectStudentChoice(): void {
    this.selectedChoice = ChoiceType.STUDENT;
  }

  protected selectGroupChoice(): void {
    this.selectedChoice = ChoiceType.GROUP;
  }

  protected create(): void {
    if(!this.semester
      || !this.teacher?.id
      || !this.subject?.id
      || !this.createForm.controls.hoursNumber.value
      || !this.createForm.controls.controlType.value
      || !(this.createForm.controls.student.value || this.createForm.controls.group.value)
    ) {
      return;
    }
    if(this.selectedChoice === ChoiceType.STUDENT) {
      this.userSubjectControlTypeService.create({
        semester: this.semester,
        teacherId: this.teacher.id,
        studentId: this.createForm.controls.student.value!,
        subjectId: this.subject.id,
        controlTypeId: this.createForm.controls.controlType.value,
        hoursNumber: this.createForm.controls.hoursNumber.value,
        note: this.createForm.controls.note.value
      }).subscribe(() => this.onCreateSuccess());
    }
    else {
      this.userSubjectControlTypeService.createByGroup({
        semester: this.semester,
        teacherId: this.teacher.id,
        groupId: this.createForm.controls.group.value!,
        subjectId: this.subject.id,
        controlTypeId: this.createForm.controls.controlType.value,
        hoursNumber: this.createForm.controls.hoursNumber.value,
        note: this.createForm.controls.note.value
      }).subscribe(() => this.onCreateSuccess());
    }
  }

  protected update(): void {
    if(!this.semester
      || !this.selectedStudent?.id
      || !this.teacher?.id
      || !this.studentForm.controls.hoursNumber.value
      || !this.studentForm.controls.controlType.value
    ) {
      return;
    }
    const usct = this.userSubjectControlTypes
      ?.find(element => element.studentId === this.selectedStudent?.id);
    if(!usct) {
      return;
    }
    this.userSubjectControlTypeService.update({
      id: usct.id,
      semester: usct.semester,
      studentId: usct.studentId,
      teacherId: usct.teacherId,
      subjectId: usct.subjectId,
      controlTypeId: this.studentForm.controls.controlType.value,
      hoursNumber: this.studentForm.controls.hoursNumber.value,
      note: this.studentForm.controls.note.value,
      version: usct.version
    }).subscribe(res => {
      if(this.userSubjectControlTypes) {
        const index = this.userSubjectControlTypes.indexOf(usct);
        if(index) {
          this.userSubjectControlTypes[index] = res;
        }
      }
    });
  }

  protected delete(): void {
    const usct = this.userSubjectControlTypes
      ?.find(element => element.studentId === this.selectedStudent?.id);
    if(!usct?.id || !usct.version) {
      return
    }
    this.userSubjectControlTypeService.delete(usct.id, usct.version)
      .subscribe(() => this.load());
  }

  private load(): void {
    this.userService.getByCriteria({
      "roles.name": Role.STUDENT,
      "studentUserSubjectControlTypes.semester": this.semester,
      "studentUserSubjectControlTypes.teacher.id": this.teacher?.id,
      "studentUserSubjectControlTypes.subject.id": this.subject?.id,
    }).subscribe(res => this.students = res);
    this.userService.getByCriteria({
      "roles.name": Role.STUDENT
    }).subscribe(res => this.allStudents = res);
    this.groupService.getAll()
      .subscribe(res => this.groups = res);
    this.controlTypeService.getAll()
      .subscribe(res => this.controlTypes = res);
  }

  private onCreateSuccess(): void {
    this.createSelected = false;
    this.load();
  }

}
