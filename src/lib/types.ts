import { type } from "arktype";

export const Percent = type("0<=number<=100");
export const PositiveInt = type("number.integer>=0");
export const Year = type("1900 <= number.integer <= 2030");
