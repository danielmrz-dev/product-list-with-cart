import { useContext } from "react"
import carbonNeutral from "../../../assets/images/icon-carbon-neutral.svg"
import { CartItem } from "../CartItem.tsx/CartItem"
import "./CartFull.scss"
import { CartContext } from "../../Context/CartContext"

export const CartFull: React.FC = () => {

    const { selectedItems, formatCurrency, dialogRef } = useContext(CartContext)

    const totalCartPrice = selectedItems.reduce((acumulador, item) => {
        return acumulador + (item.price * (item.quantity!))
    }, 0)

    const totalCartItems = selectedItems.reduce((acumulador, item) => {
        return acumulador + item.quantity!
    }, 0)

    return (
        <div className="full-cart">
            <h2>Your Cart ({totalCartItems})</h2>

            {
                selectedItems.map((item) => {
                    return (
                        <CartItem
                            key={item.name + item.category}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            totalPrice={item.price * item.quantity!}
                        />
                    )
                })
            }

            <div className="order-total">
                <span>Order Total</span>
                <span>{formatCurrency(totalCartPrice)}</span>
            </div>

            <div className="carbon-neutral-delivery">
                <img src={carbonNeutral} alt="" />
                <p>This is a <strong>carbon neutral</strong> delivery</p>
            </div>
            <button className="confirm-order-btn" onClick={() => dialogRef.current?.showModal()}>Confirm Order</button>
        </div>
    )
}