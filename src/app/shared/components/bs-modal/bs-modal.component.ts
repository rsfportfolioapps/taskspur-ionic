import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bs-modal',
  templateUrl: './bs-modal.component.html',
  styleUrls: ['./bs-modal.component.scss']
})
export class BsModalComponent implements OnInit {
  @Input()
  public modalId: string;

  @Input()
  public modalTitle: string = 'Add title here';

  @Input()
  public modalBtnText: string = 'Create';

  @Input()
  public maxWidth: string = '850px';

  constructor() { }

  ngOnInit(): void { }
}
