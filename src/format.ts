
import type { Currency, CurrencyResult } from './typings';

type Formatter = (value: number) => string;

const formatMap: Record<Currency, Formatter>  = {
    RUB: (value) => `🇷🇺 RUB — ${value.toFixed(2)}`,
    USD: (value) => `🇺🇸 USD — ${value.toFixed(2)}`,
    EUR: (value) => `🇪🇺 EUR — ${value.toFixed(2)}`,
    BYN: (value) => `🇧🇾 BYN — ${value.toFixed(2)}`,
    KZT: (value) => `🇰🇿 KZT — ${value.toFixed(2)}`,
}

export const format = (data: CurrencyResult[]): string => {
    return data.map((res) => formatMap[res.currency](res.value)).join('\n');
}
