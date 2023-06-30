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