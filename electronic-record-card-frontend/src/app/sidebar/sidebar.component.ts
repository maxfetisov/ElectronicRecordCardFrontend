import {Component, EventEmitter, Output} from '@angular/core';
import {NgClass} from "@angular/common";
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgIcon} from "@ng-icons/core";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgClass,
    FontAwesomeModule,
    FaIconComponent,
    NgIcon
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  protected collapsed = false;

  @Output() onCollapse = new EventEmitter<boolean>();

  protected collapse(): void {
    this.collapsed = !this.collapsed;
    this.onCollapse.emit(this.collapsed);
  }

}
