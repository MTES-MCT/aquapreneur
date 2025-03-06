import { encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';
import crypto from 'crypto';

export const sha256Digest = (str: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(str);
  return hash.digest('hex');
};

export const generateApiToken = (numBytes = 32) => {
  const token = encodeBase32LowerCaseNoPadding(crypto.randomBytes(numBytes));
  return {
    token,
    digest: sha256Digest(token)
  };
};
