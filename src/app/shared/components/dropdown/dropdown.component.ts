import { Component, OnInit, Input } from "@angular/core";
import { DropdownItems } from "../../../models/dropdown.model";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent implements OnInit {
  @Input()
  public tabIndex: number = 0;

  @Input()
  public parentForm: FormGroup;

  @Input()
  public controlName: any;

  @Input()
  public label: string = "Your Label Here";

  @Input()
  public placeholder: string = "Your Placeholder Here";

  @Input()
  public items: DropdownItems;

  constructor() {}

  ngOnInit(): void {}

  public onChange(event: any): void { 
    this.parentForm.get(this.controlName).setValue(new Date(event));
  }
}
