import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NgIcon} from "@ng-icons/core";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf,
    NgIcon
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements AfterViewInit {

  @Input() totalPages?: number;

  @Input() showedPageNumber?: number;

  @Output() onPageChange = new EventEmitter<number>();

  protected startPage?: number;

  protected showedPages?: number;

  protected selectedPage = 1;

  protected pages: number[] = []

  ngAfterViewInit(): void {
    this.calculatePages();
  }

  protected changePage(page: number): void {
    if(page < 1) {
      page = 1
    }
    else if(page > this.totalPages!) {
      page = this.totalPages!
    }
    this.selectedPage = page;
    this.onPageChange.emit(page);
    this.calculatePages();
  }

  protected calculatePages(): void {
    if(!this.totalPages || !this.showedPageNumber) {
      return;
    }
    this.pages = [];
    this.showedPages = this.totalPages! < this.showedPageNumber! ? this.totalPages! : this.showedPageNumber!;
    const beforeSelected = Math.floor(this.showedPages / 2);
    const afterSelected = this.showedPages - beforeSelected - 1;
    if(this.selectedPage - beforeSelected < 1) {
      this.startPage = 1
    }
    else if(this.selectedPage + afterSelected > this.totalPages!) {
      this.startPage = this.totalPages! - this.showedPages + 1;
    }
    else {
      this.startPage = this.selectedPage - beforeSelected;
    }
    for(let i = this.startPage; i < this.startPage + this.showedPages; i++){
      this.pages.push(i);
    }
  }

}
