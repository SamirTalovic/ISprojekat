import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;
  karte: any[] = [];
  filijale: any[] = [];

  novaKartaData: any = {
    cena: 0,
    nacinPlacanja: "",
    datum: new Date().toISOString(),
    korisnikId: 0,
    destinacija: "",
    kolicina: 0
  };
constructor(private authservice: AuthService, private router : Router){}

ngOnInit(): void {
  // Subscribe to currentUser BehaviorSubject to get user data
 const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
    this.userData = JSON.parse(storedUserData);
    this.loadData();
    
  } else {
    // Ako ne postoji, pozovite servis za dohvatanje korisnika
    this.getKorisnik();
  }
}
loadData() {
  if (this.userData) {
    this.getAllKarte();
    this.getAllFilijale();
  }
}
getKorisnik(){
  this.authservice.loadCurrentUser()
  this.authservice.currentUser.subscribe(data => {
    this.userData = data;

this.getAllKarte();
this.getAllFilijale()
    
  });
}
deleteHotel(hotelId: number): void {
  this.authservice.deleteKartica(hotelId).subscribe(
    () => {
      console.log('Hotel deleted successfully.');
      // You can add further logic here if needed
    },
    (error) => {
      console.error('An error occurred:', error);
      // Handle error appropriately
    }
  );}
 getAllKarte() {
  this.authservice.getAllKarte().subscribe(
    (response: Object) => {
      console.log(response); // Prikazivanje odgovora u konzoli radi provere
      this.karte = response as any[]; // Postavljanje rezultata u svojstvo karte
    },
    (error) => {
      console.log(error); // Prikazivanje greške u konzoli radi debagovanja
    }
  );
}
getAllFilijale() {
  this.authservice.getAllFilijale().subscribe(
    (response: Object) => {
      console.log(response); // Prikazivanje odgovora u konzoli radi provere
      this.filijale = response as any[]; // Postavljanje rezultata u svojstvo karte
    },
    (error) => {
      console.log(error); // Prikazivanje greške u konzoli radi debagovanja
    }
  );
}
createKarta() {
  this.novaKartaData.korisnikId = this.userData.id;
  this.authservice.createKarta(this.novaKartaData).subscribe(
    (response: any) => {
      console.log(response);
      // Osveži prikaz karti
      this.getAllKarte();
      // Resetuj formu za novu kartu
      this.resetNovaKartaForm();
    },
    (error) => {
      console.log(error);
    }
  );
}

resetNovaKartaForm() {
  this.novaKartaData = {
    cena: 0,
    nacinPlacanja: "",
    datum: new Date().toISOString(),
    korisnikId: this.userData.id,
    destinacija: "",
    kolicina: 0

  };
  
}

kupiKartu(kartaId: number, korisnikKupacId: number) {
  this.authservice.kupiKartu(kartaId, korisnikKupacId).subscribe(
    (response: any) => {
      console.log(response);
      // Osveži prikaz karti
      this.getAllKarte();
      alert('Karta je uspešno kupljena!');
    },
    (error) => {
      console.log(error);
      alert('Niste u mogucnosti da kupite kartu');

    }
  );
}
}