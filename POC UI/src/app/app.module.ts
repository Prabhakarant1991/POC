import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
 

import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './guards/auth-guard.service';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ContactsComponent } from './contacts/contacts.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';




const routes: Routes = [

  {path: '',pathMatch:'full',redirectTo:'login'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomepageComponent, 
      children:[{path:'contact', component: ContactsComponent}]},
  // { path: '', component: HomepageComponent },
  // { path: 'contact', component: ContactsComponent, canActivate: [AuthGuard] },
  // { path: 'login', component: LoginComponent },
];


export function tokenGetter() {
  return localStorage.getItem("jwt")
}

@NgModule({
  declarations: [
    AppComponent, 
    HomepageComponent,
    LoginComponent,
    ContactsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7038"],
        disallowedRoutes: []
      }
  }),
  ToastrModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
