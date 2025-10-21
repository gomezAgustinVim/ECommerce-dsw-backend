import {
	Cascade,
	Collection,
	Entity,
	OneToMany,
	Property,
} from '@mikro-orm/core';
import { Mueble } from '../mueble/mueble.entity.mysql.js';
import { BaseEntity } from '../shared/db/baseEntity.entity.mysql.js';

@Entity()
export class Categoria extends BaseEntity {
	@Property({ unique: true })
	nombre!: string;

	@Property()
	descripcion!: string;

	@Property({ nullable: true })
	imagen?: string; // URL or file path

	@OneToMany(() => Mueble, (mueble) => mueble.categoria, {
		cascade: [Cascade.ALL],
	})
	muebles = new Collection<Mueble>(this);
}
