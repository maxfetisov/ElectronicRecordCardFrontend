import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {InstituteComponent} from "./institute/institute.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {NgClass} from "@angular/common";
import {provideIcons} from "@ng-icons/core";
import {
  heroAcademicCap,
  heroArrowLongLeft, heroBookOpen, heroBuildingLibrary,
  heroCheck, heroDocumentCheck, heroEye,
  heroHomeModern, heroPencil, heroPlus, heroTrash,
  heroUser,
  heroUserGroup
} from "@ng-icons/heroicons/outline";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent, InstituteComponent, SidebarComponent, NgClass],
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
    heroEye
  })]
})
export class AppComponent {
  title = 'electronic-record-card-frontend';

  protected collapsed = false;

  protected onCollapse(collapsed: boolean): void {
    this.collapsed = collapsed;
  }

}
