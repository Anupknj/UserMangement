import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

    myForm: FormGroup;
    successMessage: String = '';
    constructor(private _router: Router,private _auth: AuthService, private _activatedRoute: ActivatedRoute) {
       this.myForm = new FormGroup({
        first_name: new FormControl(null, Validators.required),
        last_name: new FormControl(null, Validators.required),
        user_name: new FormControl(null, Validators.required),
        password: new FormControl(null, this.passValidator),
       description :new FormControl(null, Validators.required)
      });
    }
    
  

  ngOnInit() {
  }

  isValid(controlName) {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
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

  register() {
    console.log(this.myForm.value);

    if (this.myForm.valid) {
      this._auth.postUser(this.myForm.value)
        .subscribe(
          data => {
            this.successMessage = 'Registration Success';
            this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
          },
          error => this.successMessage = 'SOme error'
        );
       
    }
  }

  movetologin() {
    this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
  }
}
