import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Spot } from '../../models/spot';
import { SpotEvent } from '../../models/spotevent';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(private dataService: DataService) { }

	spots: Spot[] = [];
	spotEvents: SpotEvent[] = [];

	ngOnInit() {
		this.dataService.getSpots().subscribe(result => {

			let rawSpots = result[0];
			let rawEvents = result[1];

			//Gathering last events
			if (rawEvents)
				for (let rawEvent of rawEvents.sort((a, b) => a.created - b.created).slice(0, 10)) {
					this.spotEvents.push(new SpotEvent(rawEvent._id, rawEvent.metadata.spot.slug, rawEvent.title, rawEvent.slug, rawEvent.content, rawEvent.metadata.type, rawEvent.created));
				}

			//Data transformation
			if (rawSpots)
				for (let rawSpot of rawSpots.sort((a, b) => a.title - b.title)) {

					let spot = new Spot(rawSpot._id, rawSpot.title, rawSpot.slug, rawSpot.content, rawSpot.metadata.floor, rawSpot.metadata.type, rawSpot.metadata.customer);

					if (rawEvents)
						for (let spotEvent of rawEvents.filter(x => x.metadata.spot && x.metadata.spot.slug == rawSpot.slug).sort((a, b) => a.created - b.created)) {

							let currentEvent = new SpotEvent(spotEvent._id, rawSpot.slug, spotEvent.title, spotEvent.slug, spotEvent.content, spotEvent.metadata.type, spotEvent.created);

							switch (spotEvent.metadata.type) {
								case "Payment":
									spot.payments.push(currentEvent);
									break;

								case "Cleaning":
									spot.cleanings.push(currentEvent);
									break;

								case "Maintenance":
									spot.maintenances.push(currentEvent);
									break;

								default:
									break;
							}
						}
					this.spots.push(spot);
				}
		});;
	}
}
