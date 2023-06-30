export interface INoticiasNormalizadas {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: number | string;
    esPremium: boolean;
    imagen: string;
    descripcionCorta?: string;
}

export interface INoticia {
    noticia: INoticiasNormalizadas | null,
    setModal: (noticia: INoticiasNormalizadas | null) => void;
}