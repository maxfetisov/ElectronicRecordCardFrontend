import {Injectable} from "@angular/core";
import {combineLatest, forkJoin, map, Observable, ReplaySubject, shareReplay, Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IAuthRequest, IAuthResponse, IChangePasswordRequest, IRole, Role} from "../model/account.model";
import {RESOURCE_URL} from "../../app.constants";
import {IUser} from "../../user/model/user.model";


@Injectable({
  providedIn: "root"
})
export class AccountService {

  private USER_URL = 'api/users';

  private ROLE_URL = 'api/roles';

  private $account?: Subject<IUser | undefined>;

  private $roles?: Subject<(IRole | undefined)[] | undefined>;

  get account(): Subject<IUser | undefined> {
    if (!this.$account) {
      this.$account = new ReplaySubject<IUser | undefined>()
      this.updateAccount();
    }
    return this.$account;
  }

  get roles(): Subject<(IRole | undefined)[] | undefined> {
    if (!this.$roles) {
      this.$roles = new ReplaySubject<(IRole | undefined)[] | undefined>();
      this.updateRoles();
    }
    return this.$roles;
  }

  constructor(
    private http: HttpClient
  ) {
  }

  authenticate(request: IAuthRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(RESOURCE_URL.concat(this.USER_URL, '/authenticate'), request);
  }

  changePassword(request: IChangePasswordRequest): Observable<void> {
    return this.http.post<void>(RESOURCE_URL.concat(this.USER_URL, '/change-password'), request);
  }

  getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>(RESOURCE_URL.concat(this.USER_URL, '/current'));
  }

  getRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>(RESOURCE_URL.concat(this.ROLE_URL));
  }

  logout(): Observable<void> {
    this.$account?.next(undefined);
    return this.http.post<void>(RESOURCE_URL.concat(this.USER_URL, '/logout'), {});
  }

  updateAccount(): void {
    this.getCurrentUser().subscribe(
      account => this.$account?.next(account)
    );
  }

  updateRoles(): void {
    combineLatest([this.account, this.getRoles()])
      .subscribe(
        ([account, roles]) => {
          this.roles.next(account?.roles
            ?.map(roleId => roles.find(role => role.id === roleId)));
        }
      );
  }

}
