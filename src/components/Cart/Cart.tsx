import { useContext } from "react";
import "./Cart.scss";
import { CartFull } from "./CartFull/CartFull";
import { CartEmpty } from "./CartEmpty/CartEmpty";
import { CartContext } from "../Context/CartContext";


export const Cart: React.FC = () => {

    const { selectedItems } = useContext(CartContext);

    return (
        <section className="cart">
            { selectedItems.length === 0 ? <CartEmpty/> : <CartFull/> }           
        </section>
    );
};
