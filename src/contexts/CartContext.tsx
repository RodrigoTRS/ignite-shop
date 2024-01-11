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

interface CartLineItems {
  price: string
  quantity: number
}

interface CartContextType {
    isCartOpen: boolean,
    cartProducts: InternalProduct[],
    checkoutLineItems: CartLineItems[],
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
    const [checkoutLineItems, setCheckoutLineItems] = useState<CartLineItems[]>([])
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
      setCheckoutLineItems((state) => {
        const productExists = state.find(item => item.price === product.defaultPriceId);

        if (productExists) {
          return state.map((item) => {
            if (item.price === product.defaultPriceId) {
              return {...item, quantity: item.quantity + 1}
            } else {
              return item
            }
          })
        } else {
          return [...state, {
            price: product.defaultPriceId,
            quantity: 1,
          }]
        }
      })
    }

    function removeFromCart(internalId: string) {
      const removedProduct = cartProducts.find((product) => {
        return product.internalId === internalId
      })

      const price = removedProduct!.product.price.unit_amount

      setCartProducts(state => state.filter(item => item.internalId !== internalId))
      setCheckoutLineItems(state => state.filter(item => item.price !== internalId))
      setTotal(state => state - price!)
    }


  return (
      <CartContext.Provider value={{
          isCartOpen,
          cartProducts,
          checkoutLineItems,
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