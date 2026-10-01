import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Descuento } from "../descuento/descuento.entity.mysql.js";

export class DescuentoSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const niveles = [
      { puntosRequeridos: 500, porcentaje: 5, descripcion: "5% de descuento", activo: true },
      { puntosRequeridos: 1000, porcentaje: 10, descripcion: "10% de descuento", activo: true },
      { puntosRequeridos: 2500, porcentaje: 20, descripcion: "20% de descuento", activo: true },
    ];

    for (const nivel of niveles) {
      em.create(Descuento, nivel);
    }

    await em.flush();

    console.log("Descuentos creados exitosamente.");
  }
}