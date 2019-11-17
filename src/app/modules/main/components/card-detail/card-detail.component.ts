import { Component, OnInit, Input, ViewChild, Renderer, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MainState } from '../../main.reducer';
import { boardListSelector } from '../../main.selector';
import { AEMode } from '../../../../models/generic.model';
import { MainService } from '../../main.service';
import { CommonService } from '../../../../services/common.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Card } from '../../../../models/card.model';
import * as moment from 'moment';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit, AfterViewInit {
  @Input()
  public aeMode: AEMode;

  public cardForm: FormGroup;
  public cardFormComment: FormGroup;
  public formattedBoards: any[] = [];
  public btnText: string = 'Create';
  public attachments: File[];

  constructor(private router: Router, private messageService: MessageService, private commonService: CommonService, private mainService: MainService, private store: Store<MainState>, private formBuilder: FormBuilder) {
    this.cardForm = this.formBuilder.group({
      boardId: ["", Validators.compose([Validators.required])],
      name: ["", Validators.compose([Validators.required])],
      details: [""],
      expectedCompletion: [null, Validators.compose([Validators.required])],
      status: [null],
      important: [false],
      urgent: [false],
      point: [1]
    });
  }

  ngOnInit(): void {
    this.store.pipe(select(boardListSelector)).subscribe(response => {
      if (response) {
        response.forEach(board => {
          this.formattedBoards.push({ label: board.name, value: board.id });
        });
      }
    })
  }

  ngAfterViewInit() {
  }

  public patchCardValue(card: Card): void {
    this.cardForm.get('name').patchValue(card.name);
    this.cardForm.get('details').patchValue(card.details);
    this.cardForm.get('expectedCompletion').patchValue(moment(card.expectedCompletion).format('L'));
    this.cardForm.get('important').patchValue(card.important);
    this.cardForm.get('urgent').patchValue(card.urgent);
    this.cardForm.get('status').patchValue(card.status);
    this.cardForm.get('boardId').patchValue(card.boardId);
    this.cardForm.get('point').patchValue(+card.point);

    this.btnText = 'Update';
  }

  public handlePointValue(event: number): void {
    this.cardForm.get('point').patchValue(event);
  }

  public handleAttachments(event: File[]): void {
    if (event)
      this.attachments = event;
  }

  public onSubmit(): void {
    const payload = this.cardForm.value;

    this.mainService.createCard(payload).subscribe((res) => {
      //upload attachments
      if (this.attachments.length > 0) {
        this.attachments.forEach(attachment => {
          let formData = new FormData();
          formData.append("cardId", res.id);
          formData.append("file", attachment, attachment.name);

          this.commonService.uploadCardAttachment(formData).subscribe();
        });
      }

      this.refreshReload(payload.name, 'created');
    }, () => {
      this.handleError(payload.name, 'created');
    });
  }

  private handleError(boardName: string, textName: string): void {
    this.messageService.add({ key: 't', severity: 'error', detail: `Failed to ${textName} ${boardName}.` });
  }

  private refreshReload(boardName: string, textName: string): void {
    this.messageService.add({ key: 't', severity: 'success', detail: `${boardName} is successfully ${textName}`, life: 2000 });
    setTimeout(() => {
      this.cardForm.reset();
      this.router.navigateByUrl('/cards');
    }, 500);
  }
}
