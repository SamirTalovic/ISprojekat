import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard, authGuard } from './services/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { AranzmaniComponent } from './components/aranzmani/aranzmani.component';
import { CreateeComponent } from './components/create/create.component';
import { MojekarteComponent } from './components/mojekarte/mojekarte.component';
import { MojiaranzmaniComponent } from './components/mojiaranzmani/mojiaranzmani.component';
import { MojeuslugeComponent } from './components/mojeusluge/mojeusluge.component';
import { KreirajusluguComponent } from './components/kreirajuslugu/kreirajuslugu.component';
import { ChoosehotelComponent } from './components/choosehotel/choosehotel.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path: "",
    redirectTo:'login',
    pathMatch: 'full'
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "aranzman",
    component: AranzmaniComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "create",
    component: CreateeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "mojekarte",
    component: MojekarteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "mojiaranzmani",
    component: MojiaranzmaniComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "mojeusluge",
    component: MojeuslugeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "kreirajuslugu",
    component: KreirajusluguComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'choose-hotel/:uslugaId/:destinacija',
    component: ChoosehotelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
