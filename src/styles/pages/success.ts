import { styled } from "@stitches/react";

export const SuccessContainer = styled('main', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    height: 656,

    h1: {
        fontSize: '$2xl',
        color: '$gray100',
    },

    p: {
        fontSize: '$md',
        color: '$gray300',
        maxWidth: 560,
        textAlign: 'center',
        margin: '0 auto',
        lineHeight: 1.4,
    },

    a: {
        display: 'block',
        marginTop: '5rem',
        color: '$green500',
        fontSize: '$lg',
        fontWeight: 'bold',
        textDecoration: 'none',

        '&:hover': {
            color: '$green300'
        }
    }
})

export const ImagesContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    margin: '4rem 0px 2rem 32px',
})

export const ImageContainer = styled('div', {
    width: 160,
    height: 160,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 99,
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -32,
    boxShadow: '0px 0px 16px 16px rgba(0,0,0,0.1)',

    img: {
        objectFit: 'cover',
    }
})