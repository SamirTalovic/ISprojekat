import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authservice: AuthService, private router : Router){}
  userData: any;

  ngOnInit(): void {
    this.authservice.loadCurrentUser()
    this.authservice.currentUser.subscribe(data => {
      this.userData = data;
  })}
  
  title = 'touriST';


}
