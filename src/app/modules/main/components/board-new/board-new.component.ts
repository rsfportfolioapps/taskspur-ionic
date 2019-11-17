import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AEMode } from '../../../../models/generic.model';

@Component({
  selector: 'app-board-new',
  templateUrl: './board-new.component.html',
  styleUrls: ['./board-new.component.scss']
})
export class BoardNewComponent implements OnInit {
  public aeMode = AEMode.Add;

  @Output()
  public reloadAfterAddEmitter = new EventEmitter<boolean>();

  @Output()
  public closeEmitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

  public onCloseEmitter(event: boolean): void {
    this.closeEmitter.emit(event);
  }

  public onReloadAfterAdd(event: boolean): void {
    debugger
    this.reloadAfterAddEmitter.emit(event);
  }
}
