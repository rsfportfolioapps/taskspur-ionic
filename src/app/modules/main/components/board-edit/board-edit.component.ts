import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AEMode } from '../../../../models/generic.model';
import { Board } from '../../../../models/board.model';

@Component({
  selector: 'app-board-edit',
  templateUrl: './board-edit.component.html',
  styleUrls: ['./board-edit.component.scss']
})
export class BoardEditComponent implements OnInit {
  public aeMode = AEMode.Edit;

  @Input()
  public board: Board;

  @Output()
  public reloadAfterEdit = new EventEmitter<any>();

  @Output()
  public closeEmitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

  public onCloseEmitter(event: boolean): void {
    this.closeEmitter.emit(event);
  }

  public onReloadAfterEdit(event: any): void {
    this.reloadAfterEdit.emit(event);
  }
}
