import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from "rxjs";
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public users=[];
    public flag=0;
    public tokens:any=[];
    public token:any;
    logInForm: FormGroup;
    successMessage: String = '';
    constructor(private _router: Router,private _auth: AuthService, private _activatedRoute: ActivatedRoute,private sessionStorage :SessionStorageService) {
       this.logInForm = new FormGroup({
      
      user_name: new FormControl(null, Validators.required),
      password: new FormControl(null, this.passValidator)
     
      });
    }

  ngOnInit() {
   
  }

  get f() { return this.logInForm.controls; }

    onLSubmit() {
       let user_name =this.logInForm.value.user_name;
       let password=this.logInForm.value.password;
     
        console.log(user_name+' '+password);
        if (this.logInForm.valid) {
            this._auth.userList().subscribe(
                data=>{
                    this.users=data;
                    
                    for(let user of this.users){

                        if(user_name ==user.user_name){
                          
                             if(password==user.password){
                                  alert("Logged In successfully");
                                 
                                   this._auth.getToken(user_name).subscribe(data=>{
                                   this.token=data;
                                   console.log(this.token.token);
                                   sessionStorage.setItem('temp_token',this.token.token);
                                   console.log("session set");
                                   this._router.navigate(['../userinfo'], { relativeTo: this._activatedRoute });
                                 },error=>{
                                   console.log("no token recieved");
                                 });
                            }

                           if(password!==user.password){
                             alert("wrong password");
                             return;
                            }
                         }
                        
                          
                       }

                   },
              
                error=> {  console.log(error.message);
                }
            );
              
          }
    }

    passValidator(control: AbstractControl) {
        if (control && (control.value !== null || control.value !== undefined)) {
          const cnfpassValue = control.value;
    
          const passControl = control.root.get('password');
          if (passControl) {
            const passValue = passControl.value;
            if (passValue !== cnfpassValue || passValue === '') {
              return {
                isError: true
              };
            }
          }
        }
    
        return null;
      }

}
