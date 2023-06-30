import {
    TarjetaNoticia,
    ImagenTarjetaNoticia,
    TituloTarjetaNoticia,
    FechaTarjetaNoticia,
    DescripcionTarjetaNoticia,
    BotonLectura
} from "./styled";
import { INoticia } from "./types";

const Noticia = ({ noticia, setModal }: INoticia) => {
    return (
        <TarjetaNoticia>
            <ImagenTarjetaNoticia src={noticia?.imagen} />
            <TituloTarjetaNoticia>{noticia?.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{noticia?.fecha}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>
                {noticia?.descripcionCorta}
            </DescripcionTarjetaNoticia>
            <BotonLectura onClick={() => setModal(noticia)}>Ver más</BotonLectura>
        </TarjetaNoticia>
    );
};

export default Noticia;