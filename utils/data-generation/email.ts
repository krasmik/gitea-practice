import { faker } from "@faker-js/faker";

export function generateUniqueEmail(): string {
    return `krasmik+${faker.number.int()}@qamadness.com`;
}
