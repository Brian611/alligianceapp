import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NouisliderModule } from 'ng2-nouislider';
import { NgRedux, NgReduxModule, DevToolsExtension } from 'ng2-redux'
import { ChartModule } from 'angular-highcharts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { WizardComponent } from './components/wizard/wizard.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGaurd } from './guards/auth.guard';

import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { Question1Component } from './components/questions/question1/question1.component';
import { Question2Component } from './components/questions/question2/question2.component';
import { PlayzoneComponent } from './components/questions/playzone/playzone.component';
import { FooterComponent } from './components/footer/footer.component';
import { IAppState, rootReduer, INITIAL_STATE } from './store';
import { ProgressbarComponent } from './components/progressbar/progressbar.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'wizard', component: WizardComponent, pathMatch: 'full', canActivate: [AuthGaurd] }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    WizardComponent,
    Question1Component,
    Question2Component,
    PlayzoneComponent,
    FooterComponent,
    ProgressbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    NouisliderModule,
    NgReduxModule,
    ChartModule
  ],
  providers: [ValidateService, AuthService, AuthGaurd],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
    var enhancers = isDevMode() ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReduer, INITIAL_STATE, [], enhancers);
  }
}
