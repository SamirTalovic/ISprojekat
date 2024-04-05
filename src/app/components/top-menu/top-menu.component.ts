import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit  {

constructor(private authservice: AuthService, private router : Router){}
  userData: any;

  ngOnInit(): void {
    this.authservice.loadCurrentUser()
    this.authservice.currentUser.subscribe(data => {
      this.userData = data;
  })}

  logOut(){
    this.authservice.removeToken()
    this.router.navigateByUrl('/login')
  }
}
