export function priceFormatter(price: number) {
    const formated = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price / 100);

    return formated;
}