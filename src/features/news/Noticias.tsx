import { useEffect, useState } from "react";
import { obtenerNoticias } from "./fakeRest";
import {
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias
} from "./styled";
import { INoticiasNormalizadas } from "./types";
import Modal from "./Modal";
import Noticia from "./Noticia";
import { noticiasNormalizadas } from "./noticiaAPI";

// Se realizó una refactorización del código aplicando principios SOLID tales como:
// Single-responsability: se creó un nuevo componente para Noticia y otro para Modal, en lugar de darle la responsabilidad de renderización de los mismos al componente Noticias
// Liskov substitution: los componentes Noticia y Modal son ahora componentes hijos del componente Noticias, heredando los atributos de esta última
// Interface segregation: cada componente implementa sólo las interfaces que necesita, descartando así métodos que no le son de utilidad
// Además, se crearon archivos auxiliares para llamados a la API, tipos y funciones, de forma tal que el código pueda ser reutilizado

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();
      const noticiasAPI = noticiasNormalizadas(respuesta);
      setNoticias(noticiasAPI);
    };

    obtenerInformacion();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <Noticia key={n.id} noticia={n} setModal={() => setModal(n)} />
        ))}
        {modal ? (<Modal noticia={modal} setModal={() => setModal(null)}></Modal>) : null}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;