import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatMenuModule, MatDialogModule, MatTabsModule, MatInputModule,
  MatSnackBarModule, MatTooltipModule, MatIconModule, MatToolbarModule, MatListModule,
  MatCardModule, MatSidenavModule, MatButtonModule, MatSelectModule, MatSlideToggleModule,
  MatButtonToggleModule, MatFormFieldModule, MatCheckboxModule, MatAutocompleteModule, MatDatepickerModule,
  MatRadioModule, MatSliderModule, MatStepperModule, MatExpansionModule, MatChipsModule, MatProgressSpinnerModule,
  MatProgressBarModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule, MatNativeDateModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Services
import { GenericService } from '../app/services/generic.service';
import { AuthService } from '../app/services/auth.service';
// Guards
import { AuthGuard } from '../app/guards/auth.guard';
// Components
import { LoginComponent } from '../app/components/login/login.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatMenuModule, MatDialogModule, MatTabsModule, MatInputModule,
    MatSnackBarModule, MatTooltipModule, MatIconModule, MatToolbarModule, MatListModule,
    MatCardModule, MatSidenavModule, MatButtonModule, MatSelectModule, MatSlideToggleModule,
    MatButtonToggleModule, MatFormFieldModule, MatCheckboxModule, MatAutocompleteModule, MatDatepickerModule,
    MatRadioModule, MatSliderModule, MatStepperModule, MatExpansionModule, MatChipsModule, MatProgressSpinnerModule,
    MatProgressBarModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule, MatNativeDateModule
  ],
  providers: [AuthGuard, GenericService, AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
