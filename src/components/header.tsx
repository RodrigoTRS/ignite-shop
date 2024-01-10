import Link from 'next/link';
import Bag from '../assets/icons/bag.svg'
import Logo from '../assets/ignite-shop.svg'
import Image from 'next/image';
import { CartButton, CartCounter, HeaderContainer } from '@/styles/pages/app';
import { Cart } from './cart';
import { useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';

export function Header() {

    const { isCartOpen, openCart, cartProducts } = useContext(CartContext);

    return (
        <HeaderContainer>
          <Link href={'/'}>
            <Image src={Logo} alt="" />
          </Link>
          <CartButton onClick={openCart}>
            <Image src={Bag} width={32} height={32} alt='' />
            {
              (cartProducts.length > 0) &&
                <CartCounter>
                  {cartProducts.length}
                </CartCounter>
            }
          </CartButton>
          {isCartOpen && <Cart />}
        </HeaderContainer>
    )
}