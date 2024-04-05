import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

interface RegisterFormData {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  gender: string;
  pwd: string;
  rpwd: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService){}

  ngOnInit() :void {}

repetePass:string = 'none'
displayMsg :string = ''
isAccountCreated :boolean = false


  registerForm = new FormGroup({
    firstname: new FormControl("",[Validators.required , Validators.minLength(3) ]),
    lastname: new FormControl("" ,[Validators.required , Validators.minLength(3) ]),
    email: new FormControl("" ,[Validators.required , Validators.email]),
    mobile: new FormControl("" ,[Validators.required , Validators.minLength(9) , Validators.maxLength(10)]),
    gender: new FormControl("", [Validators.required]),
    pwd: new FormControl("",[Validators.required,Validators.minLength(6) , Validators.maxLength(15)]),
    rpwd: new FormControl(""),

  })

  registerSubmited(){
    if(this.PWD.value == this.RPWD.value){
      console.log('Submited')
      
      this.authService.registerUser([
        this.registerForm.value.firstname ?? "",
        this.registerForm.value.lastname  ?? "",
        this.registerForm.value.email  ?? "",
        this.registerForm.value.mobile  ?? "",
        this.registerForm.value.gender  ?? "",
        this.registerForm.value.pwd  ?? "",


      ]).subscribe(res =>{
        if(res == "Created"){
          this.displayMsg = "Account created successfully"
          this.isAccountCreated = true
        } else if(res == "Alredy exist"){
          this.displayMsg = "Account alredy exist try different email"
          this.isAccountCreated = false
        } else{
          this.displayMsg = "Something went wrong"
          this.isAccountCreated = false
        }
      })
    }
    else{
      this.repetePass = 'inline'
    }
  }

  get FirstName():FormControl{
    return this.registerForm.get('firstname') as FormControl
  }
  get LastName():FormControl{
    return this.registerForm.get('lastname') as FormControl
  }
  get Email():FormControl{
    return this.registerForm.get('email') as FormControl
  }
  get Mobile():FormControl{
    return this.registerForm.get('mobile') as FormControl
  }
  get Gender():FormControl{
    return this.registerForm.get('gender') as FormControl
  }
  get PWD():FormControl{
    return this.registerForm.get('pwd') as FormControl
  }
  get RPWD():FormControl{
    return this.registerForm.get('rpwd') as FormControl
  }
}
