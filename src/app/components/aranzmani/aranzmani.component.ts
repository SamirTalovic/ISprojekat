import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-aranzmani',
  templateUrl: './aranzmani.component.html',
  styleUrls: ['./aranzmani.component.css']
})
export class AranzmaniComponent implements OnInit{
  userData: any;
  uslugeHotela: any;
  rezervacija: any;
  usluga : any;
  aranzman : any;

  novaUsluga: any = {
    naziv: ""
  }
  hotel: any;
  noviHotel: any = {
    web: "",
    email: "",
    ime: "",
    lokacija: "",
    kategorija: ""
  };
  noviAranzman : any = {
    cena: 0,
    nacinP:"",
    destinacija: "",
    vremeP: new Date(),
    vremeZ: new Date()
  }
  novaRezervacija : any = {
    datumP: new Date(),
    datumZ: new Date()

  }
  hotels: any[] = [];
  constructor(private authservice: AuthService, private router : Router){}
  ngOnInit(): void {
    // Subscribe to currentUser BehaviorSubject to get user data
    this.authservice.loadCurrentUser()
    this.authservice.currentUser.subscribe(data => {
      this.userData = data;
      this.getAllUslugeHotela()
      this.getAllHotel()  
      this.getAllUsluge()
      this.getAllAranzman()
    });
  }
  createHotel() {
    this.authservice.createHotel(this.hotel).subscribe(
      (response: any) => {
        console.log(response);
        // Osveži prikaz karti
        this.getAllHotel();
        // Resetuj formu za novu kartu
        this.resetHotel();
        
      },
      (error) => {
        console.log(error);
      }
    );
  }
 
  kupiAranzman(aranzmanId: number, korisnikKupacId: number) {
    this.authservice.kupiAranzman(aranzmanId, korisnikKupacId).subscribe(
      (response: any) => {
        console.log(response);
        // Osveži prikaz karti
        this.getAllAranzman();
        alert('Aranzman je uspešno kupljena!');
      },
      (error) => {
        console.log(error);
  
      }
    );
  }
  assignHotelToUslugaHotel(uslugaHotelaId: number, selectedHotelId: number) {
    this.authservice.addUslugaHotelaToHotel(uslugaHotelaId, selectedHotelId).subscribe(
      (response: any) => {
        console.log(response);
        // Refresh the list of uslugeHotela after assignment
        this.getAllUslugeHotela();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  assignHotelToAranzman(aranzmanId: number, selectedHotelId: number) {
    this.authservice.addAranzmanToHotel(aranzmanId, selectedHotelId).subscribe(
      (response: any) => {
        console.log(response);
        // Refresh the list of uslugeHotela after assignment
        this.getAllHotel();
      },
      (error) => {
        console.log(error);
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
  createAranzman() {
    this.authservice.createAranzman(this.noviAranzman).subscribe(
      (response: any) => {
        console.log(response);
        // Osveži prikaz karti
        this.getAllAranzman();
        // Resetuj formu za novu kartu
        this.resetAranzman();
        
      },
      (error) => {
        console.log(error);
      }
    );
  }
  resetHotel() {
    this.hotel = {
      web: "",
      email: "",
      ime: "",
      lokacija: "",
      kategorija: ""
    };
    
  }
  resetRezervacija() {
    this.rezervacija = {
      datumP: new Date(),
      datumZ: new Date()
    }
  }
  resetUsluga(){
    this.usluga = {
      naziv: ""
    }
  }
  resetAranzman(){
    this.aranzman = {
      cena: 0,
      nacinP:"",
      destinacija: "",
      vremeP: new Date(),
      vremeZ: new Date()
    }
  }
  deleteHotel(hotelId: number): void {
    this.authservice.deleteHotel(hotelId).subscribe(
      () => {
        console.log('Hotel deleted successfully.');
        // You can add further logic here if needed
      },
      (error) => {
        console.error('An error occurred:', error);
        // Handle error appropriately
      }
    );}
    deleteAranzman(hotelId: number): void {
      this.authservice.deleteAranzman(hotelId).subscribe(
        () => {
          console.log('Aranzman deleted successfully.');
          // You can add further logic here if needed
        },
        (error) => {
          console.error('An error occurred:', error);
          // Handle error appropriately
        }
      );}
    deleteUsluga(uslugalId: number): void {
      this.authservice.deleteUsluga(uslugalId).subscribe(
        () => {
          console.log('Hotel deleted successfully.');
          // You can add further logic here if needed
        },
        (error) => {
          console.error('An error occurred:', error);
          // Handle error appropriately
        }
      );}

    deleteUslugaHotel(hotelId: number): void {
      this.authservice.deleteUslugaHotela(hotelId).subscribe(
        () => {
          console.log('Hotel deleted successfully.');
          // You can add further logic here if needed
        },
        (error) => {
          console.error('An error occurred:', error);
          // Handle error appropriately
        }
      );}
  getAllUslugeHotela() {
    this.authservice.getAllUslugaHotela().subscribe(
      (response: Object) => {
        console.log(response); // Prikazivanje odgovora u konzoli radi provere
        this.uslugeHotela = response as any[]; // Postavljanje rezultata u svojstvo karte
      },
      (error) => {
        console.log(error); // Prikazivanje greške u konzoli radi debagovanja
      }
    );
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
  getAllAranzman() {
    this.authservice.getAllAranzman().subscribe(
      (response: Object) => {
        console.log(response); // Prikazivanje odgovora u konzoli radi provere
        this.aranzman = response as any[]; // Postavljanje rezultata u svojstvo karte
      },
      (error) => {
        console.log(error); // Prikazivanje greške u konzoli radi debagovanja
      }
    );
    
  }
}
