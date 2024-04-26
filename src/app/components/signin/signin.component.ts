import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userService/user.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup; // Declare signinForm variable

  constructor(private formBuilder: FormBuilder,private UserService:UserService) { }
  
  ngOnInit() {
    // Initialize signinForm with formBuilder
    this.signinForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }
  
  get signinControls() { return this.signinForm.controls; }
  
  handleSignin() {
    // Add your form submission logic here
    if(this.signinForm.invalid){
      return;
    }
    const {firstName,lastName,userName,password}=this.signinForm.value
    const requestBody = {
      firstName: firstName,
      lastName: lastName,
      [encodeURI(userName)]: userName,
      [encodeURI(password)]: password
    };
    
    this.UserService.signinApiCall(requestBody).subscribe(res => console.log(res),error=>console.log(error))
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { passwordMismatch: true };
    }

}
