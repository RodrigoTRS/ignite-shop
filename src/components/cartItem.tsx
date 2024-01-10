import { CartContext } from "@/contexts/CartContext";
import { ImageContainer, ProductListing, ProductListingText } from "@/styles/cart";
import Image from "next/image";
import { useContext } from "react";

interface CartItemProps {
    product: {
        id: string
        name: string
        imageUrl: string
        price: string
        description: string
        defaultPriceId: string
    }
}

export function CartItem({ product }: CartItemProps) {

    const { removeFromCart } = useContext(CartContext);

    function handleRemoveFromCart() {
        removeFromCart(product)
    }

    return (
        <ProductListing>
            <ImageContainer>
                <Image src={product.imageUrl} width={80} height={80} alt={product.name} />
            </ImageContainer>
            <ProductListingText>
                <p>{product.name}</p>
                <span>{product.price}</span>
                <button onClick={handleRemoveFromCart}>
                    Remover
                </button>
            </ProductListingText>
        </ProductListing>
    )
}