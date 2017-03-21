import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CareersComponent } from './careers/careers.component';
import { UsersComponent } from './users/users.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from './news/news.component';
import { NewsIdComponent } from './news-id/news-id.component';
import { LoginComponent } from './login/login.component';
import { CertificatesAdminComponent } from './certificates-admin/certificates-admin.component';



// определение маршрутов
const appRoutes: Routes =[
    { path: '', component: HomeComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'сareers', component: CareersComponent},
    { path: 'users', component: UsersComponent},
    { path: 'сertificates', component: CertificatesComponent},
    { path: 'news', component: NewsComponent},
    { path: 'news/:id', component: NewsIdComponent},
    { path: 'сontact', component: ContactComponent},
    { path: 'login', component: LoginComponent},
    { path: 'logout', component: LoginComponent},
    { path: 'certificates', component: CertificatesComponent},
    { path: 'certificates/admin', component: CertificatesAdminComponent},
    { path: '**', component: NotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    NotFoundComponent,
    CareersComponent,
    UsersComponent,
    CertificatesComponent,
    ContactComponent,
    NewsComponent,
    NewsIdComponent,
    LoginComponent,
    CertificatesAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
