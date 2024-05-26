import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RESOURCE_URL} from "../../app.constants";
import {IGroup} from "../model/group.model";
import {Page} from "../../pagination/model/pagination.model";

@Injectable({
  providedIn: "root"
})
export class GroupService {

  private GROUP_URL = 'api/groups';

  constructor(
    private http: HttpClient
  ){}

  getAll(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(RESOURCE_URL.concat(this.GROUP_URL));
  }

  getAllInPage(pageNumber: number, pageSize: number): Observable<Page<IGroup>> {
    return this.http.get<Page<IGroup>>(RESOURCE_URL.concat(this.GROUP_URL, "/page"), {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize
      }
    });
  }

  getById(id: number): Observable<IGroup> {
    return this.http.get<IGroup>(RESOURCE_URL.concat(this.GROUP_URL, '/', String(id)));
  }

}
