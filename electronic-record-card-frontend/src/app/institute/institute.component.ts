import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {InstituteService} from "./service/institute.service";
import {IInstitute} from "./institute.model";
import {IButton, IListItem} from "../list/list.model";

@Component({
  selector: 'app-institute',
  standalone: true,
  imports: [
    ListComponent
  ],
  templateUrl: './institute.component.html',
  styleUrl: './institute.component.scss'
})
export class InstituteComponent implements OnInit{

  protected institutes?: IInstitute[];
  protected listItems?: IListItem[];
  protected actions: IButton[] = [
    {
      icon: "heroEye",
      action: () => {}
    },
    {
      icon: "heroPencil",
      action: () => {}
    },
    {
      icon: "heroTrash",
      action: () => {}
    }
  ];
  protected addAction: IButton = {
    icon: "heroPlus",
    action: () => {}
  };


  constructor(
    private instituteService: InstituteService
  ) {
  }

  ngOnInit(): void {
    this.instituteService.getAll()
      .subscribe(institutes => {
        this.institutes = institutes;
        this.listItems = institutes.map(institute => { return {
          id: institute.id,
          text: institute.name,
          additionalText: institute.fullName
        }});
      });
  }

}
