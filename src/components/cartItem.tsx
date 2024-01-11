import { CartContext } from "@/contexts/CartContext";
import { ImageContainer, ProductListing, ProductListingText } from "@/styles/cart";
import { priceFormatter } from "@/utils/formatters";
import Image from "next/image";
import { useContext } from "react";
import Stripe from "stripe";

interface CartItemProps {
    internalId: string,
    product: {
        id: string
        name: string
        imageUrl: string
        price: Stripe.Price
        description: string
        defaultPriceId: string
    }
    
}

export function CartItem(props: CartItemProps) {

    const { removeFromCart } = useContext(CartContext);

    function handleRemoveFromCart() {
        removeFromCart(props.internalId)
    }

    return (
        <ProductListing>
            <ImageContainer>
                <Image src={props.product.imageUrl} width={80} height={80} alt={props.product.name} />
            </ImageContainer>
            <ProductListingText>
                <p>{props.product.name}</p>
                <span>{priceFormatter(props.product.price.unit_amount!)}</span>
                <button onClick={handleRemoveFromCart}>
                    Remover
                </button>
            </ProductListingText>
        </ProductListing>
    )
}