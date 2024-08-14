import emptyCartImage from "../../../assets/images/illustration-empty-cart.svg";
import "./CartEmpty.scss";

export const CartEmpty: React.FC = () => {
    return (
        <div className="empty-cart">
            <h2>Your Cart (0)</h2>
            <img src={emptyCartImage} alt="" />
            <p>Your added items will appear here.</p>        
        </div>        
    );
};
