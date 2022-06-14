import randomString from 'randomstring';

export const generateRefence = () => {
  return randomString.generate({
    charset: 'numeric',
  });
};

export const CurrencyConverter = async (
  from: string,
  to: string,
  amount: number,
) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const sdk = require('api')('@the-petra/v1.0#5e8mc4bl2htdu5u');
  const processedData = await sdk['exchange-rates'](
    { from, to, amount },
    {
      Authorization: 'Bearer sk_test_10nG34xx3Yvm0XvvZBF2HKsnaL8JZb71',
    },
  );
  return processedData;
};
