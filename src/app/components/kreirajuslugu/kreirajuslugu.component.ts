import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-kreirajuslugu',
  templateUrl: './kreirajuslugu.component.html',
  styleUrls: ['./kreirajuslugu.component.css']
})
export class KreirajusluguComponent implements OnInit {
  constructor(private authservice: AuthService, private router : Router){}
  userData: any;
  usluga : any;
  hotel:any;
  novaUsluga: any = {
    naziv: ""
  }
  selectedHotelId: number | null = null;
  ngOnInit(): void {
    // Subscribe to currentUser BehaviorSubject to get user data
    this.authservice.loadCurrentUser()
    this.authservice.currentUser.subscribe(data => {
      this.userData = data;
      this.getAllHotel()
    });
}

createUsluga() {
  this.authservice.createUsluga(this.novaUsluga).subscribe(
    (response: any) => {
      console.log(response);
      // Osveži prikaz karti
      this.getAllUsluge();
      // Resetuj formu za novu kartu
      this.resetUsluga();
      console.log("Navigating to ChooseHotelComponent...");
      // Navigate to ChooseHotelComponent with uslugaId and destinacija as parameters
      this.router.navigate(['/choose-hotel', response.uslugaId, response.destinacija]);
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
getAllHotel() {
  this.authservice.getAllHotels().subscribe(
    (response: Object) => {
      console.log(response); // Prikazivanje odgovora u konzoli radi provere
      this.hotel = response as any[]; // Postavljanje rezultata u svojstvo karte
    },
    (error) => {
      console.log(error); // Prikazivanje greške u konzoli radi debagovanja
    }
  );
  
}




}
