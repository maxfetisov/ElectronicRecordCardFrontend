import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RESOURCE_URL} from "../../app.constants";
import {IInstitute} from "../model/institute.model";
import {Page} from "../../pagination/model/pagination.model";

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

  getAllInPage(pageNumber: number, pageSize: number): Observable<Page<IInstitute>> {
    return this.http.get<Page<IInstitute>>(RESOURCE_URL.concat(this.INSTITUTE_URL, "/page"), {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize
      }
    });
  }

  getById(id: number): Observable<IInstitute> {
    return this.http.get<IInstitute>(RESOURCE_URL.concat(this.INSTITUTE_URL, '/', String(id)));
  }

  create(institute: IInstitute): Observable<IInstitute> {
    return this.http.post<IInstitute>(RESOURCE_URL.concat(this.INSTITUTE_URL), institute);
  }

  delete(id: number, version: number): Observable<void> {
    return this.http.delete<void>(RESOURCE_URL.concat(this.INSTITUTE_URL, '/', String(id)), {
      params: {
        version: version
      }
    });
  }

}
