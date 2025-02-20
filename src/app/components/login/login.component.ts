import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

currentUser: BehaviorSubject<any> = new BehaviorSubject(null)

constructor(private loginAuth:AuthService ,private router : Router){}

loginForm = new FormGroup({
  email: new FormControl("" ,[Validators.required , Validators.email]),
  pwd: new FormControl("",[Validators.required,Validators.minLength(6) , Validators.maxLength(15)]),
})
isUserValid:boolean = false
loginSubmited(){
this.loginAuth.loginUser([this.loginForm.value.email?? "", this.loginForm.value.pwd??""])
.subscribe(res=>{
  if(res == "Failure"){
this.isUserValid = false
alert("Login unsuccessful")
  }else{
    this.isUserValid = true
    this.loginAuth.setToken(res)
    this.router.navigateByUrl('home')
  }
})
}

get Email():FormControl{
  return this.loginForm.get('email') as FormControl
}
get PWD():FormControl{
  return this.loginForm.get('pwd') as FormControl
}

}
