import {Component, Input} from '@angular/core';
import {IListItem} from "./list.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  @Input() listItems?: IListItem[];

}
