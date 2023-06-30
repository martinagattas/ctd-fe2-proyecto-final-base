export const titulo = (titulo: String) => {
    const convertirTitulo = titulo.split(" ").map((string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }).join(" ");

    return convertirTitulo;
}

export const calcularMinutos = (fecha: Date) => {
    const ahora = new Date();
    const minutosTranscurridos = Math.floor(
        (ahora.getTime() - fecha.getTime()) / 60000
    );
    return minutosTranscurridos;
};