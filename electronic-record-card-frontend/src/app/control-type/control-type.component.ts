import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {IButton, IListItem} from "../list/list.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IControlType} from "./model/control-type.model";
import {ControlTypeService} from "./service/control-type.service";
import {ViewModalComponent} from "../modal/view-modal/view-modal.component";
import {CreateUpdateModalComponent} from "../modal/create-update-modal/create-update-modal.component";

@Component({
  selector: 'app-control-type',
  standalone: true,
    imports: [
        ListComponent
    ],
  templateUrl: './control-type.component.html',
  styleUrl: './control-type.component.scss'
})
export class ControlTypeComponent implements OnInit{

  protected controlTypes?: IControlType[];
  protected listItems?: IListItem[];
  protected actions: IButton[] = [
    {
      icon: "heroEye",
      action: this.openViewModal.bind(this)
    },
    {
      icon: "heroPencil",
      action: this.openUpdateModal.bind(this)
    }
  ];


  constructor(
    private controlTypeService: ControlTypeService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.controlTypeService.getAll()
      .subscribe(controlTypes => {
        this.controlTypes = controlTypes;
        this.listItems = controlTypes.map(controlType => { return {
          id: controlType.id,
          text: controlType.title
        }});
      });
  }

  protected openViewModal(id: number): void {
    this.controlTypeService.getById(id).subscribe(controlType => {
      const modalRef = this.modalService.open(ViewModalComponent, {
        backdrop: true
      });
      modalRef.componentInstance.header = "Просмотр типа контроля";
      modalRef.componentInstance.values = {
        'Название': controlType.title
      }
    });
  }

  protected openUpdateModal(id: number): void {
    const controlType = this.controlTypes
      ?.find(element => element.id === id);
    if(!controlType) {
      return;
    }
    const modalRef = this.modalService.open(CreateUpdateModalComponent, {
      backdrop: true,
    });
    modalRef.componentInstance.header = 'Изменение типа контроля';
    modalRef.componentInstance.inputs = [{
      label: 'Название',
      name: 'title',
      type: 'text',
      value: controlType?.title
    }];
    modalRef.componentInstance.onCreateOrUpdate = (value: any) => this.update(controlType, value);
  }

  private update(oldControlType: IControlType, newControlType: any) {
    this.controlTypeService.update({
      id: oldControlType.id,
      version: oldControlType.version,
      ...newControlType
    }).subscribe(() => this.load());
  }

}
