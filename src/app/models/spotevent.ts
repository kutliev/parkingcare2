import { Entity } from './entity';

export class SpotEvent extends Entity {
	
	type: string;
	created: Date;
	spot: string;
	
	constructor(id: string, spot: string, title: string, slug: string, content: string, type: string, created: Date){
		super(id, title, slug, content);
		this.type = type;
		this.created = created;
		this.spot = spot;
	}
}
