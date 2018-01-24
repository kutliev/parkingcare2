import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SpotcardComponent } from './components/spotcard/spotcard.component';
import { SpotcardeditComponent } from './components/spotcardedit/spotcardedit.component';
import { EventcardeditComponent } from './components/eventcardedit/eventcardedit.component';
import { SpotlistComponent } from './components/spotlist/spotlist.component';
import { EventlistComponent } from './components/eventlist/eventlist.component';

import { DataService } from './services/data.service';
import { Settings } from './models/settings';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SpotcardComponent,
    SpotcardeditComponent,
    EventcardeditComponent,
    SpotlistComponent,
    EventlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    DataService,
    Settings,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
