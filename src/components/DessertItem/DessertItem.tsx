import cartIcon from "../../assets/images/icon-add-to-cart.svg";
import plusIcon from "../../assets/images/icon-increment-quantity.svg";
import minusIcon from "../../assets/images/icon-decrement-quantity.svg";
import "./DessertItem.scss";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/CartContext";

export interface DessertItem {
    category: string;
    image: {
        desktop: string;
        mobile: string;
        tablet: string;
        thumbnail: string;
    };
    name: string;
    price: number;
    quantity?: number
}

export const DessertItem: React.FC<DessertItem> = ({ category, image, name, price }) => {
    const [itemsNumber, setItemsNumber] = useState(0);
    const { formatCurrency, addItemToCart, removeItemFromCart, selectedItems } = useContext(CartContext);

    useEffect(() => {
        const item = selectedItems.find(item => item.name === name);
        if (item) {
            setItemsNumber(item.quantity || 0);
        } else {
            setItemsNumber(0);
        }
    }, [selectedItems, name]);

    const handleAddToCart = () => {
        addItemToCart(category, image.mobile, name, price, itemsNumber + 1, 1);
    };

    const handleRemoveFromCart = () => {
        if (itemsNumber <= 1) {
            removeItemFromCart(name);
        } else {
            addItemToCart(category, image.mobile, name, price, itemsNumber - 1, -1);
        }
    };

    return (
        <li className="desserts-list-item">
            <div className="picture-and-button">
                <picture>
                    <source media="(min-width: 846px)" srcSet={image.desktop} type="image/jpg" />
                    <img
                        src={image.mobile}
                        alt={name}
                        className="dessert-picture"
                    />
                </picture>
                <div className="add-to-card-btn">
                    {
                        itemsNumber === 0 ?
                            <button className="btn-content" onClick={handleAddToCart}>
                                <img src={cartIcon} alt="Add to cart button" />
                                Add to Cart
                            </button>
                            :
                            <div className="add-or-remove-item">
                                <button onClick={handleRemoveFromCart}>
                                    <img src={minusIcon} alt="" />
                                </button>
                                <span>{itemsNumber}</span>
                                <button onClick={handleAddToCart}>
                                    <img src={plusIcon} alt="" />
                                </button>
                            </div>
                    }
                </div>
            </div>
            <div className="description-and-price">
                <span className="dessert-type">{category}</span>
                <p className="dessert-name">{name}</p>
                <span className="dessert-price">{formatCurrency(price)}</span>
            </div>
        </li>
    );
}