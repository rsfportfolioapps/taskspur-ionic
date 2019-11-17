import { Component, OnInit, Input } from '@angular/core';
import { Card, CardPoint } from '../../../../models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  public cards: Card[];

  public cardPoints: any[] = [];

  constructor() { }

  ngOnInit(): void { 
    this.getCardPoints().forEach(el => {
      if(el)
        this.cardPoints.push({ id: CardPoint[el], value: el });
    });
  }

  public getCardPoints(): Array<string> {
    const keys = Object.keys(CardPoint);
    return keys.slice(keys.length / 2);
  }
}
