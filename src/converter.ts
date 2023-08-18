import type { Currency, Rates } from './typings';


export const convert = (rates: Rates) => (value: number, from: Currency, to: Currency) => {
    
    if (from === "RUB") {
        return value / (rates.Valute[to].Value / rates.Valute[to].Nominal);
    }

    if (to === "RUB") {
        return value * rates.Valute[from].Value / rates.Valute[from].Nominal;
    }

    const priceToUnitTo = rates.Valute[to].Value / rates.Valute[to].Nominal;
    const priceToUnitFrom = rates.Valute[from].Value / rates.Valute[from].Nominal;

    return value * priceToUnitFrom / priceToUnitTo;
}