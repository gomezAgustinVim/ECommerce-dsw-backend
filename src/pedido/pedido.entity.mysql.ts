import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  Rel,
} from "@mikro-orm/core";
import { Usuario } from "../usuario/usuario.entity.mysql.js";
import { Descuento } from "../descuento/descuento.entity.mysql.js";
import { Item } from "../item/item.entity.mysql.js";
import { Pago } from "../pago/pago.entity.mysql.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.mysql.js";

/*
pendiente → confirmado → pagado → enviado → entregado
                 ↘ cancelado */

@Entity()
export class Pedido extends BaseEntity {
  @ManyToOne(() => Usuario)
  usuario!: Rel<Usuario>;

  @OneToMany(() => Item, (item) => item.pedido, {
    cascade: [Cascade.ALL],
  })
  items = new Collection<Item>(this);

  @Property()
  fechaHora = new Date();

  @Property({ default: "pendiente" })
  estado!:
    | "pendiente"
    | "confirmado"
    | "pagado"
    | "enviado"
    | "entregado"
    | "cancelado";

  // Total sin descuentos
  // Se calcula como la suma de (precio * cantidad) de cada línea
  @Property({ type: "decimal", precision: 10, scale: 2, default: 0 })
  total!: number;

  @ManyToOne(() => Descuento, { nullable: true }) // se cambio de oneToOne a manyToOne para permitir que varios pedidos puedan tener el mismo descuento
    descuentoAplicado?: Rel<Descuento>;           // ahora el pedido apunta a un solo descuento, no al revés

  @Property({ default: 0 })
    puntosGanados: number = 0;

  @Property({ default: 0 })
    puntosUsados: number = 0;

  @ManyToOne(() => Pago, { nullable: true })
    pago?: Rel<Pago>;
}
