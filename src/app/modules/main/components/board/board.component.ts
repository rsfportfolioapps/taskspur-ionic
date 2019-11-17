import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import * as Chart from 'chart.js'
import { Board } from '../../../../models/board.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MainService } from '../../main.service';
import { AEMode } from '../../../../models/generic.model';
import { Store } from '@ngrx/store';
import { BoardsAction } from '../../main.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {
  @Input()
  public board: Board;
  @Input()
  public aeMode = AEMode.Edit;

  public canvas: any;
  public ctx: any;
  public myChart: any = [];

  @ViewChild('myChart') canvasRef: ElementRef;

  @Output()
  public deleteEmitter = new EventEmitter<boolean>();

  constructor(private store: Store<MainService>, private mainService: MainService, private confirmationService: ConfirmationService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');

    let gradients = [];
    const gradient = this.ctx.createLinearGradient(0, 0, 180, 180);
    gradient.addColorStop(0, '#FF6060');
    gradient.addColorStop(1, '#FFA960');
    gradients.push(gradient);

    this.myChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [80, 20],
          backgroundColor: gradients,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        cutoutPercentage: 70,
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });

    this.cdRef.detectChanges();
  }

  public onDelete(event: number): void {
    this.confirmationService.confirm({
      key: 'bc',
      message: 'Are you sure you want to delete this board?',
      accept: () => {
        this.mainService.deleteBoard(event).subscribe(res => {
          if (res.success == true) 
            this.deleteEmitter.emit(true);

            //TODO: create an abstract class to hold common refresh
            this.mainService.getBoards().subscribe(response => {
              this.store.dispatch(new BoardsAction({ boards: response }));
            });
        });
      },
      reject: () => { }
    });
  }

  public getPadding(str: string): string {
    let cls: string;
    if (str.length > 30) {
      cls = 'r-l-p';
    }
    if (str.length > 50) {
      cls = 'm-l-p';
    }
    if (str.length < 25) {
      cls = 'o-l-p';
    }
    return cls;
  }

  public onDisplayMembers(): void { }
}
