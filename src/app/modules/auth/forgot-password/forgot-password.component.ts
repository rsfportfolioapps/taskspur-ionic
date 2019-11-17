import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertService } from '../../../services/alert.service';
import { ToastService } from '../../../services/toast.service';
import { toastMessages, customRegexPattern } from '../../../shared/constants';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;
  public isSubmitting: boolean = false;
  public success: boolean = false;
  public hasInputValue: boolean = false;
  private inputEmail: string = '';
  
  constructor(private alertService: AlertService, 
              private toastService: ToastService, 
              private renderer: Renderer, 
              private formBuilder: FormBuilder, 
              private router: Router,
              private auth: AuthService, 
              private messageService: MessageService) {
    
    this.forgotPasswordForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.pattern(customRegexPattern.email)])],
    });
   }

  ngOnInit(): void { }

  public onSubmit(): void {
    const email = this.forgotPasswordForm.value.email

    this.isSubmitting = true;

    this.auth.forgotPassword(email).subscribe(response => {
      if(response) {
        this.success = true;
        this.isSubmitting = false;
      }
    }, error => {
      this.forgotPasswordForm.controls['email'].setErrors({'incorrect': true});
      this.messageService.add({ key: 'ts', severity: 'warn', summary: toastMessages.forgotPasswordError, life: 3000 });
      this.isSubmitting = false;
    })
  }
 
  public onClear(event: any): void {
    this.forgotPasswordForm.controls['email'].setValue('');
    this.forgotPasswordForm.get('email').markAsPristine();
    this.hasInputValue = false;
    event.setFocus();
  }

  public onChange(event: any): void {
    if(event.value.length > 0) {
      this.hasInputValue = true;
    } else {
      this.hasInputValue = false;
    }
  }

  public validateEmailLength(event: any) {
    this.inputEmail = this.forgotPasswordForm.get('email').value;
    if((this.inputEmail.length > 64 && this.inputEmail.indexOf('@') < 0 ) || this.inputEmail.length > 320) {
      this.toastService.showToast('Exceeded maximum character limit.','error');
      event.preventDefault();
    }
  }

 
}
