import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RESOURCE_URL} from "../../app.constants";
import {IMark} from "../model/mark.model";

@Injectable({
  providedIn: "root"
})
export class MarkService {

  private MARK_URL = 'api/marks';

  constructor(
    private http: HttpClient
  ){}

  getAll(): Observable<IMark[]> {
    return this.http.get<IMark[]>(RESOURCE_URL.concat(this.MARK_URL));
  }

  getById(id: number): Observable<IMark> {
    return this.http.get<IMark>(RESOURCE_URL.concat(this.MARK_URL, '/', String(id)));
  }

  update(mark: IMark): Observable<IMark> {
    return this.http.put<IMark>(RESOURCE_URL.concat(this.MARK_URL), mark);
  }

}
