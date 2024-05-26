import {Component, OnInit} from '@angular/core';
import {StatementService} from "./service/statement.service";
import {IStatement} from "./model/statement.model";
import {NgForOf, NgIf} from "@angular/common";
import {GroupService} from "../group/service/group.service";
import {SubjectService} from "../subject/service/subject.service";
import {IGroup} from "../group/model/group.model";
import {ISubject} from "../subject/model/subject.model";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIcon} from "@ng-icons/core";

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgIcon
  ],
  templateUrl: './statement.component.html',
  styleUrl: './statement.component.scss'
})
export class StatementComponent implements OnInit {

  statements?: IStatement[];

  groups?: IGroup[];

  subjects?: ISubject[];

  statementForm = new FormGroup({
    group: new FormControl(),
    subject: new FormControl()
  })

  constructor(
    private statementService: StatementService,
    private groupService: GroupService,
    private subjectService: SubjectService
  ) {
  }

  ngOnInit(): void {
    this.groupService.getAll()
      .subscribe(res => this.groups = res);
    this.subjectService.getAll()
      .subscribe(res => this.subjects = res);
  }

  protected showExported() {
    this.statementService.export(
        this.statementForm.controls.group.value,
        this.statementForm.controls.subject.value
      )
      .subscribe(res => this.statements = res);
  }

  protected export() {
    const subjectName = this.subjects
      ?.find(element => element.id == this.statementForm.controls.subject.value)
      ?.name
    const groupName = this.groups
      ?.find(element => element.id == this.statementForm.controls.group.value)
      ?.name
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL
      .createObjectURL(new Blob([JSON.stringify(this.statements, null, 2)],
        {type: 'application/json'}));
    downloadLink.setAttribute('download', `Ведомость_${subjectName}_${groupName}`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

}
