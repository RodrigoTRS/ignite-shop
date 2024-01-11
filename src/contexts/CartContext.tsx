import Product from "@/pages/product/[id]"
import { ReactNode, createContext, useState } from "react"
import uuid from "react-uuid"
import Stripe from "stripe"

interface Product {
    id: string
    name: string
    imageUrl: string
    price: Stripe.Price
    description: string
    defaultPriceId: string
}

interface InternalProduct {
  internalId: string,
  product: Product
}

interface CartContextType {
    isCartOpen: boolean,
    cartProducts: InternalProduct[],
    total: number,
    openCart: () => void,
    closeCart: () => void,
    addToCart: (product: Product) => void,
    removeFromCart: (internalId: string) => void,
}

interface ProfileContextProps {
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextType)

export function CartProvider({children}: ProfileContextProps) {
    const [cartProducts, setCartProducts] = useState<InternalProduct[]>([])
    const [total, setTotal] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);

    function openCart() {
        setIsCartOpen(true)
      }
    
      function closeCart() {
        setIsCartOpen(false)
      }

      function addToCart(product: Product) {
        const newInternalProduct = {
          product: product,
          internalId: uuid(),
        }
        setCartProducts(state => [...state, newInternalProduct])
        setTotal(state => state + product.price.unit_amount!)
      }

      function removeFromCart(internalId: string) {
        const removedProduct = cartProducts.find((product) => {
          return product.internalId === internalId
        })

        const price = removedProduct!.product.price.unit_amount

        setCartProducts(state => state.filter(item => item.internalId !== internalId))
        setTotal(state => state - price!)
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