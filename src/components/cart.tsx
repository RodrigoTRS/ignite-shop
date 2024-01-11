import { CartContainer, CheckoutButton, CloseCart, ProductListingContainer, SummaryContainer, SummaryLine, SummaryLineTotal } from "@/styles/cart";
import CloseImg from '../assets/icons/close.svg'
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";
import { CartContext } from "@/contexts/CartContext";
import { CartItem } from "./cartItem";
import { priceFormatter } from "@/utils/formatters";
import axios from "axios";



export function Cart() {

    const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState(false);
    
    const { checkoutLineItems, cartProducts, closeCart, total } = useContext(CartContext);

    async function createCheckoutSession() {
        try {
            setIsCreatingCheckoutSession(true)
            
            const response = await axios.post('/api/checkout', {
                lineItems: checkoutLineItems,
            })

            const { checkoutUrl } = response.data;
            
            window.location.href = checkoutUrl
            
        } catch (err) {
            // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
            alert('Falha ao redirecionar ao checkout!')
            console.error(err)
        } finally {
            setIsCreatingCheckoutSession(false)
        }
    }
    
    
    function handleCheckoutClick() {
        createCheckoutSession()
    }

    return (
        <CartContainer>
            <CloseCart onClick={closeCart}>
                <Image src={CloseImg} width={24} height={24} alt="" />
            </CloseCart>

            <ProductListingContainer>
                <h1>Sacola de compras</h1>
                {
                    (cartProducts.length > 0) && cartProducts.map((product) => {
                        return (
                            <CartItem product={product.product} internalId={product.internalId} key={product.internalId} />
                        )
                    })
                }

                {cartProducts.length === 0 &&
                    <p>Carrinho vazio</p>
                }
            </ProductListingContainer>

            

            <SummaryContainer>
                <SummaryLine>
                    <span>Quantidade</span>
                    <span>{cartProducts.length}</span>
                </SummaryLine>
                <SummaryLineTotal>
                    <span>Valor total</span>
                    <span>{priceFormatter(total)}</span>
                </SummaryLineTotal>
                <CheckoutButton disabled={isCreatingCheckoutSession} onClick={handleCheckoutClick}>
                    Finalizar compra
                </CheckoutButton>
            </SummaryContainer>

        </CartContainer>
    )
}