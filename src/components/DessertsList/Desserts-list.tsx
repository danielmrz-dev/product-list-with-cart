import { useContext } from "react";
import { DessertItem } from "../DessertItem/DessertItem";
import "./desserts-list.scss";
import { CartContext } from "../Context/CartContext";
import { InfinitySpin } from 'react-loader-spinner';

export const DessertsList: React.FC = () => {

    const { desserts } = useContext(CartContext)

    return (
        <section>
            <h1 className="title">Desserts</h1>
            <ul className="desserts-list">
                {
                    desserts.length === 0 ?  
                    <InfinitySpin
                        width="200"
                        color="#c73a0f"
                    /> 
                :
                desserts.map((dessert) => {
                    return (
                        <DessertItem
                            key={dessert.category + dessert.name}
                            name={dessert.name}
                            category={dessert.category}
                            image={dessert.image}
                            price={dessert.price}
                        />
                    )
                })}
            </ul>
        </section>
    );
};
