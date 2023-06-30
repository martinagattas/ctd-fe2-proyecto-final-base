import {
    ContenedorModal,
    TarjetaModal,
    CloseButton,
    ImagenModal,
    CotenedorTexto,
    TituloModal,
    DescripcionModal,
    BotonSuscribir
} from "./styled";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { INoticia } from './types';

const Modal = ({ noticia, setModal }: INoticia) => {
    return (
        <ContenedorModal>
            <TarjetaModal>
                <CloseButton onClick={() => setModal(null)}>
                    <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={noticia?.esPremium ? SuscribeImage : noticia?.imagen} alt={noticia?.esPremium ? 'mr-burns-excelent' : 'news-image'} />
                <CotenedorTexto>
                    <TituloModal>{noticia?.esPremium ? 'Suscríbete a nuestro Newsletter' : noticia?.titulo}</TituloModal>
                    <DescripcionModal>{noticia?.esPremium ? 'Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos.' : noticia?.descripcion}</DescripcionModal>
                    {noticia?.esPremium ? (
                        <BotonSuscribir
                            onClick={() =>
                                setTimeout(() => {
                                    alert("Suscripto!");
                                    setModal(null);
                                }, 1000)
                            }
                        >
                            Suscríbete
                        </BotonSuscribir>
                    ) : ''}:
                </CotenedorTexto>
            </TarjetaModal>
        </ContenedorModal>
    );
}

export default Modal;