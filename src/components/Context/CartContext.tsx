import { createContext, useEffect, useRef, useState } from "react";
import { DessertItem } from "../DessertItem/DessertItem";
import axios from "axios";

export const CartContext = createContext({} as CartContextData);

interface CartProviderProps {
    children: React.ReactNode;
}

interface CartContextData {
    formatCurrency: (price: number) => string;
    addItemToCart: (category: string, image: string, name: string, price: number, quantity: number | undefined, plusOneOrMinusOne: number) => void;
    desserts: DessertItem[];
    setDesserts: React.Dispatch<React.SetStateAction<DessertItem[]>>;
    selectedItems: DessertItem[]
    setSelectedItems:  React.Dispatch<React.SetStateAction<DessertItem[]>>;
    removeItemFromCart: (id: string) => void
    dialogRef: React.MutableRefObject<HTMLDialogElement | null>
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {

    const [selectedItems, setSelectedItems] = useState([] as DessertItem[])

    const dialogRef = useRef<HTMLDialogElement | null>(null) 

    function addItemToCart(category: string, image: string, name: string, price: number, quantity: number = 1, plusOneOrMinusOne: number): void {
        const selectedItem: DessertItem = {
            category: category,
            image: {
                desktop: image,
                mobile: image,
                tablet: image,
                thumbnail: image,
            },
            name: name,
            price: price,
            quantity: quantity
        };
    
        setSelectedItems(prevItems => {
            const itemIndex = prevItems.findIndex(item =>
                item.name === selectedItem.name &&
                item.category === selectedItem.category &&
                item.price === selectedItem.price
            );
    
            if (itemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[itemIndex].quantity = (updatedItems[itemIndex].quantity || 0) + plusOneOrMinusOne;
                return updatedItems;
            } else {
                return [...prevItems, selectedItem];
            }
        });
    }

    function removeItemFromCart(name: string): void {
        setSelectedItems(prevItems => {
            const updatedItems = prevItems.map(item => 
                item.name === name ? { ...item, quantity: 0 } : item
            );
            return updatedItems.filter(item => item.quantity! > 0);
        });
    }
    

    const [desserts, setDesserts] = useState([] as DessertItem[]);
    
    useEffect(() => {
        async function getData() {
            const data = await axios.get("./data.json");
            const desserts = data.data;
            setDesserts(desserts)
        }
        getData();
    }, []);

    function formatCurrency(price: number): string {
        const formattedPrice = price.toLocaleString("en-us", {
            style: "currency",
            currency: "USD",
        });
        return formattedPrice;
    }

    return (
        <CartContext.Provider
            value={{
                formatCurrency,
                desserts,
                setDesserts,
                addItemToCart,
                selectedItems,
                setSelectedItems,
                removeItemFromCart,
                dialogRef
            }}
        >
            {children}
        </CartContext.Provider>
    )
}