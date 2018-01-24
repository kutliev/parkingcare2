import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Spot } from '../../models/spot';
import { SpotEvent } from '../../models/spotevent';
import { DataService } from '../../services/data.service';
import { EventTypes } from '../../models/settings';


@Component({
  selector: 'app-eventcardedit',
  templateUrl: './eventcardedit.component.html',
  styleUrls: ['./eventcardedit.component.css']
})
export class EventcardeditComponent implements OnInit {

	selectedSpot: Spot = new Spot('', '', '', '', 'GroundFloor', 'Vacant', '');
	selectedEvent: SpotEvent = new SpotEvent('', '', '', '', '', 'Payment', new Date());
	eventTypes: string[];

	constructor(
		private route: ActivatedRoute,
		private dataService: DataService,
		private router: Router
	) { }

  ngOnInit() {
	  this.eventTypes = EventTypes;
	  let spotId = this.route.snapshot.paramMap.get('spot_slug');
	  let spotEventId = this.route.snapshot.paramMap.get('event_slug');
	  this.getData(spotId, spotEventId);
  }

	getData(spotId: string, spotEventId: string): void {
		if (!spotId) {
			this.router.navigate(['/']);
		}
	
		this.dataService.getSpotEventData(spotId, spotEventId).subscribe(result => {

			let spot = result.length > 1 ? result[0] : result;
			this.selectedSpot = new Spot(spot._id, spot.title, spot.slug, spot.content, spot.metadata.floor.title, spot.metadata.type, spot.metadata.customer);

			if (spotEventId) {
				let spotEvent = result[1];
				this.selectedEvent = new SpotEvent(spotEvent._id, spot.slug, spotEvent.title, spotEvent.slug, spotEvent.content, spotEvent.metadata.type, new Date(Date.now()));
			} else {
				this.setEventTitle();
			}
		});	
	} 

	setEventTitle(): void {
		this.selectedEvent.title = this.selectedEvent.type + " for " + this.selectedSpot.title;
	}

	saveEvent(): void {
		let spotEventId = this.route.snapshot.paramMap.get('event_slug');
		if (spotEventId) {
			this.dataService.updateEvent(this.selectedEvent, this.selectedSpot).subscribe(result => {
				this.router.navigate(['/spots/' + this.selectedSpot.slug]);
			});
		} else {
			this.dataService.saveEvent(this.selectedEvent, this.selectedSpot).subscribe(result => {
				this.router.navigate(['/spots/' + this.selectedSpot.slug]);
			});
		}
	}
}
