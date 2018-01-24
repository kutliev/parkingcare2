import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Spot } from '../../models/spot';
import { DataService } from '../../services/data.service';
import { SpotTypes, Floors } from '../../models/settings';

@Component({
  selector: 'app-spotcardedit',
  templateUrl: './spotcardedit.component.html',
  styleUrls: ['./spotcardedit.component.css']
})
export class SpotcardeditComponent implements OnInit {

	selectedSpot: Spot = new Spot('', '', '', '', 'Ground', 'Vacant', '');
	spotTypes: string[];
	spotFloors: string[];

	constructor(
	  private route: ActivatedRoute,
	  private dataService: DataService,
	  private router: Router
	) { }

	ngOnInit() {
		let spotId = this.route.snapshot.paramMap.get('spot_slug');
	  	this.getSpot(spotId);
		this.spotTypes = SpotTypes;
		this.spotFloors = Floors;
	}

	getSpot(spotId: string): void {
		if (spotId) {
			this.dataService.getObject(spotId).subscribe(spot => {
				this.selectedSpot = 
					new Spot(spot._id, spot.title, spot.slug, spot.content, spot.metadata.floor, spot.metadata.type, spot.metadata.customer);
			});
		}
	}

	saveSpot(spotSlug: string): void {
		if (spotSlug != '') {
			if(this.selectedSpot.type == "Vacant"){
				this.selectedSpot.customer = "";
			}
			this.dataService.updateSpot(this.selectedSpot).subscribe(result => {
				this.router.navigate(['/spots/' + spotSlug]);
			});
		}else{
			this.dataService.saveSpot(this.selectedSpot).subscribe(result => {
				this.router.navigate(['/spots/' + result.slug]);
			});
		}
	}
}
