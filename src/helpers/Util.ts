import randomString from 'randomstring';
import * as CurrencyCheck from 'currency-codes';

export const generateRefence = () => {
  return randomString.generate({
    charset: 'numeric',
  });
};

export const isValidCurrency = (currencyCode: string) =>
  CurrencyCheck.code(currencyCode) === undefined || null ? true : false;
