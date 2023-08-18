export type Currency = 'USD' | 'EUR' | 'RUB' | 'BYN' | 'KZT';

type CurrencyResult = {
    value: number;
    currency: Currency;
}

type Valute = {
    Value: number;
    Nominal: number;
}

type Rates = {
    Valute: Record<Currency, Valute>
}