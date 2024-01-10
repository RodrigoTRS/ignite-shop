import { CartContainer, CheckoutButton, CloseCart, ProductListingContainer, SummaryContainer, SummaryLine } from "@/styles/cart";
import CloseImg from '../assets/icons/close.svg'
import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "@/contexts/CartContext";
import { CartItem } from "./cartItem";


export function Cart() {

    const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState(false);

    const { cartProducts, closeCart, total } = useContext(CartContext);

    async function createCheckoutSession() {
        try {
            setIsCreatingCheckoutSession(true)

            // const response = await axios.post('/api/checkout', {
            //     priceId: product.defaultPriceId,
            // })

            // const { checkoutUrl } = response.data;

            // window.location.href = checkoutUrl
        } catch (err) {
            // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
            setIsCreatingCheckoutSession(false)
            alert('Falha ao redirecionar ao checkout!')
        }
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
                            <CartItem product={product} key={product.id} />
                        )
                    })
                }
            </ProductListingContainer>
            <SummaryContainer>
                <SummaryLine>
                    <span>Quantidade</span>
                    <span>{cartProducts.length}</span>
                </SummaryLine>
                <SummaryLine>
                    <span>Valor total</span>
                    <span>{total}</span>
                </SummaryLine>
                <CheckoutButton disabled={isCreatingCheckoutSession}>
                    Finalizar compra
                </CheckoutButton>
            </SummaryContainer>

        </CartContainer>
    )
}