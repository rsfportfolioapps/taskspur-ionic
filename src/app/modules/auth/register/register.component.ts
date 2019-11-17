import { Component, OnInit, Renderer, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DropdownItems } from "../../../models/dropdown.model";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { Store } from "@ngrx/store";
import { AuthState } from "../auth.reducer";
import { CommonService } from "../../../services/common.service";
import { Register } from "../auth.actions";
import { tap } from "rxjs/operators";
import { ToastService } from "../../../services/toast.service";
import { ModalService } from "../../../services/modal.service";
import { TermsPolicyPageComponent } from "../../../shared/components/terms-policy-page/terms-policy-page.component";
import { emailValidationRegex, passwordValidationRegex } from "../../../shared/utils";
import { toastMessages } from "../../../shared/constants";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public countries: DropdownItems[];
  public isSubmitting: boolean = false;
  public showTermsCondition: boolean = false;
  public showPrivacyPolicy: boolean = false;
  public hasError: boolean = false;
  public errorMsg: string = "";
  public isEmailTaken: boolean = false;

  constructor(
    private toastService: ToastService,
    private renderer: Renderer,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private store: Store<AuthState>,
    public modalService: ModalService,
    private messageService: MessageService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.pattern(emailValidationRegex)])],
      password: ["", Validators.compose([Validators.required, Validators.pattern(passwordValidationRegex)])],
      repeatPassword: ["", Validators.compose([Validators.required, Validators.pattern(passwordValidationRegex)])],
      termsPolicy: [null, Validators.compose([Validators.required])]
    });

    // this.modalService.change.subscribe(isAccepted => {
    //   this.registerForm.get('termsPolicy').patchValue(isAccepted);
    // });
  }

  ngOnInit(): void {
  }

  public showPassword(event: any): void {
    if (event.type === 'text') {
      event.type = 'password';
    } else {
      event.type = 'text';
    }
  }

  public onAgreeToTermsPolicy(): void {
    this.registerForm.get('termsPolicy').setValue(!this.registerForm.get('termsPolicy').value)
  }

  public showTermsPolicy() {
    // this.modalService.showModal(TermsPolicyPageComponent);

  }

  public onRegister(): void {
    const payload = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
    this.isSubmitting = true;

    this.auth.register(payload).pipe(tap(() => {
      this.isSubmitting = false;
      this.hasError = false;

      this.store.dispatch(new Register({ isRegistered: true }));
      this.messageService.add({ key: 'ts', severity: 'warn', summary: toastMessages.registerSuccess, life: 3000 });
      setTimeout(() => {
        this.router.navigateByUrl("/login");
      }, 1500);
    })
    )
      .subscribe(() => { },
        () => {
          this.isSubmitting = false;
          this.messageService.add({ key: 'ts', severity: 'warn', summary: toastMessages.registerError, life: 3000 });
        });
  }

  @ViewChild('email') input: ElementRef;
  public onClear(): void {
    this.registerForm.controls['email'].setValue('');
    this.registerForm.get('email').markAsPristine();
    this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
  }

  public checkEmail() {
    this.isEmailTaken = false;
    if (this.registerForm.get('email').valid) {
      this.auth.checkEmail(this.registerForm.get('email').value).subscribe(response => {
        this.isEmailTaken = response.accountExist;
      });
    }
  }

}

