  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { AuthService } from 'src/app/services/auth.service';

  @Component({
    selector: 'app-choosehotel',
    templateUrl: './choosehotel.component.html',
    styleUrls: ['./choosehotel.component.css']
  })
  export class ChoosehotelComponent implements OnInit  {
    uslugaId: number=0;
    destinacija: string ="";
    hotel :any
    userData: any;
    constructor(private authservice: AuthService,private route: ActivatedRoute) { }
    ngOnInit(): void {this.getAllHotel();
      
      // Accessing parameters from the route
      this.route.params.subscribe(params => {
        this.uslugaId = params['uslugaId'];
        this.destinacija = params['destinacija'];
        // Now you can use these parameters as needed in your component
      });
      this.authservice.loadCurrentUser()
  this.authservice.currentUser.subscribe(data => {
    this.userData = data;})
  }

    addUslugaToHotel(uslugaId: number, hotelId: number, vremeP: Date, vremeZ: Date) {
      
      this.authservice.addUslugaToHotel(uslugaId, hotelId, vremeP, vremeZ)
        .subscribe(
          (response: any) => {
            console.log(response);
          },
          (error: any) => {
            console.error(error);
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
  kupiKartu(uslugaId: number, korisnikKupacId: number) {
    this.authservice.kupiUsluga(uslugaId, korisnikKupacId).subscribe(
      (response: any) => {
        console.log(response);
        // Osveži prikaz karti
        alert('Karta je uspešno kupljena!');
      },
      (error) => {
        console.log(error);
        alert('Karta je uspešno kupljena!');
  
      }
    );}
  }
