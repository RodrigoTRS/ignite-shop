import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"
// @ts-ignore
import { useRouter } from 'next/router';
import { useContext } from "react";
import Head from "next/head";
import { CartContext } from "@/contexts/CartContext";
import { priceFormatter } from "@/utils/formatters";

interface ProductProps {
    product: {
        id: string
        name: string
        imageUrl: string
        price: Stripe.Price
        description: string
        defaultPriceId: string
    }
}

export default function Product({ product }: ProductProps) {

    const { openCart, isCartOpen, addToCart, cartProducts } = useContext(CartContext)

    const { isFallback } = useRouter()

    if (isFallback) {
        return <p>Loading ...</p>
    }

    async function handleAddToCart() {
        
        addToCart(product);
        openCart();
    }


    return (
        <>
            <Head>
                <title>{`${product.name} - Ignite Shop`}</title>
            </Head>

            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{priceFormatter(product.price.unit_amount!)}</span>

                    <p>{product.description}</p>

                    <button disabled={isCartOpen} onClick={handleAddToCart}>
                        Adicionar ao carrinho
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
        {
            params: { id: 'prod_PKfMeUTz16kZTh' }
        }
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params!.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    });

    const price = product.default_price as Stripe.Price;

    return {
        props: {
        product: {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: price,
            description: product.description,
            defaultPriceId: price.id,
        }
        },
        revalidate: 60 * 60 * 1 // 1 hours
    }
}