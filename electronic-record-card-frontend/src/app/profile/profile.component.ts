import {Component, OnInit} from '@angular/core';
import {AccountService} from "../account/service/account.service";
import {IUser} from "../user/model/user.model";
import {IRole} from "../account/model/account.model";
import {NgForOf, NgIf} from "@angular/common";
import {GroupService} from "../group/service/group.service";
import {InstituteService} from "../institute/service/institute.service";
import {IGroup} from "../group/model/group.model";
import {IInstitute} from "../institute/model/institute.model";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgIcon} from "@ng-icons/core";
import {Router} from "@angular/router";
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from "../account/constants/account.constants";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    NgIcon
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  protected account?: IUser;

  protected group?: IGroup;

  protected institute?: IInstitute;

  protected roles?: (IRole | undefined)[] | undefined;

  protected passwordForm = new FormGroup({
    oldPassword: new FormControl(),
    newPassword: new FormControl()
  })

  constructor(
    private accountService: AccountService,
    private groupService: GroupService,
    private instituteService: InstituteService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.accountService.account
      .subscribe(res => {
        this.account = res;
        if(this.account?.groupId) {
          this.groupService.getById(this.account.groupId).subscribe(group => {
            this.group = group;
          })
        }
        if(this.account?.instituteId) {
          this.instituteService.getById(this.account.instituteId).subscribe(institute => {
            this.institute = institute;
          })
        }
      });
    this.accountService.roles
      .subscribe(res => this.roles = res);

  }

  changePassword(): void {
    this.accountService.changePassword({
      oldPassword: this.passwordForm.controls.oldPassword.value,
      newPassword: this.passwordForm.controls.newPassword.value
    }).subscribe()
  }

  logout(): void {
    this.accountService.logout()
      .subscribe(() => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        this.router.navigate(["./login"]);
      });
  }

}
