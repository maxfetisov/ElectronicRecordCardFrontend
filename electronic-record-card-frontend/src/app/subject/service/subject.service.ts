import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RESOURCE_URL} from "../../app.constants";
import {ISubject} from "../model/subject.model";

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

  getById(id: number): Observable<ISubject> {
    return this.http.get<ISubject>(RESOURCE_URL.concat(this.SUBJECT_URL, '/', String(id)));
  }

}
