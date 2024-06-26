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

  create(group: IGroup): Observable<IGroup> {
    return this.http.post<IGroup>(RESOURCE_URL.concat(this.GROUP_URL), group);
  }

  update(group: IGroup): Observable<IGroup> {
    return this.http.put<IGroup>(RESOURCE_URL.concat(this.GROUP_URL), group);
  }

  delete(id: number, version: number): Observable<void> {
    return this.http.delete<void>(RESOURCE_URL.concat(this.GROUP_URL, '/', String(id)), {
      params: {
        version: version
      }
    })
  }

}
