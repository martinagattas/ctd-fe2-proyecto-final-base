import { rest } from "msw";
import App from "../../App";
import { setupServer } from "msw/node";
import { render } from "../../test-utils";
import { screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { API_URL } from "../../app/constants";
import userEvent from "@testing-library/user-event";

const data = {
    results: [
        {
            quote: "Shut up, brain. I got friends now. I don't need you anymore.",
            character: "Lisa Simpson",
            image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FLisaSimpson.png?1497567512083",
            characterDirection: "Right"
        }
    ],
};

export const handlers = [
    rest.get(API_URL, (req, res, ctx) => {
        return res(ctx.json(data), ctx.status(200));
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("App", () => {
    describe("Cuando renderizamos el componente", () => {
        test("No debería traer ninguna cita", async () => {
            render(
                <Provider store={store}>
                    <App />
                </Provider>
            );
            expect(screen.getByText("No se encontro ninguna cita")).toBeInTheDocument();
        });
    });
    describe("Cuando ingresamos un personaje", () => {
        beforeEach(() => {
            render(
                <Provider store={store}>
                    <App />
                </Provider>
            );
        });
        test("Si es de Los Simpsons, debería mostrar la cita", async () => {
            const user = userEvent.setup();
            const input = screen.getByRole("textbox", { name: "Author Cita" });
            const button = screen.getByRole("button", { name: "Obtener cita aleatoria"});

            await user.type(input, "Bart Simpson");
            await user.click(button);
            
            await waitFor(async () => {
                const queryText = await screen.findByText("Eat my shorts");
                expect(queryText).toBeInTheDocument();
            });
        });
        test("Si no es de Los Simpsons, debería mostrar un mensaje de error", async () => {
            const user = userEvent.setup();
            const input = screen.getByRole("textbox", { name: "Author Cita" });
            const button = screen.getByRole("button", { name: "Obtener cita aleatoria" });

            await user.type(input, "Ricky Martin");
            await user.click(button);

            await waitFor(() => {
                expect(screen.queryByText("Por favor ingrese un nombre válido")).toBeInTheDocument();
            });
        });
    });
});