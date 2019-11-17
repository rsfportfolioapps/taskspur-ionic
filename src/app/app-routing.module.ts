import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardLayoutComponent } from './pages/dashboard/dashboard-layout.component';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  
  {
    path: "",
    component: DashboardLayoutComponent,
    loadChildren: "./modules/main/main.module#MainModule",
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
