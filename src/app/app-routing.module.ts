import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SpotcardComponent } from './components/spotcard/spotcard.component';
import { SpotcardeditComponent } from './components/spotcardedit/spotcardedit.component';
import { EventcardeditComponent } from './components/eventcardedit/eventcardedit.component';

const appRoutes = [
	{ path: '', component: DashboardComponent },
	{ path: 'spots', component: SpotcardComponent },
	{ path: 'spots/:spot_slug', component: SpotcardComponent },
	{ path: 'spots/:spot_slug/edit', component: SpotcardeditComponent },
	{ path: 'spots/:spot_slug/addevent', component: EventcardeditComponent },
	{ path: 'spots/:spot_slug/events/', redirectTo: 'spots/:spot_slug' },
	{ path: 'spots/:spot_slug/events/:event_slug', component: EventcardeditComponent },
	{ path: 'createspot', component: SpotcardeditComponent },
	// otherwise redirect to home
	{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
		RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
