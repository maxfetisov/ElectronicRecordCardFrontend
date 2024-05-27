import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RESOURCE_URL} from "../../app.constants";
import {IUser} from "../model/user.model";
import {Page} from "../../pagination/model/pagination.model";

@Injectable({
  providedIn: "root"
})
export class UserService {

  private USER_URL = 'api/users';

  constructor(
    private http: HttpClient
  ){}

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(RESOURCE_URL.concat(this.USER_URL));
  }

  getAllInPage(pageNumber: number, pageSize: number): Observable<Page<IUser>> {
    return this.http.get<Page<IUser>>(RESOURCE_URL.concat(this.USER_URL, "/page"), {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize
      }
    });
  }

  getById(id: number): Observable<IUser> {
    return this.http.get<IUser>(RESOURCE_URL.concat(this.USER_URL, '/', String(id)));
  }

  create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(RESOURCE_URL.concat(this.USER_URL, '/register'), user);
  }

  update(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(RESOURCE_URL.concat(this.USER_URL), user);
  }

  delete(id: number, version: number): Observable<void> {
    return this.http.delete<void>(RESOURCE_URL.concat(this.USER_URL, '/', String(id)), {
      params: {
        version: version
      }
    });
  }

}
