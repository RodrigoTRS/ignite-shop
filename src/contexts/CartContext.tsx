import Product from "@/pages/product/[id]"
import { ReactNode, createContext, useState } from "react"

interface Product {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
}

interface CartContextType {
    isCartOpen: boolean,
    cartProducts: Product[],
    total: number,
    openCart: () => void,
    closeCart: () => void,
    addToCart: (product: Product) => void,
    removeFromCart: (product: Product) => void,
}

interface ProfileContextProps {
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextType)

export function CartProvider({children}: ProfileContextProps) {
    const [cartProducts, setCartProducts] = useState<Product[]>([])
    const [total, setTotal] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);

    function openCart() {
        setIsCartOpen(true)
      }
    
      function closeCart() {
        setIsCartOpen(false)
      }

      function addToCart(product: Product) {
        setCartProducts(state => [...state, product])
        setTotal(product.price)
      }

      function removeFromCart(product: Product) {
        setCartProducts(state => state.filter(item => item.id !== product.id))
        setTotal('0')
      }

    return (
        <CartContext.Provider value={{
            isCartOpen,
            cartProducts,
            total,
            openCart,
            closeCart,
            addToCart,
            removeFromCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}