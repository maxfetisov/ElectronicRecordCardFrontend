import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RESOURCE_URL} from "../../app.constants";
import {IUser} from "../model/user.model";

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

  getById(id: number): Observable<IUser> {
    return this.http.get<IUser>(RESOURCE_URL.concat(this.USER_URL, '/', String(id)));
  }

}
