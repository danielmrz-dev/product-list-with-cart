import { useContext } from "react"
import removeItem from "../../../assets/images/icon-remove-item.svg"
import "./CartItem.scss"
import { CartContext } from "../../Context/CartContext"

interface CartItemProps {
    name: string
    quantity: number | undefined
    price: number
    totalPrice: number
}

export const CartItem: React.FC<CartItemProps> = ({ name, quantity = 0, price, totalPrice }) => {

    const { formatCurrency, removeItemFromCart } = useContext(CartContext)

    return (
        <div className="cart-item">
            <h4>{name}</h4>
            <div className="price-and-quantity">
                <span className="quantity">{quantity}x</span>
                <span className="unit-price">@ {formatCurrency(price)}</span>
                <span className="total-price">{formatCurrency(totalPrice)}</span>
            </div>
            <button onClick={() => {
                removeItemFromCart(name)
            }}>
                <img src={removeItem} alt="" />
            </button>
        </div>
    )
}