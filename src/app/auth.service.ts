import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 public url =environment.baseurl;
 public tokens:any=[];
 public token:any;
 public users:any=[];
 public user:any;
 constructor(private _http:HttpClient) { }
  


    public getUsers():any{
    this.users=this._http.get(this.url+'/users');
    return this.users;
  }

    public getToken(user_name){
      
      alert("service");
      this.token=this._http.get(this.url+'/users/'+user_name);
      console.log(this.token);
      return this.token;
    }

  public getUser(name,token):any{
  
  return this._http.get(this.url+'/user/'+name,{ headers : {

      "Authorization" :`Bearer ${token}`
    }
   });

  }

  public refreshToken(){
    this.token= this._http.get(this.url+'/users/refreshToken');
    console.log("SERVICE REACHED"+this.token);
    return this.token;
  }

  public userList(){
    
     this.users= this._http.get(this.url+'/users');
     return this.users;

  }
   

  public postUser(body:any){
    return this._http.post(this.url+'/users',body,{
      observe:'body'
    });
  }
  
}


