import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-terms-policy-page',
  templateUrl: './terms-policy-page.component.html',
  styleUrls: ['./terms-policy-page.component.scss']
})
export class TermsPolicyPageComponent implements OnInit {
  public options:  0 | 1 = 0;
  constructor(public modalService: ModalService) { }

  ngOnInit(): void { }
}
