import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateeComponent implements OnInit { form!: FormGroup;
  
  constructor(private authservice: AuthService, private router : Router , private fb:FormBuilder){
    this.form = this.fb.group({
      dorucak: [false],
      pansion: [false],
      polupansion: [false],
      cena: ['', Validators.required],
      web: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ime: ['', Validators.required],
      lokacija: ['', Validators.required],
      kategorija: ['', Validators.required],
      datumP: ['', Validators.required],
      datumZ: ['', Validators.required],
      naziv: ['', Validators.required],
      nacinP: ['', Validators.required],
      destinacija: ['', Validators.required],
      vremeP: ['', Validators.required],
      vremeZ: ['', Validators.required]
    });
  }

  onSubmit() {
  if (this.form.valid) { // Check if the form is valid
    // Get form values
    const formValues = this.form.value;
    
    // Perform form submission logic
    console.log("Form submitted with the following values:", formValues);

    // Reset the form after submission
    this.form.reset();
  } else {
    // Handle invalid form
    console.log("Form is invalid. Please fill in all required fields correctly.");
  }
}
  userData: any;
  uslugeHotela: any;
  rezervacija: any;
  usluga : any;
  aranzman : any;
  // Define FormGroup

  novaUslugaHotela : any = {
    dorucak : false,
    pansion: false,
    polupansion: false,
    cena: 0
  }
   
  novaUsluga: any = {
    naziv: ""
  }
  hotel: any;
  noviHotel: any = {
    web: "",
    email: "",
    ime: "",
    lokacija: "",
    kategorija: "",
    brojmesta: 0,
  };
  noviAranzman : any = {
    cena: 0,
    nacinP:"",
    destinacija: "",
    vremeP: new Date().toISOString()+":00",
    vremeZ: new Date().toISOString()+":00"
  }
  novaRezervacija : any = {
    datumP: new Date().toISOString(),
    datumZ: new Date().toISOString()

  }
  hotels: any[] = [];
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
  createUslugeHotela() {
    this.authservice.createUslugaHotela(this.uslugeHotela).subscribe(
      (response: any) => {
        console.log(response);
        // Osveži prikaz karti
        this.getAllUslugeHotela();
        // Resetuj formu za novu kartu
        this.resetUslugeHotel();
        
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
  checkPansion() {
    if (this.uslugeHotela.pansion) {
        this.uslugeHotela.polupansion = false; // If "pansion" is true, disable "polupansion"
    }
}

checkPolupansion() {
    if (this.uslugeHotela.polupansion) {
        this.uslugeHotela.pansion = false; // If "polupansion" is true, disable "pansion"
    }
}
  resetHotel() {
    this.hotel = {
      web: "",
      email: "",
      ime: "",
      lokacija: "",
      kategorija: "",
      brojmesta:0
    };
    
  }
  resetUslugeHotel() {
    this.hotel = {
      dorucak : false,
      pansion: false,
      polupansion: false,
      cena: 0
    };
    
  }
  resetRezervacija() {
    this.rezervacija = {
      datumP: new Date().toISOString(),
      datumZ: new Date().toISOString()
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
      vremeP: new Date().toISOString(),
      vremeZ: new Date().toISOString()
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
