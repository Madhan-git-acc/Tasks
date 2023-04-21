import { Component } from '@angular/core';
import{AbstractControl, FormBuilder , FormControl, FormGroup , Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'register';

  regForm : FormGroup <any>
  submitted = false;


constructor(private fb : FormBuilder){



  this.regForm = fb.group({
    fullName: ['',[Validators.required]],
    userName: ['',[Validators.required]],
    email: ['',[Validators.required],[Validators.email]],
    phoneNumber: ['',[Validators.required]],
    password: ['',[Validators.required],[Validators.minLength(8)]],
    confirmPassword: ['',[Validators.required]],


  });

}

  // mismatchPass(form: FormGroup, control :AbstractControl){
    
  //   const password:AbstractControl = form.get('password');
  //   const cpassword:AbstractControl = form.get('confirmPassword');
  //   if(password.value!==cpassword.value)
  //     return{
  //       mismatchPass : true
  //     }
  //     else{
  //       return null
  //     }

  // }

  ngOnInit(): void {
    
    
  }

  submit(){
    console.log(this.regForm.value);
    this.submitted = true
  }

 reset(){
  this.regForm.value.reset
 }
 
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

