import randomString from 'randomstring';

export const generateRefence = () => {
  return randomString.generate({
    charset: 'numeric',
  });
};
