import type { Handler } from '@yandex-cloud/function-types';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { parse } from './parsers';
import { fetchRates } from './fetcher';
import { build } from './builder';
import { format } from './format';

const bot = new Telegraf(process.env.BOT_TOKEN || '');

bot.on(message('text'), async (ctx) => {
    const pairs = parse(ctx.message.text);
    if (pairs.length === 0) {
        return;
    }

    console.time('fetch data')
    const rates = await fetchRates();
    if (!rates) {
        console.log('Not rates data');
        return;
    }
    console.timeEnd('fetch data')
    console.time('calc currencies')
    const getResult = build(rates);
    console.timeEnd('calc currencies')
    console.time('format data')
    const paragraphs = pairs.map((pair) => {
        const head = `${ctx.message?.from.first_name} упомянул ${pair.value} ${pair.currency}`;
        const body = format(getResult(pair));
        return [head, body].join('\n');
    })
    console.timeEnd('format data');

    ctx.reply(paragraphs.join('\n'));
});

export const handler: Handler.Http =  async (event) => {
    const message = JSON.parse(event.body);
    await bot.handleUpdate(message);

    return {
        statusCode: 200,
        body: '',
    };
};
