import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RESOURCE_URL} from "../../app.constants";
import {IInstitute} from "../institute.model";

@Injectable({
  providedIn: "root"
})
export class InstituteService {

  private INSTITUTE_URL = 'api/institutes';

  constructor(
    public http: HttpClient
  ){}

  getAll(): Observable<IInstitute[]> {
    return this.http.get<IInstitute[]>(RESOURCE_URL.concat(this.INSTITUTE_URL));
  }

}
