import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  @Input()
  public minDateValue: Date;
  @Input()
  public maxDateValue: Date; 
  @Input()
  public parentForm: FormGroup;
  @Input()
  public controlName: any;
  @Input()
  public label: string;
  @Input()
  public backgroundColor: string;
  @Input()
  public tabindex: number = 0;
  @Input()
  public placeholder: string = 'mm/dd/yyyy';
  @Input()
  public customFormat: string = 'mm/dd/yy';
  @Input()
  public errorText: string = 'Place your customer error text here';
  @Input()
  public inputStyleClass: string = 'bg-color-white';

  @Output()
  public isValid = new EventEmitter<boolean>();

  @Input() public tabIndex: number = 0;

  @ViewChild('calendar')
  public calendar: any;

  constructor() { }

  ngOnInit() {
    //string needs to be converted to javascript date before passing it to p-calendar
    if(this.parentForm.get(this.controlName).value) {
      this.parentForm.get(this.controlName).patchValue(new Date((this.parentForm.get(this.controlName).value)));
    }
  }

  public onChange(event: any): void { 
    this.parentForm.get(this.controlName).setValue(new Date(event));
  }

  public openCalendar(event: any) {
    this.calendar.showOverlay(this.calendar.inputfieldViewChild.nativeElement);
    event.stopPropagation();
  }
}
