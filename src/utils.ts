export const normalizeCurrencyString = (v: string) => {
    // remove keywords with 'к' symbols
    v = v.replace(/бакс/gi, '');

    let originalValue = parseFloat(v.replace(/[^\d(,|\.)-]/g, ''));
    let result = originalValue;
    result = originalValue
    if(~v.indexOf("k")) result = originalValue * 1000;
    else if(~v.indexOf("к")) result = originalValue * 1000;
    else if(~v.indexOf("млрд")) result = originalValue * 1000000000;
    else if(~v.indexOf("миллиард")) result = originalValue * 1000000000;
    else if(~v.indexOf("миллион")) result = originalValue * 1000000;
    else if(~v.indexOf("млн")) result = originalValue * 1000000;
    else if(~v.indexOf("тысяч")) result = originalValue * 1000;
    else if(~v.indexOf("тыс")) result = originalValue * 1000;
    else if(~v.indexOf("сотен")) result = originalValue * 100;
    else if(~v.indexOf("сотни")) result = originalValue * 100;

    return result;
} 