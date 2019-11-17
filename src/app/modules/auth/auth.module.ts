import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { Routes, RouterModule, RouteReuseStrategy } from "@angular/router";
import { MessageService } from "primeng/api";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./auth.effects";
import { StoreModule } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import { RegisterComponent } from "./register/register.component";
import { CommonService } from "../../services/common.service";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../../shared/shared.module";
import { ToastService } from "../../services/toast.service";
import { ModalService } from "../../services/modal.service";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { AlertService } from "../../services/alert.service";
import { FacebookLoginComponent } from "./social-login/facebook/facebook-login.component";
import { GoogleLoginComponent } from "./social-login/google/google-login.component";

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgot-password", component: ForgotPasswordComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    FacebookLoginComponent,
    GoogleLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    SharedModule,

    RouterModule.forChild(routes),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature("auth", fromAuth.authReducer)
  ],
  exports: [LoginComponent, RegisterComponent, ForgotPasswordComponent],
  providers: [
    MessageService,
    CommonService,
    ToastService,
    ModalService,
    AlertService
  ]
})
export class AuthModule {}
