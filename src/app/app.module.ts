import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AranzmaniComponent } from './components/aranzmani/aranzmani.component';
import { CreateeComponent } from './components/create/create.component';
import { MojekarteComponent } from './components/mojekarte/mojekarte.component';
import { MojiaranzmaniComponent } from './components/mojiaranzmani/mojiaranzmani.component';
import { FooterComponent } from './components/footer/footer.component';
import { MojeuslugeComponent } from './components/mojeusluge/mojeusluge.component';
import { KreirajusluguComponent } from './components/kreirajuslugu/kreirajuslugu.component';
import { ChoosehotelComponent } from './components/choosehotel/choosehotel.component'
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    TopMenuComponent,
    ProfileComponent,
    AranzmaniComponent,
    CreateeComponent,
    MojekarteComponent,
    MojiaranzmaniComponent,
    FooterComponent,
    MojeuslugeComponent,
    KreirajusluguComponent,
    ChoosehotelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
