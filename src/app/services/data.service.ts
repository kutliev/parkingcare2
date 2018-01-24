import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { Settings } from '../models/settings'
import { Entity } from '../models/entity'
import { Spot } from '../models/spot'
import { SpotEvent } from '../models/spotevent'


@Injectable()
export class DataService {

	constructor(private http: Http, private settings: Settings) { }

	getSpotData(): Observable<any> {
		let apiEndPoint = this.settings.ApiEndPoint + "object-type/spots" + "?read_key=" + this.settings.ApiReadKey;
		return this.http.get(apiEndPoint).map((response: Response) => response.json().objects);
	}

	getSpotEvents(): Observable<any> {
		let apiEndPoint = this.settings.ApiEndPoint + "object-type/spotevents" + "?read_key=" + this.settings.ApiReadKey;
		return this.http.get(apiEndPoint).map((response: Response) => response.json().objects);
	}

	getSpotEventList(spot: Spot): Observable<any> {
		let apiEndPoint = this.settings.ApiEndPoint + "object-type/spotevents/search?metafield_key=spot&metafield_value=" + spot.id + "&read_key=" + this.settings.ApiReadKey;
		return this.http.get(apiEndPoint).map((response: Response) => response.json().objects);
	}

	getSpots(): Observable<any> {
		return Observable.forkJoin(this.getSpotData(), this.getSpotEvents());
	}

	saveSpot(spot: Spot): Observable<any> {
		let apiEndPoint = this.settings.ApiEndPoint + "add-object";
		let payload = {
			"write_key": this.settings.ApiWriteKey,
			"title": spot.title,
			"type_slug": "spots",
			"content": spot.content,
			"metafields": [
				{
					"key": "type",
					"title": "Type",
					"value": spot.type
				},
				{
					"key": "floor",
					"value": spot.floor
				},
				{
					"key": "customer",
					"value": spot.customer
				}
			]
		};

		let headers: Headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let jsonPayload = JSON.stringify(payload);
		return this.http.post(apiEndPoint, jsonPayload, { headers: headers }).map((response: Response) => response.json().object);
	}


	updateSpot(spot: Spot) {
		let apiEndPoint = this.settings.ApiEndPoint + "edit-object";
		let payload = {
			"write_key": this.settings.ApiWriteKey,
			"title": spot.title,
			"slug": spot.slug,
			"content": spot.content,
			"metafields": [
				{
					"key": "type",
					"title": "Type",
					"value": spot.type
				},
				{
					"key": "floor",
					"value": spot.floor
				},
				{
					"key": "customer",
					"value": spot.customer
				}
			]
		};

		let headers: Headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let jsonPayload = JSON.stringify(payload);
		return this.http.put(apiEndPoint, jsonPayload, { headers: headers }).map((response: Response) => response.json().object);
	}

	removeSpot(spot: Spot) {
		return this.removeEntity(spot).map((response: Response) => response.json());
	}

	getObject(slug: string): Observable<any> {
		if (!slug || slug == '') {
			return Observable.empty<Response>();
		}
		let apiEndPoint = this.settings.ApiEndPoint + "object/" + slug + "?read_key=" + this.settings.ApiReadKey;
		return this.http.get(apiEndPoint).map((response: Response) => response.json().object);
	}

	removeEvent(event: SpotEvent) {
		return this.removeEntity(event).map((response: Response) => response.json());
	}

	removeEntity(entity: Entity) {
		let apiEndPoint = this.settings.ApiEndPoint + "objects/" + entity.slug;
		let payload = {
			"write_key": this.settings.ApiWriteKey
		};

		let headers: Headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let jsonPayload = JSON.stringify(payload);
		return this.http.delete(apiEndPoint, {
			headers: headers,
			body: jsonPayload
		});
	}

	saveEvent(spotEvent: SpotEvent, spot: Spot) {
		let apiEndPoint = this.settings.ApiEndPoint + "add-object";
		let payload = {
			"write_key": this.settings.ApiWriteKey,
			"title": spotEvent.title,
			"type_slug": "spotevents",
			"content": spotEvent.content,
			"metafields": [
				{
					"key": "type",
					"title": "Type",
					"value": spotEvent.type
				},
				{
					"object_type": "spots",
					"key": "spot",
					"type": "object",
					"value": spot.id
				}
			]
		};

		let headers: Headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let jsonPayload = JSON.stringify(payload);
		return this.http.post(apiEndPoint, jsonPayload, { headers: headers }).map((response: Response) => response.json().object);

	}


	updateEvent(spotEvent: SpotEvent, spot: Spot) {
		let apiEndPoint = this.settings.ApiEndPoint + "edit-object";
		let payload = {
			"write_key": this.settings.ApiWriteKey,
			"title": spotEvent.title,
			"slug": spotEvent.slug,
			"content": spotEvent.content,
			"metafields": [
				{
					"key": "type",
					"title": "Type",
					"value": spotEvent.type
				},
				{
					"object_type": "spots",
					"key": "spot",
					"type": "object",
					"value": spot.id
				}
			]
		};

		let headers: Headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let jsonPayload = JSON.stringify(payload);
		return this.http.put(apiEndPoint, jsonPayload, { headers: headers }).map((response: Response) => response.json().object);

	}



	getSpotEventData(spot_slug: string, event_slug: string): Observable<any> {
		if (!event_slug) {
			return this.getObject(spot_slug);
		} else {
			return Observable.forkJoin(this.getObject(spot_slug), this.getObject(event_slug));
		}
	}

}
