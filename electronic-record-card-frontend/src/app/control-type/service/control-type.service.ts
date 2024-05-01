import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RESOURCE_URL} from "../../app.constants";
import {IControlType} from "../model/control-type.model";

@Injectable({
  providedIn: "root"
})
export class ControlTypeService {

  private CONTROL_TYPE_URL = 'api/control-types';

  constructor(
    private http: HttpClient
  ){}

  getAll(): Observable<IControlType[]> {
    return this.http.get<IControlType[]>(RESOURCE_URL.concat(this.CONTROL_TYPE_URL));
  }

  getById(id: number): Observable<IControlType> {
    return this.http.get<IControlType>(RESOURCE_URL.concat(this.CONTROL_TYPE_URL, '/', String(id)));
  }

}
