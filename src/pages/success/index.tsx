import { stripe } from "@/lib/stripe";
import { ImageContainer, ImagesContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Stripe from "stripe";

interface SuccessProps {
    costumerName: string,
    products: Stripe.LineItem[]
}

export default function Success({ costumerName, products }: SuccessProps) {

    useEffect(() => {
        console.log(products)
    })

    return (

        <>
            <Head>
                <title>Compra efetuada - Ignite Shop</title>
                <meta name="robots" content="noindex"/>
            </Head>

            <SuccessContainer>
                <h1>Compra efetuada</h1>
                <ImagesContainer>
                    {
                        products.map((product) => {
                        return (
                            <ImageContainer key={product.id}>
                                <Image src={product.price?.product.images![0]} width={120} height={120} alt="" /> 
                            </ImageContainer>
                            )
                        })
                    }
                </ImagesContainer>
                
                <p>
                    Uhul! <strong>{costumerName}</strong>, sua compra de <strong>{products.length} camisetas</strong> já está a caminho da sua casa.
                </p>

                <Link href="/">
                    Voltar ao catálogo
                </Link>
            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
    
    if (!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    
    const sessionId = String(query.session_id); 

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product'],
    })

    const costumerName = session.customer_details!.name;
    const productsArray = session.line_items!.data;

    return {
        props: {
            costumerName,
            products: productsArray
        }
    }
}