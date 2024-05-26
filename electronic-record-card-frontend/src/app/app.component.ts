import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {InstituteComponent} from "./institute/institute.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {NgClass, NgIf} from "@angular/common";
import {provideIcons} from "@ng-icons/core";
import {
  heroAcademicCap,
  heroArrowLongLeft, heroBookOpen, heroBuildingLibrary,
  heroCheck, heroDocumentCheck, heroEye,
  heroHomeModern, heroPencil, heroPlus, heroTrash,
  heroUser,
  heroUserGroup,
  heroClipboardDocumentList, heroArrowDownTray, heroMagnifyingGlass
} from "@ng-icons/heroicons/outline";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {IUser} from "./user/model/user.model";
import {AccountService} from "./account/service/account.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ListComponent,
    InstituteComponent,
    SidebarComponent,
    NgClass,
    NgbModule,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [provideIcons({
    heroArrowLongLeft,
    heroAcademicCap,
    heroHomeModern,
    heroUserGroup,
    heroUser,
    heroCheck,
    heroBuildingLibrary,
    heroDocumentCheck,
    heroBookOpen,
    heroPencil,
    heroTrash,
    heroPlus,
    heroEye,
    heroClipboardDocumentList,
    heroArrowDownTray,
    heroMagnifyingGlass
  })]
})
export class AppComponent implements OnInit {
  title = 'electronic-record-card-frontend';

  protected collapsed = false;

  protected account?: IUser;

  constructor(
    private accountService: AccountService
  ) {
  }

  protected onCollapse(collapsed: boolean): void {
    this.collapsed = collapsed;
  }

  ngOnInit(): void {
    this.accountService.account.subscribe(res => this.account = res);
  }

}
