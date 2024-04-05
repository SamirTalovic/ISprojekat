import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mojekarte',
  templateUrl: './mojekarte.component.html',
  styleUrls: ['./mojekarte.component.css']
})
export class MojekarteComponent implements OnInit {

  userData: any;
  karte: any;
  aranzman : any;

constructor(private authservice: AuthService, private router : Router){}

ngOnInit(): void {
  // Subscribe to currentUser BehaviorSubject to get user data
  this.authservice.loadCurrentUser()
  this.authservice.currentUser.subscribe(data => {
    this.userData = data;
    this.getAllKarte()
    this.getAllAranzman()
  });
}
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
    );}
  
  logOut(){
    this.authservice.removeToken()
    this.router.navigateByUrl('/login')
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
