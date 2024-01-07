import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

import Logo from '../assets/ignite-shop.svg'
import Image from 'next/image';
import { Container, Header } from '@/styles/pages/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={Logo} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
