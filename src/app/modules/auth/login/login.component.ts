import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Login } from '../auth.actions';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { MessageService } from 'primeng/api';
import { toastMessages, customRegexPattern } from '../../../shared/constants';

@Component({
  selector: 'lpa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isSubmitting: boolean = false;
  public hasError: boolean = false;
  public errorMsg: string = '';

  @ViewChild('username') input: ElementRef;

  constructor(private messageService: MessageService, private renderer: Renderer, private router: Router, private store: Store<AppState>, private auth: AuthService, private formBuilder: FormBuilder) {

    this.loginForm = this.formBuilder.group({
      username: ["reynelfuertes@gmail.com", Validators.compose([Validators.required, Validators.pattern(customRegexPattern.email)])],
      password: ["p@55w0rd", Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
    
  }

  public onLogin(): void {
    const credentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.isSubmitting = true;

    this.auth.login(credentials).pipe(tap(user => {
      this.isSubmitting = false;

      this.store.dispatch(new Login({ user }));
      this.router.navigateByUrl('/dashboard'); //not yet implemented
    })
    ).subscribe(() => { },
      (error) => {
        this.isSubmitting = false;
        this.messageService.add({ key: 'ts', severity: 'warn', summary: toastMessages.loginError, life: 3000 });
      });
  }

  public showPassword(event: any): void {
    if (event.type === 'text') {
      event.type = 'password';
    } else {
      event.type = 'text';
    }
  }

  public onClear(): void {
    this.loginForm.controls['username'].setValue('');
    this.loginForm.get('username').markAsPristine();
    this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
  }
}
