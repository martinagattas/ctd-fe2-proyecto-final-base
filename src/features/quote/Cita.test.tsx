import { rest } from "msw";
import { setupServer } from "msw/node";
import { render } from "../../test-utils";
import { screen, waitFor } from "@testing-library/react";
import { API_URL } from "../../app/constants";
import userEvent from "@testing-library/user-event";
import Cita from "./Cita";

const mockCita = [
    {
        quote: "Shut up, brain. I got friends now. I don't need you anymore.",
        character: "Lisa Simpson",
        image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FLisaSimpson.png?1497567512083",
        characterDirection: "Right"
    }
]

export const handlers = [
    rest.get(API_URL, (req, res, ctx) => {
        const character = req.url.searchParams.get('character');

        if(!character){
            return res(ctx.json([mockCita]), ctx.delay(150));
        }

        return res(ctx.json([]), ctx.delay(150));
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Cita", () => {
    describe("Cuando renderizamos el componente", () => {
        beforeEach(() => {
            render(<Cita />);
        });
        it("No debería traer ninguna cita", async () => {
            expect(screen.getByText(/No se encontro ninguna cita/i)).toBeInTheDocument();
        });
        it("El input de búsqueda debería estar vacío", async () => {
            const input = screen.getByRole("textbox", { name: /Author Cita/i });
            expect(input).toHaveValue('');
        });
        it("Debería haber un botón que diga: Obtener cita aleatoria", async () => {
            expect(screen.getByRole("button", { name: /Obtener cita aleatoria/i })).toBeInTheDocument();
        });
    });
    describe("Cuando hacemos clic en Obtener cita aleatoria", () => {
        it("Mientras busca una cita, debería mostrar un mensaje de carga", async () => {
            render(<Cita />);

            const button = screen.getByRole("button", { name: /Obtener cita aleatoria/i });
            userEvent.click(button);

            await waitFor(() => {
                expect(screen.getByText(/CARGANDO/i)).toBeInTheDocument();
            });
        });
    });
    describe("Cuando ingresamos un personaje en el input", () => {
        beforeEach(() => {
            render(<Cita />);
        });
        it("El botón debe cambiar su texto a: Obtener Cita", async () => {
            const input = screen.getByRole("textbox", { name: /Author Cita/i });
            const button = await screen.findByRole("button", { name: /Obtener Cita/i });

            userEvent.clear(input);
            userEvent.click(input);
            userEvent.keyboard("lisa");

            await waitFor(() => {
                expect(button).toBeInTheDocument();
            });
        });
        it("Si el personaje es de Los Simpsons, debería mostrar una cita de ese personaje", async () => {
            server.use(
                rest.get(`${API_URL}?character=lisa`, (req, res, ctx) => {
                    return res(ctx.json(mockCita), ctx.status(200));
                })
            )

            const input = screen.getByRole("textbox", { name: /Author Cita/i });
            const button = await screen.findByRole("button", { name: /Obtener Cita/i });

            userEvent.clear(input);
            userEvent.click(input);
            userEvent.keyboard("lisa");
            userEvent.click(button);

            await waitFor(() => {
                expect(screen.getByText(mockCita[0].character)).toBeInTheDocument();
            });
        });
        it("Si ingreso un número o el personaje no es de Los Simpsons, debería mostrar un mensaje de error", async () => {
            server.use(
                rest.get(`${API_URL}?character=ricky`, (req, res, ctx) => {
                    return res(ctx.json([]), ctx.status(200));
                })
            )

            const input = screen.getByRole("textbox", { name: /Author Cita/i });
            const button = await screen.findByRole("button", { name: /Obtener Cita/i });

            userEvent.clear(input);
            userEvent.click(input);
            userEvent.keyboard("ricky");
            userEvent.click(button);

            await waitFor(() => {
                expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument();
            });
        });
    });
    describe("Cuando hacemos clic en el botón Borrar", () => {
        beforeEach(() => {
            render(<Cita />);
        });
        it("Debería limpiar el input para buscar personajes", async () => {
            const input = screen.getByRole("textbox", { name: /Author Cita/i });
            const button = screen.getByRole("button", { name: /Borrar/i });

            userEvent.clear(input);
            userEvent.click(input);
            userEvent.keyboard("lisa");
            userEvent.click(button);

            await waitFor(() => {
                expect(input).toHaveValue('');
            });
        });
        it("No debería traer ninguna cita", async () => {
            const button = screen.getByRole("button", { name: /Borrar/i });
            userEvent.click(button);

            await waitFor(() => {
                expect(screen.getByText(/No se encontro ninguna cita/i)).toBeInTheDocument();
            });
        });
    });
});