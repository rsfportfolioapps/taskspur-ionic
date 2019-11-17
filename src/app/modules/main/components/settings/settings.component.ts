import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordValidationRegex } from "../../../../shared/utils";
import { MainService } from "../../main.service";
import { ToastService } from "../../../../services/toast.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public isSubmitting: boolean = false;
  public managePasswordForm: FormGroup;

  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: '/dashboard'
    },
    {
      text: "Settings",
      path: ''
    }
  ];

  constructor(private formBuilder: FormBuilder,
              private mainService: MainService,
              private toastService: ToastService,
  ) {
    this.managePasswordForm = this.formBuilder.group({
      currentPassword: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required, Validators.pattern(passwordValidationRegex)])],
      repeatPassword: ["", Validators.compose([Validators.required, Validators.pattern(passwordValidationRegex)])],
    });

   }

  ngOnInit(): void { }

  public showPassword(event: any): void {
    if(event.type === 'text') {
      event.type = 'password';
    } else {
      event.type = 'text';
    }
  }

  public onSubmit(): void {

    const payload = {
      userId: JSON.parse(localStorage.getItem('user'))['id'],
      currentPassword:  this.managePasswordForm.value.currentPassword,
      newPassword:  this.managePasswordForm.value.password
    };

    this.mainService.accountChangePassword(payload).subscribe(() => {
      this.toastService.showToast('Password successfully changed.', 'success');
      this.isSubmitting = false;

       //clear passwords after submit
       this.managePasswordForm.reset();
    },
    () => {
      this.toastService.showToast('Change password failed. Old password is incorrect.', 'error');
      this.isSubmitting = false;

      //clear passwords after submit
      this.managePasswordForm.reset();
    });

    
  }
}
