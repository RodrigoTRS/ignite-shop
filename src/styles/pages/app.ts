import { styled } from "..";

export const Container = styled('div', {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: 'center',
    minHeight: '100vh'
})

export const HeaderContainer = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1160,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    img: {
        '&:hover': {
            opacity: 0.8,
        }
    }
})

export const CartButton = styled('button', {
    background: '$gray800',
    border: 0,
    borderRadius: 6,
    padding: '0.75',
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.1s',
    position: 'relative',
    
    '&:hover': {
        background: '$gray700',
        cursor: 'pointer',
    }
})

export const CartCounter = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '$green500',
    fontSize: '12px',
    width: 24,
    height: 24,
    position: 'absolute',
    color: '$white',
    borderRadius: 999,
    top: -12,
    right: -12,
})