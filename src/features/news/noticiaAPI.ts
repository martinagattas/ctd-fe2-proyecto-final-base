import { INoticias } from "./fakeRest";
import { calcularMinutos, titulo } from "./utils";

export const noticiasNormalizadas = (noticias: INoticias[]) => {
    return noticias.map((n) => ({
        id: n.id,
        titulo: titulo(n.titulo),
        descripcion: n.descripcion,
        fecha: `Hace ${calcularMinutos(n.fecha)} minutos`,
        esPremium: n.esPremium,
        imagen: n.imagen,
        descripcionCorta: n.descripcion.substring(0, 100),
    }));
};