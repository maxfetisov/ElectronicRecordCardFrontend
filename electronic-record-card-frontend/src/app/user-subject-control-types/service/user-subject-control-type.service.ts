import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RESOURCE_URL} from "../../app.constants";
import {IUserSubjectControlType} from "../model/user-subject-control-type.model";

@Injectable({
  providedIn: "root"
})
export class UserSubjectControlTypeService {

  private USER_SUBJECT_CONTROL_TYPE_URL = 'api/user-subject-control-types';

  constructor(
    private http: HttpClient
  ){}

  getByCriteria(request: any): Observable<IUserSubjectControlType[]> {
    return this.http.post<IUserSubjectControlType[]>(RESOURCE_URL.concat(this.USER_SUBJECT_CONTROL_TYPE_URL, '/filter'), request);
  }

  create(userSubjectControlType: IUserSubjectControlType): Observable<IUserSubjectControlType> {
    return this.http.post<IUserSubjectControlType>(RESOURCE_URL.concat(this.USER_SUBJECT_CONTROL_TYPE_URL), userSubjectControlType);
  }

  update(userSubjectControlType: IUserSubjectControlType): Observable<IUserSubjectControlType> {
    return this.http.put<IUserSubjectControlType>(RESOURCE_URL.concat(this.USER_SUBJECT_CONTROL_TYPE_URL), userSubjectControlType);
  }

  delete(id: number, version: number): Observable<void> {
    return this.http.delete<void>(RESOURCE_URL.concat(this.USER_SUBJECT_CONTROL_TYPE_URL, '/', String(id)), {
      params: {
        version: version
      }
    });
  }

}
