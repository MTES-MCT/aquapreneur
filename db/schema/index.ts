import { timestamp } from 'drizzle-orm/pg-core';

export const timestampCreation = {
  dateCreation: timestamp({ withTimezone: true, mode: 'date' }).defaultNow().notNull()
};

export const timestampModification = {
  dateMaj: timestamp({ withTimezone: true, mode: 'date' })
};

export const timestamps = {
  ...timestampCreation,
  ...timestampModification
};
