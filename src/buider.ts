import { convert } from './converter';
import { Currency, CurrencyResult, Rates } from './typings';
const currenciesOrder: Currency[] = ['RUB', 'USD', 'EUR', 'BYN', 'KZT'];

export const build = (rates: Rates) => (data: CurrencyResult) => {
    const converter = convert(rates);
    const result: CurrencyResult[] = [];
    for (const currency of currenciesOrder) {
        if (currency === data.currency) {
            continue;
        }
        result.push({
            currency, 
            value: converter(data.value, data.currency, currency)
        });
    }

    return result;
}