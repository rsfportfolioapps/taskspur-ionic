import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Input()
  public modalId: string;

  @Input()
  public modalTitle: string = 'Add title here';

  @Input()
  public modalBtnText: string = 'Create';

  constructor() { }

  ngOnInit(): void { }
}
