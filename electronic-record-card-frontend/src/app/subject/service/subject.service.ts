import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RESOURCE_URL} from "../../app.constants";
import {ISubject} from "../model/subject.model";
import {Page} from "../../pagination/model/pagination.model";

@Injectable({
  providedIn: "root"
})
export class SubjectService {

  private SUBJECT_URL = 'api/subjects';

  constructor(
    private http: HttpClient
  ){}

  getAll(): Observable<ISubject[]> {
    return this.http.get<ISubject[]>(RESOURCE_URL.concat(this.SUBJECT_URL));
  }

  getAllInPage(pageNumber: number, pageSize: number): Observable<Page<ISubject>> {
    return this.http.get<Page<ISubject>>(RESOURCE_URL.concat(this.SUBJECT_URL, "/page"), {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize
      }
    });
  }

  getById(id: number): Observable<ISubject> {
    return this.http.get<ISubject>(RESOURCE_URL.concat(this.SUBJECT_URL, '/', String(id)));
  }

  create(request: ISubject): Observable<ISubject> {
    return this.http.post<ISubject>(RESOURCE_URL.concat(this.SUBJECT_URL), request);
  }

  delete(id: number, version: number): Observable<void> {
    return this.http.delete<void>(RESOURCE_URL.concat(this.SUBJECT_URL, '/', String(id)), {
      params: {
        version: version
      }
    });
  }

}
