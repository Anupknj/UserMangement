import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  public users=[];
  constructor(private _router: Router,private _auth: AuthService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._auth.userList().subscribe(data=>{
      this.users=data;
    },error=>{
      console.log(error.message.error.text);
    });
  }

}
