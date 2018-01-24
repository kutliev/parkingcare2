import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Spot } from '../../models/spot';


@Component({
  selector: 'app-spotlist',
  templateUrl: './spotlist.component.html',
  styleUrls: ['./spotlist.component.css']
})
export class SpotlistComponent implements OnInit {

	private _spots: Spot[] = [];

	@Input()
	set spots(spots: Spot[]){
		this._spots = spots;
	}
	get spots(): Spot[] { return this._spots; }

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
  }
}
