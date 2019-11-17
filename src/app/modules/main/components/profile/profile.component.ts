import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from "../../main.service";
import { environment } from "../../../../../environments/environment";
import { ToastService } from "../../../../services/toast.service";
import { CommonService } from "../../../../services/common.service";
import { ImageResponse } from "../../../../models/image.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public isSubmitting: boolean = false;
  private userId: string = '';
  public imageDisplayUrl: string;
  public blob: any;

  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: '/dashboard'
    },
    {
      text: "My Profile",
      path: ''
    }
  ];

  public profileForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private mainService: MainService,
              private cdRef: ChangeDetectorRef,
              private toastService: ToastService,
              private commonService: CommonService
              ) { 
    const emailRegex = '[a-zA-Z0-9.-_-!#$%&\'*+-/=?^_`{|}~]{1,}@[a-zA-Z.-]{2,}[.]{1}([a-zA-Z]{2,3}|(aero|coop|info|museum|name))';
    
    this.profileForm = this.formBuilder.group({
      id: [""],
      userName: [""],
      name: this.formBuilder.group({
        first: ["", Validators.compose([Validators.required])],
        last: ["", Validators.compose([Validators.required])]
      }),
      birth: this.formBuilder.group({
        date: [""]
      }),
      email: ["", Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      profilePhoto: this.formBuilder.group({
        id: [""]
      }),
      image:[null],
      ProfileImage:[null],
      location: this.formBuilder.group({
        street: [""],
        city: ["", Validators.compose([Validators.required])],
        state: ["", Validators.compose([Validators.required])],
        country: ["", Validators.compose([Validators.required])],
        postalCode: [""]
      }),
      birthDate: ["", Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void { 
    this.userId = JSON.parse(localStorage.getItem('user'))['id'];
    this.mainService.getProfile().subscribe(response => {
      this.profileForm.patchValue(<FormGroup>response);
      this.profileForm.patchValue({'birthDate': this.profileForm.value.birth.date});

      this.cdRef.detectChanges();
      //this.displayProfileImage(response.profilePhoto.id);
    });
  }

  private uploadImage(formData: any, callback: any) {
    this.commonService.uploadImage(formData).subscribe((response: ImageResponse) => {
      callback(response);
    })
  }

  public saveProfile = (image?: ImageResponse) => {   
    const payload = {
      id:  this.profileForm.value.id,
      userName:  this.profileForm.value.userName,
      name: {
        first: this.profileForm.value.name.first,
        last: this.profileForm.value.name.last
      },
      location:{
        street: this.profileForm.value.location.street,
        city: this.profileForm.value.location.city,
        state: this.profileForm.value.location.state,
        country: this.profileForm.value.location.country,
        postalCode: this.profileForm.value.location.postalCode,
        coordinates: {},
        timeZone:  {},
      },
      birth: {
        date: this.profileForm.value.birthDate
      },
      email: this.profileForm.value.email,
      profilePhoto: {
        id: image ? image.id : this.profileForm.value.profilePhoto.id
      },
      audit: {}
    };

    this.mainService.updateProfile(this.userId, payload).subscribe(() => {
      this.toastService.showToast('Profile updated sucessfully', 'success');
      this.isSubmitting = false;
    },
    () => {
      this.toastService.showToast('Failed to update profile', 'error');
      this.isSubmitting = false;
    });
  }

  public displayProfileImage(imageId: string): void {
    this.mainService.getProfileImage(imageId).subscribe(response => {
      if(response)
        this.imageDisplayUrl = `${environment.baseUrl}${environment.imageUrl}${response.fileName}`;
    })
  }

  public handleImageChange(event: any): void {
    this.blob = event;
  }

  public onSubmit(): void {
    this.isSubmitting = true;
    let formData = new FormData();

    if(this.blob) {
      formData.append("Type", "t");
      formData.append("file", this.blob, this.blob.name.split('.')[1]);
      this.uploadImage(formData, this.saveProfile);
    } else {
      this.saveProfile();
    }
  }
}
