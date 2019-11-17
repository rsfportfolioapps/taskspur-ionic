import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {
  @Input()
  public parentForm: FormGroup;

  @Output()
  public attachmentsEmitter = new EventEmitter<File[]>();

  public files: File[] = [];
  public fileExt: string;
  public defaultBgUrl: string = 'https://via.placeholder.com/150';

  constructor() { }

  public onRemove(file: File): void {
    _.remove(this.files, (item) => { return item === file });
  }

  public browseAttachment(e: any): void {
    let attachment = e.target.files[0];

    attachment['ext'] = `.${attachment.type.split("/")[1]}`;

    const isImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (isImageTypes.includes(attachment.type)) {
      const reader: FileReader = new FileReader();
      reader.onloadend = (e: any) => {
        attachment['preview'] = e.target.result;
      };
      reader.readAsDataURL(attachment);
    }

    this.files.push(attachment);
    if (this.files.length > 0) {
      this.attachmentsEmitter.emit(this.files);
    }
  }

  ngOnInit(): void {
  }

}
