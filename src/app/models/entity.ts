export class Entity {
	
	id: string;
	title: string;
	slug: string;
	content: string;

	constructor(id: string, title: string, slug: string, content: string) {
		this.id = id;
		this.title = title;
		this.slug = slug;
		this.content = content;
	}
}
