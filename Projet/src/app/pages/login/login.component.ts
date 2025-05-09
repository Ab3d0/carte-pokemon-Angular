import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Credentials, LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../Models/user.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  private loginSubscription:Subscription | null = null;

  loginFormGroup = this.fb.group({
    'username': ['', [Validators.required]],
    'password' : ['', [Validators.required]]

  });

  invalidCredentials = false;

  login(){
      this.loginSubscription = this.loginService.login(
        this.loginFormGroup.value as Credentials
      ).subscribe({
          next: (result: User | null | undefined) => {
            this.navigateHome();
          },
          error: error => {
            this.invalidCredentials = true;
          }
        })
  }

  navigateHome(){
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

}
