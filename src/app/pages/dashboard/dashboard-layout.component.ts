import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { MainService } from "../../modules/main/main.service";
import { MainState } from "../../modules/main/main.reducer";
import { Store } from "@ngrx/store";
import { BoardsAction, CardAction } from "../../modules/main/main.actions";

@Component({
  selector: "app-dashboard-layout",
  templateUrl: "./dashboard-layout.component.html",
  styleUrls: ["./dashboard-layout.component.scss"]
})
export class DashboardLayoutComponent implements OnInit {

  constructor(private mainService: MainService, private store: Store<MainState>, private menu: MenuController) {
    this.closeSidebar();
  }

  ngOnInit() {
    //load lists to ngrx
    this.mainService.getBoards().subscribe(response => {
      this.store.dispatch(new BoardsAction({ boards: response }));
    });

    this.mainService.getCards().subscribe(response => {
      this.store.dispatch(new CardAction({ cards: response }));
    });
  }

  public closeSidebar() {
    this.menu.close('sidebar');
  }

}
