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
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { CapabilitiesComponent } from './capabilities/capabilities.component';
import { MediaComponent } from './media/media.component';
import { ContactUsComponent } from './contact-us/contact-us.component';



// определение маршрутов
const appRoutes: Routes =[
    { path: 'home', component: HomeComponent},
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
    { path: 'header', component: HeaderComponent},
    { path: 'about-us', component: AboutComponent},
    { path: 'services', component: ServicesComponent},
    { path: 'capabilities', component: CapabilitiesComponent},
    { path: 'media', component: MediaComponent},
    { path: 'contact-us', component: ContactUsComponent},
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
    CertificatesAdminComponent,
    HeaderComponent,
    AboutComponent,
    ServicesComponent,
    CapabilitiesComponent,
    MediaComponent,
    ContactUsComponent
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
