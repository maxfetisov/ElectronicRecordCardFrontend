import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RESOURCE_URL} from "../../app.constants";
import {IStatement} from "../model/statement.model";

@Injectable({
  providedIn: "root"
})
export class StatementService {

  private STATEMENT_URL = 'api/export';

  constructor(
    private http: HttpClient
  ){}

  export(groupId: number, subjectId: number): Observable<IStatement[]> {
    return this.http.get<IStatement[]>(RESOURCE_URL.concat(this.STATEMENT_URL), {
      params: {
        groupId: groupId,
        subjectId: subjectId
      }
    });
  }

}
