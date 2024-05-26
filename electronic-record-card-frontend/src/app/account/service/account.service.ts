import {Injectable} from "@angular/core";
import {Observable, shareReplay, Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IAuthRequest, IAuthResponse} from "../model/account.model";
import {RESOURCE_URL} from "../../app.constants";
import {IUser} from "../../user/model/user.model";


@Injectable({
  providedIn: "root"
})
export class AccountService {

  private USER_URL = 'api/users';

  private $account?: Subject<IUser>;

  get account(): Subject<IUser> {
    if(!this.$account) {
      this.$account = new Subject<IUser>()
      this.getCurrentUser().subscribe(
account => this.$account?.next(account)
      );
    }
    return this.$account;
  }

  constructor(
    private http: HttpClient
  ){}

  authenticate(request: IAuthRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(RESOURCE_URL.concat(this.USER_URL, '/authenticate'), request);
  }

  getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>(RESOURCE_URL.concat(this.USER_URL, '/current'));
  }

  updateAccount(): void {
    this.getCurrentUser().subscribe(
      account => this.$account?.next(account)
    );
  }

}
