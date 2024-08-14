import "./Dialog.scss";
import orderConfirmed from "../../assets/images/icon-order-confirmed.svg";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

export const Dialog: React.FC = () => {

    const { dialogRef, selectedItems, setSelectedItems, formatCurrency } = useContext(CartContext)

    const totalCartPrice = selectedItems.reduce((acumulador, item) => {
        return acumulador + (item.price * (item.quantity!))
    }, 0)

    return (
        <dialog className="dialog" ref={dialogRef}>
            <img src={orderConfirmed} alt="" />
            <div className="order-confirmed-text">
                <h2>Order Confirmed</h2>
                <p>We hope you enjoy your food!</p>
            </div>
            <div className="list-and-items">
                <ul className="items-selected-list">
                    {
                        selectedItems.map((item) => {
                            return (
                                <li className="selected-item" key={item.name + item.category}>
                                    <img src={item.image.thumbnail} alt="" />
                                    <h3>{item.name}</h3>
                                    <span className="item-price-container">
                                        <span className="quantity">{item.quantity}x</span>
                                        <span className="item-price">@ {formatCurrency(item.price)}</span>
                                    </span>
                                    <span className="total-item-price">{formatCurrency(item.price * item.quantity!)}</span>
                                <hr />
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="order-total">
                    <span>Order total</span>
                    <span>{formatCurrency(totalCartPrice)}</span>
                </div>
            </div>
            <button className="start-new-order-btn" onClick={() => {
                    dialogRef.current?.close()
                    setSelectedItems([])
                }}>Start a new order</button>
        </dialog>
    )
}