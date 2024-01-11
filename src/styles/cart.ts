import { styled } from ".";

export const CartContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    padding: '4rem 3rem 3rem',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 360,
    height: 'calc(100vh - 7rem)',
    background: '$gray800',
    zIndex: 100,

    h1: {
        fontSize: '$lg'
    }
})

export const CloseCart = styled('button', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    background: '$gray800',
    borderRadius: 6,
    border: 0,
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',

    svg: {
        display: 'block',
    },

    '&:hover': {
        background: '$gray700',
        cursor: 'pointer',
    }
})



export const ProductListingContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 24,
    width: '100%',
    
    h1: {
        marginBottom: 8,
    },
})

export const ProductListing = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20, 
    width: '100%',
})

export const ImageContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    width: 150,
    height: 96,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
})

export const ProductListingText = styled('div', {
    width: '100%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    
    p: {
        fontSize: '$md',
    },
    
    span: {
        fontSize: '$md',
        fontWeight: 'bold',
    },
    
    button: {
        padding: 0,
        background: 'transparent',
        border: 0,
        fontSize: 14,
        fontWeight: 'bold',
        color: '$green500',
        cursor: 'pointer',
        
        '&:hover': {
            color: '$green300',
        },
    },
})

export const SummaryContainer = styled('div', {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
})

export const SummaryLine = styled('span', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    fontSize: '16px'
})

export const SummaryLineTotal = styled('span', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    fontSize: '$lg',
    fontWeight: 'bold'
})

export const CheckoutButton = styled('button', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 64,
    borderRadius: 6,
    border: 0,
    background: '$green500',
    cursor: 'pointer',
    fontSize: '$md',
    fontWeight: 'bold',
    color: '$white',

    '&:disabled': {
        opacity: '0.7',
        cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
        background: '$green300',
    }
})

