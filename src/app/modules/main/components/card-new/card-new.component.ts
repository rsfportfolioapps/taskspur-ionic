import { Component, OnInit } from '@angular/core';
import { AEMode } from '../../../../models/generic.model';

@Component({
  selector: 'app-card-new',
  templateUrl: './card-new.component.html',
  styleUrls: ['./card-new.component.scss']
})
export class CardNewComponent implements OnInit {
  public aeMode = AEMode.Add;

  constructor() { }

  ngOnInit(): void { }
}
