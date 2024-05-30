import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable, Provider} from "@angular/core";
import {catchError, Observable, Subject, switchMap} from "rxjs";
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from "../constants/account.constants";
import {AccountService} from "../service/account.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor {

  private authExceptions = ['/authenticate', '/refresh'];

  private isRefreshing = false;

  private $refresh = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.updateRequest(req)).pipe(
      catchError((err) => {
        if(err.status === 401) {
          const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
          if(this.authExceptions.some(element => req.url.endsWith(element))
            || !refreshToken) {
            throw err
          }
          if(!this.isRefreshing) {
            this.isRefreshing = true;
            this.accountService.refresh({
              refreshToken: refreshToken
            }).subscribe(res => {
              localStorage.setItem(ACCESS_TOKEN_KEY, res.token);
              localStorage.setItem(REFRESH_TOKEN_KEY, res.refreshToken);
              this.$refresh.next();
              this.isRefreshing = false;
            });
          }
          return this.$refresh.pipe(
            switchMap(() => next.handle(this.updateRequest(req))),
            catchError(err => {
              this.logout();
              throw err;
            })
          )
        }
        else if(err.status === 403) {
          this.logout();
        }
        throw err;
      })
    );
  }

  private updateRequest(req: HttpRequest<any>): HttpRequest<any> {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token && !this.authExceptions.some(element => req.url.endsWith(element))) {
      req = req.clone({headers: req.headers.append('Authorization', 'Bearer '.concat(token))});
    }
    return req;
  }

  private logout(): void {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }

}

export const authInterceptorProvider: Provider =
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true};
