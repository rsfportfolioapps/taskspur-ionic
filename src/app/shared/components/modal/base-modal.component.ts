import {Component, OnInit, Input, Output, EventEmitter, HostListener} from "@angular/core";

@Component({
  selector: "app-base-modal",
  templateUrl: "./base-modal.component.html",
  styleUrls: ["./base-modal.component.scss"]
})
export class BaseModalComponent implements OnInit {
  @Input()
  public showModal: boolean = false;
  @Input()
  public headerText: string = "Header Text Here";
  @Input()
  public positionTop: number = 20;
  @Input()
  public displayFooter: boolean = true;
  @Input()
  public btnNewText: string = 'New';
  @Input()
  public btnCloseText: string = 'Close';
  @Input()
  public displayClose: boolean = true;
  @Input()
  public displayNew: boolean = true;
  @Input()
  public style: any;

  @Output()
  public closeModal = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  public onClose(): void {
    this.showModal = false;
    this.closeModal.emit(this.showModal);
  }

  @HostListener("document:keydown.escape", ["$event"])
  onKeydownHandler(event: KeyboardEvent) {
    event.preventDefault();
    if(document.querySelector('.ts_modal')) {
      this.showModal = false;
      this.closeModal.emit(this.showModal);
    }
  }
}
