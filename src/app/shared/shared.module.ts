import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CompareDirective } from "./directives/password.directive";
import { PrivacyPolicyComponent } from "./components/privacy-policy/privacy-policy.component";
import { IonicModule } from "@ionic/angular";
import { TermsConditionComponent } from "./components/terms-condition/terms-condition.component";
import { TermsPolicyPageComponent } from "./components/terms-policy-page/terms-policy-page.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UnderconstructionComponent } from "./components/underconstruction/underconstruction.component";
import { BreadcrumbsComponent } from "./components/breadcrumbs/breadcrumbs.component";
import { ImageUploadComponent } from "./components/image-upload/image-upload.component";
import { DialogModule } from "primeng/dialog";
import { ImageCropperModule } from "ng2-img-cropper";
import { FileValueAccessor } from "./directives/file.directive";
import { DndDirective } from "./directives/dnd.directive";
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { PopoverMenuComponent } from "./components/popover-menu/popover-menu.component";
import { GoogleSVGComponent } from "./svg/google/google.component";
import { FacebookSVGComponent } from "./svg/facebook/facebook.component";
import { BaseModalComponent } from "./components/modal/base-modal.component";
import { DropdownSelectFilterComponent } from "./components/dropdown-select-filter/dropdown-select-filter.component";
import { MultiSelectModule } from 'primeng/multiselect';
import { SearchComponent } from "./components/search/search.component";
import { BsModalComponent } from "./components/bs-modal/bs-modal.component";
import { DatepickerComponent } from "./components/datepicker/datepicker.component";
import { DropdownComponent } from "./components/dropdown/dropdown.component";
import { NoRouteComponent } from "./components/no-route/no-route.component";
import { RadioOfDifficultyComponent } from "./components/radio-of-difficulty/radio-of-difficulty.component";
import { EmailValidatorDirective } from "./directives/email.directive";
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import { QuillComponent } from "./components/quill-editor/quill-editor.component";
import { QuillModule } from "ngx-quill";
import { AttachmentComponent } from "./components/attachment/attachment.component";
import { ConfirmationModalComponent } from "./components/confirmation-modal/confirmation-modal.component";
import { PopoverNotificationComponent } from './components/popover-notification/popover-notification.component';

const primengModules = [MultiSelectModule, DialogModule, CalendarModule, DropdownModule, RadioButtonModule]

@NgModule({
  declarations: [
    CompareDirective,
    PrivacyPolicyComponent,
    TermsPolicyPageComponent,
    TermsConditionComponent,
    SidebarComponent,
    UnderconstructionComponent,
    BreadcrumbsComponent,
    ImageUploadComponent,
    FileValueAccessor,
    DndDirective,
    NavHeaderComponent,
    PopoverMenuComponent,
    GoogleSVGComponent,
    FacebookSVGComponent,
    BaseModalComponent,
    DropdownSelectFilterComponent,
    SearchComponent,
    BsModalComponent,
    DatepickerComponent,
    DropdownComponent,
    NoRouteComponent,
    RadioOfDifficultyComponent,
    EmailValidatorDirective,
    QuillComponent,
    AttachmentComponent,
    ConfirmationModalComponent,
    PopoverNotificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    QuillModule,
    ...primengModules,
    ImageCropperModule
  ],
  exports: [
    CompareDirective,
    PrivacyPolicyComponent,
    TermsPolicyPageComponent,
    TermsConditionComponent,
    SidebarComponent,
    UnderconstructionComponent,
    BreadcrumbsComponent,
    ImageUploadComponent,
    NavHeaderComponent,
    PopoverMenuComponent,
    GoogleSVGComponent,
    FacebookSVGComponent,
    BaseModalComponent,
    DropdownSelectFilterComponent,
    SearchComponent,
    BsModalComponent,
    DatepickerComponent,
    DropdownComponent,
    NoRouteComponent,
    RadioOfDifficultyComponent,
    EmailValidatorDirective,
    QuillComponent,
    AttachmentComponent,
    ConfirmationModalComponent,
    PopoverNotificationComponent
  ],
  entryComponents: [
    PrivacyPolicyComponent,
    TermsPolicyPageComponent,
    TermsConditionComponent,
    SidebarComponent,
    ImageUploadComponent,
    NavHeaderComponent,
    PopoverMenuComponent,
    DropdownSelectFilterComponent,
    PopoverNotificationComponent
  ],
  providers: []
})
export class SharedModule { }
