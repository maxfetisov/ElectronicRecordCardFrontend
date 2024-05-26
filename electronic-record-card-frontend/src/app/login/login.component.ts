import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AccountService} from "../account/service/account.service";
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from "../account/constants/account.constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  protected loginForm = new FormGroup({
    login: new FormControl(),
    password: new FormControl()
  })

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
  }

  protected onLogin(): void {
    this.accountService.authenticate({
      login: this.loginForm.controls.login.value,
      password: this.loginForm.controls.password.value
    })
      .subscribe({
        next: response => {
          localStorage.setItem(ACCESS_TOKEN_KEY, response.token);
          localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
          this.accountService.updateAccount();
          this.router.navigate(['']);
        },
        error: error => {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          console.error(error.message);
        }
      });
  }

}
