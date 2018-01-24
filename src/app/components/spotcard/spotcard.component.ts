import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Spot } from '../../models/spot';
import { SpotEvent } from '../../models/spotevent';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-spotcard',
  templateUrl: './spotcard.component.html',
  styleUrls: ['./spotcard.component.css']
})
export class SpotcardComponent implements OnInit {

  selectedSpot: Spot = new Spot('', '', '', '', '', '', '');

  constructor(
  		private route: ActivatedRoute,
      private router: Router,
  		private dataService: DataService,
  	) { }

  ngOnInit(): void {

    let spotId = this.route.snapshot.paramMap.get('spot_slug');

	  this.getSpot(spotId);
    
  }

	getSpot(spotId: string): void {
    this.dataService.getObject(spotId).subscribe(spot => {
				this.selectedSpot = 
          new Spot(spot._id, spot.title, spot.slug, spot.content, spot.metadata.floor, spot.metadata.type, spot.metadata.customer); 
        this.getEvents(this.selectedSpot);
			});
	}

  getEvents(spot: Spot): void {

      this.dataService.getSpotEventList(spot).subscribe(spotEventList => {

      if(spotEventList)
      for (let spotEvent of spotEventList.sort((a, b) => a.created - b.created)) {

        let currentEvent = 
          new SpotEvent(spotEvent._id, spot.slug, spotEvent.title, spotEvent.slug, spotEvent.content, spotEvent.metadata.type, spotEvent.created);

        switch (spotEvent.metadata.type) {
          case "Payment":
            this.selectedSpot.payments.push(currentEvent);
            break;

          case "Cleaning":
            this.selectedSpot.cleanings.push(currentEvent);
            break;

          case "Maintenance":
            this.selectedSpot.maintenances.push(currentEvent);
            break;

          default:
            break;
        }
      }
     });   
  }

  remove(spot: Spot): void {
    if (!this.canBeDeleted()){
      return alert("Spot with events cannot be deleted");
    };

    if (confirm('Spot will be removed. Continue?')) {
      this.dataService.removeSpot(spot).subscribe(result => {
        if (result.status == "200") {
          this.router.navigate(['/']);
        }
      });
    }
  }

  canBeDeleted():boolean{

    return this.selectedSpot.cleanings.length == 0 &&
      this.selectedSpot.maintenances.length == 0 &&
      this.selectedSpot.payments.length == 0;
  }
}
