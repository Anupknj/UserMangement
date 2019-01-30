import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegComponent } from './reg/reg.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { InterceptService} from './services/intercept.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularWebStorageModule } from 'angular-web-storage';
import { UserComponent } from './user/user.component';



@NgModule({
  declarations: [
    AppComponent,
    RegComponent,
    LoginComponent,
    UserinfoComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularWebStorageModule,
  
  RouterModule.forRoot([
     { path :'reg', component :RegComponent},
     { path : 'login', component :LoginComponent },
     { path : 'userinfo',component :UserinfoComponent},
     { path : 'user/:user_name', component:UserComponent}
    
  ])
],
  providers: [InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
