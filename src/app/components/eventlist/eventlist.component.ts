import { Component, OnInit, Input } from '@angular/core';
import { Spot } from '../../models/spot';
import { SpotEvent } from '../../models/spotevent';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {

	private _spotEvents: SpotEvent[] = [];
	private _parentSpot: Spot;

	@Input()
	set spotevents(spotevents: SpotEvent[]) {
		this._spotEvents = spotevents;
	}
	get spotevents(): SpotEvent[] {
	 return this._spotEvents; 
	}

	@Input()
	set spot(spot: Spot){
		this._parentSpot = spot;
	}
	get spot(): Spot{
		return this._parentSpot;
	}
  
  constructor(private dataService: DataService) { }
  
  ngOnInit() {  }

	removeEvent(event: SpotEvent){
		if (confirm('Spot event will be removed. Continue?')) {
			this.dataService.removeEvent(event).subscribe(result => {
				if (result.status == "200") {					
					this.spotevents = this._spotEvents.filter(x => x != event);

					if(this.spot){
						let eventType = event.type;
						switch (eventType) {
							case "Cleaning":
								this.spot.cleanings = this._parentSpot.cleanings.filter(x => x != event);
								break;
							case "Maintenance":
								this.spot.maintenances = this._parentSpot.maintenances.filter(x => x != event);
								break;
							case "Payment":
								this.spot.payments = this._parentSpot.payments.filter(x => x != event);
								break;
							default:
								break;
						}
					}
				}
			});
		}
	}

}
