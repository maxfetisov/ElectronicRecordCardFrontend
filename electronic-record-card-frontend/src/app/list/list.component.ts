import {Component, Input} from '@angular/core';
import {IButton, IListItem} from "./list.model";
import {NgForOf, NgIf} from "@angular/common";
import {NgIcon} from "@ng-icons/core";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIcon,
    NgIf
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  @Input() header?: string;

  @Input() listItems?: IListItem[];

  @Input() actions?: IButton[];

  @Input() addAction?: IButton;

}
