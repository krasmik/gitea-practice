import { mergeTests } from '@playwright/test';
import { test as base } from './fixtureBrowserSize';
import { test as pages } from './fixturePages';

export const test = mergeTests(base, pages);