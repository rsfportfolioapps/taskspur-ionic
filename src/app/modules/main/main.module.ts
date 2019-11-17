import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';
import { SharedModule } from "../../shared/shared.module";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { CardsComponent } from "./components/cards/cards.component";
import { FinanceComponent } from "./components/finance/finance.component";
import { GamesComponent } from "./components/games/games.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { SupportTicketsComponent } from "./components/support-tickets/support-tickets.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ToastService } from "../../services/toast.service";
import { SettingsComponent } from "./components/settings/settings.component";
import { BoardsComponent } from "./components/boards/boards.component";
import { HelpComponent } from "./components/help/help.component";
import { BoardMemberComponent } from "./components/board-member/board-member.component";
import { BoardDetailComponent } from "./components/board-detail/board-detail.component";
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from "primeng/toast";
import { CardComponent } from "./components/card/card.component";
import { BoardComponent } from "./components/board/board.component";
import { CardDetailComponent } from "./components/card-detail/card-detail.component";
import { BoardNewComponent } from "./components/board-new/board-new.component";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { BoardEditComponent } from "./components/board-edit/board-edit.component";
import { StoreModule } from "@ngrx/store";
import * as fromMain from './main.reducer';
import { MainEffects } from "./main.effects";
import { EffectsModule } from "@ngrx/effects";
import { CardNewComponent } from "./components/card-new/card-new.component";


export const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "notifications",
    component: NotificationsComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "calendar",
    component: CalendarComponent
  },
  {
    path: "cards",
    component: CardsComponent
  },
  {
    path: "boards",
    component: BoardsComponent
  },
  {
    path: "new-board",
    component: BoardNewComponent
  },
  {
    path: "edit-board/:id",
    component: BoardEditComponent
  },
  {
    path: "new-card",
    component:CardNewComponent
  },
  {
    path: "games",
    component: GamesComponent
  },
  {
    path: "finance",
    component: FinanceComponent
  },
  {
    path: "support-tickets",
    component: SupportTicketsComponent
  },
  {
    path: "settings",
    component: SettingsComponent
  },
  {
    path: "help",
    component: HelpComponent
  }
];


@NgModule({
  declarations: [
    DashboardComponent,
    CalendarComponent,
    CardsComponent,
    FinanceComponent,
    GamesComponent,
    NotificationsComponent,
    SupportTicketsComponent,
    ProfileComponent,
    SettingsComponent,
    BoardsComponent,
    HelpComponent,
    BoardMemberComponent,
    BoardDetailComponent,
    CardComponent,
    BoardComponent,
    CardDetailComponent,
    BoardNewComponent,
    BoardEditComponent,
    CardNewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),

    SharedModule,
    InputSwitchModule,
    ConfirmDialogModule,
    ToastModule,

    RouterModule.forChild(routes),
    StoreModule.forFeature('main', fromMain.mainReducer),
    EffectsModule.forFeature([MainEffects])
  ],
  exports: [
    DashboardComponent,
    CalendarComponent,
    CardsComponent,
    FinanceComponent,
    GamesComponent,
    NotificationsComponent,
    SupportTicketsComponent,
    ProfileComponent,
    SettingsComponent,
    BoardsComponent,
    HelpComponent,
    BoardMemberComponent,
    CardComponent,
    BoardComponent,
    CardDetailComponent,
    BoardDetailComponent,
    BoardNewComponent,
    BoardEditComponent,
    CardNewComponent
  ],
  providers: [AuthService, ToastService, ConfirmationService]
})
export class MainModule { }
