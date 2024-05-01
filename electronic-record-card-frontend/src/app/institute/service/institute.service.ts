import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RESOURCE_URL} from "../../app.constants";
import {IInstitute} from "../model/institute.model";

@Injectable({
  providedIn: "root"
})
export class InstituteService {

  private INSTITUTE_URL = 'api/institutes';

  constructor(
    private http: HttpClient
  ){}

  getAll(): Observable<IInstitute[]> {
    return this.http.get<IInstitute[]>(RESOURCE_URL.concat(this.INSTITUTE_URL));
  }

  getById(id: number): Observable<IInstitute> {
    return this.http.get<IInstitute>(RESOURCE_URL.concat(this.INSTITUTE_URL, '/', String(id)));
  }

}
