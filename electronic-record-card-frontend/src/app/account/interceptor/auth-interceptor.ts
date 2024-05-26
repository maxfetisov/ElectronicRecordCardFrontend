import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable, Provider} from "@angular/core";
import {Observable} from "rxjs";
import {ACCESS_TOKEN_KEY} from "../constants/account.constants";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if(token) {
       req = req.clone({headers: req.headers.append('Authorization', 'Bearer '.concat(token))});
    }
    return next.handle(req);
  }

}

export const authInterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true };
