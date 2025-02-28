import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

import type { InferSelectModel } from 'drizzle-orm';

// Basé sur https://lucia-auth.com/sessions/basic-api/drizzle-orm
export const usersTable = pgTable('users', {
  id: serial().primaryKey(),
  email: text()
});

export const sessionsTable = pgTable('sessions', {
  id: text().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  expiresAt: timestamp({
    withTimezone: true,
    mode: 'date'
  }).notNull()
});

export type User = InferSelectModel<typeof usersTable>;
export type Session = InferSelectModel<typeof sessionsTable>;
