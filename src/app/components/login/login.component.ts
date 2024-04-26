import { Router, RouterModule } from '@angular/router';
import { UserService } from './../../services/userService/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !:FormGroup 
  
  constructor(private formBuilder : FormBuilder,private UserService:UserService,private Router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
     
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      
  } )
  }
  get loginControls() { return this.loginForm.controls; }

  handleLogin() {
    const {email,password}=this.loginForm.controls
    this.UserService.loginApiCall(email.value,password.value).subscribe(res =>{
      console.log(res)
      localStorage.setItem('authToken',res.data)
      this.Router.navigate(['/dashboard/notes'])
    },err => console.log(err))
  }
}
