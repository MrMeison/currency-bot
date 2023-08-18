import type { Rates } from './typings';
import {
    S3Client,
    GetObjectCommand
} from '@aws-sdk/client-s3';

import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 30 * 60 })
const RATES_KEY = 'rates_keys';

const {
    S3_ENDPOINT = 'https://storage.yandexcloud.net',
    S3_REGION = 'ru-central1-a',
    DST_NAME = 'current.json',
    DST_BUCKET = '',
    AWS_ACCESS_KEY_ID = '',
    AWS_SECRET_ACCESS_KEY = '',
} = process.env;

const s3 = new S3Client({
    endpoint: S3_ENDPOINT,
    region: S3_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID || '',
        secretAccessKey: AWS_SECRET_ACCESS_KEY  || '',
    },
});

export const fetchRates = async (): Promise<Rates | null> => {
    if (cache.has(RATES_KEY)) {
        return cache.get(RATES_KEY) as Rates;
    }

    try {
        const getCommand = new GetObjectCommand({
            Key: DST_NAME,
            Bucket: DST_BUCKET
        });

        const data = await s3.send(getCommand);
        const text = await data.Body?.transformToString('utf8');
        if (!text) {
            return null
        }

        const res = JSON.parse(text) as Rates;

        cache.set(RATES_KEY, res);

        return res;
    } catch {
        return null;
    }
}