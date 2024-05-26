import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IButton, IListItem} from "./list.model";
import {NgForOf, NgIf} from "@angular/common";
import {NgIcon} from "@ng-icons/core";
import {PaginationComponent} from "../pagination/pagination.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIcon,
    NgIf,
    PaginationComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  @Input() header?: string;

  @Input() listItems?: IListItem[];

  @Input() actions?: IButton[];

  @Input() addAction?: IButton;

  @Input() totalPages?: number;

  @Output() onPageChange = new EventEmitter<number>()

  protected showedPages = 7;

}
