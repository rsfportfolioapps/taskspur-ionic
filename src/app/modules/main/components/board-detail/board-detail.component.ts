import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { MainService } from '../../main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AEMode } from '../../../../models/generic.model';
import { Board } from '../../../../models/board.model';
import { Store } from '@ngrx/store';
import { BoardsAction } from '../../main.actions';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss']
})
export class BoardDetailComponent implements OnInit {
  @Input()
  public aeMode: AEMode;
  @Input()
  public board: Board;

  public boardForm: FormGroup;
  public attachmentForm: FormGroup;
  public btnText: string = 'Create';

  constructor(private route: ActivatedRoute, private router: Router, private mainService: MainService, private formBuilder: FormBuilder) {
    this.boardForm = this.formBuilder.group({
      id: [""],
      name: ["", Validators.compose([Validators.required])],
      details: ["", Validators.compose([Validators.required])],
      important: [false],
      urgent: [false]
    });

    this.attachmentForm = this.formBuilder.group({
      attachments: new FormArray([this.formBuilder.group({
        fileDoc: [null]
      })])
    });

  }

  ngOnInit(): void {
    if (this.aeMode === AEMode.Edit) {
      const id = +this.route.snapshot.paramMap.get("id");
      this.mainService.getBoard(id).subscribe(res => this.boardForm.patchValue(res));

      this.btnText = 'Update';
    }
  }

  public onSubmit(): void {
    if (this.aeMode === AEMode.Add) {
      this.mainService.createBoard(this.boardForm.value).subscribe();
    } else {
      this.mainService.updateBoard(this.boardForm.value).subscribe()
    }

    setTimeout(() => {
      this.router.navigateByUrl('/boards');
    }, 500);
  }

  private updateStore(): void {

  }
}
