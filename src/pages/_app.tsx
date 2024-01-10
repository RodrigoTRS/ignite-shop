import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import { Container } from '@/styles/pages/app';
import { Header } from '@/components/header';
import { CartProvider } from '@/contexts/CartContext';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {

  return (
    <CartProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}

