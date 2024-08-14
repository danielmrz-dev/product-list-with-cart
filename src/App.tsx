import "./styles/global.scss";
import { DessertsList } from "./components/DessertsList/Desserts-list";
import { Cart } from "./components/Cart/Cart";
import { CartProvider } from "./components/Context/CartContext";
import { Dialog } from "./components/Dialog/Dialog";

export function App() {

    return (
        <>
        <main>
            <CartProvider>
                <DessertsList />
                <Cart />
                <Dialog /> 
            </CartProvider>
        </main>
        </>
    );
}
