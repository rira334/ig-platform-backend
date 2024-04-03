import crypto from 'crypto';

const key = Buffer.from('%&$@#K)!#$)%K(@!%&$@#K)!#$)%K(@!');
const iv = Buffer.from('%&$@#K)!#$)%K(@!');

type EncryptReturn = {
  iv: string
  encryptedData: string
};

export const encrypt = (text: string): EncryptReturn => {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
};

export const decrypt = (text: EncryptReturn): string => {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
