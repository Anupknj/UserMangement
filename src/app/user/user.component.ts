import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  public user:any;
  constructor(private _auth :AuthService,private _route: ActivatedRoute) { }

  ngOnInit() {
    let path=this._route.snapshot.paramMap.get('user_name');
    console.log(path);
    this.getinfo(path)
  }

  public getinfo(path):any{

   let toka=sessionStorage.getItem('temp_token');
 
   this._auth.getUser(path,toka).subscribe(data=>{
     this.user=data;
     console.log(this.user[0]);
     return this.user[0];
   },error=>{
     console.log(error)
   });
  }

  
  
}
