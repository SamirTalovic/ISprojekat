import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mojeusluge',
  templateUrl: './mojeusluge.component.html',
  styleUrls: ['./mojeusluge.component.css']
})

export class MojeuslugeComponent implements OnInit {
  constructor(private authservice: AuthService, private router : Router){}
  userData: any;
  usluga : any;
  novaUsluga: any = {
    naziv: ""
  }
  alertMessage: string = "";
  ngOnInit(): void {
    // Subscribe to currentUser BehaviorSubject to get user data
    this.authservice.loadCurrentUser()
    this.authservice.currentUser.subscribe(data => {
      this.userData = data;
      this.getAllUsluge()
    });
}
checkExpiredReservations(hotelId: number): void {
  this.authservice.checkExpiredReservations(hotelId)
    .subscribe(
      (response: any) => {
        console.log(response.message); // Log the response
        window.alert(response.message);
        // Handle the response accordingly in your component
      },
      (error: any) => {
        console.error(error); // Log any errors
       window.alert(error); //
       // Handle errors in your component
      }
    );
}

createUsluga() {
  this.authservice.createUsluga(this.novaUsluga).subscribe(
    (response: any) => {
      console.log(response);
      // Osveži prikaz karti
      this.getAllUsluge();
      // Resetuj formu za novu kartu
      this.resetUsluga();
      
    },
    (error) => {
      console.log(error);
    }
  );
}
getAllUsluge() {
  this.authservice.getAllUsluga().subscribe(
    (response: Object) => {
      console.log(response); // Prikazivanje odgovora u konzoli radi provere
      this.usluga = response as any[]; // Postavljanje rezultata u svojstvo karte
    },
    (error) => {
      console.log(error); // Prikazivanje greške u konzoli radi debagovanja
    }
  );
  
}
resetUsluga(){
  this.usluga = {
    naziv: ""
  }
}
}
