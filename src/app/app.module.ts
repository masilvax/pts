import { NgModule/* , LOCALE_ID */ } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './core/interceptors/header.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from './shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { MatNativeDateModule/* , MAT_DATE_LOCALE */ } from '@angular/material/core';

/* import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

registerLocaleData(localePl); */

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    /* { provide: MAT_DATE_LOCALE, useValue: 'en_GB' }  */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
