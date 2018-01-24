import { Entity } from './entity'
import { SpotEvent } from './spotevent'


export class Spot extends Entity {

	floor: string;
	type: string;
	customer: string;
	payments: SpotEvent[];
	cleanings: SpotEvent[];
	maintenances: SpotEvent[];

	constructor(id: string, title: string, slug: string, content: string, floor: string, type: string, customer: string) {
		super(id, title, slug, content);
		this.floor = floor;
		this.type = type;
		this.customer = customer;
		this.payments = [];
		this.cleanings = [];
		this.maintenances = [];
	}
}