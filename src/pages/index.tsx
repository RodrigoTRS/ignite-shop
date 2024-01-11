import Image from "next/image"
import { GetStaticProps } from "next"
import Link from "next/link"
import Bag from '../assets/icons/bag.svg'

import Head from "next/head"

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from "../lib/stripe"
import { HomeContainer, Product } from "../styles/pages/home"

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe"
import { useContext, useEffect } from "react"
import { CartContext } from "@/contexts/CartContext"
import { priceFormatter } from "@/utils/formatters"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: Stripe.Price
  }[],
  openCartFuntion: () => void;
}



export default function Home({ products, openCartFuntion }: HomeProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48
    }
  });

  return (
    <>
      <Head>
        <title>Home - Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">

        {products.map(product => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
            <Product
              className="keen-slider__slide"
              >
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer>
                  <strong>{product.name}</strong>
                  <span>{priceFormatter(product.price.unit_amount!)}</span>
              </footer>
            </Product>
          </Link>
          )
        })}

      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });
  

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price,
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours,
  }
}