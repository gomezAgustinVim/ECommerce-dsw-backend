import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.mysql.js';

@Entity()
export class Descuento extends BaseEntity {
	@Property()
	puntosRequeridos!: number;

	@Property()
	porcentaje!: number;

	@Property()
	descripcion?: string;

	@Property({ default: true })
	activo: boolean = true;
}