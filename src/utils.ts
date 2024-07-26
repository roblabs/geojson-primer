// File:  src/utils.ts
// Source:  https://github.com/codustry/geojson-toolkit
// SPDX-License-Identifier: ISC

import { InvalidArgumentError } from "commander";

export function validateInt(value: string) {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError("Not a number.");
  }
  return parsedValue;
}

function actionErrorHanlder(error: Error) {
  console.error(error.message);
}

export function actionRunner(fn: (...args: any[]) => Promise<void>) {
  return (...args: any[]) => fn(...args).catch(actionErrorHanlder);
}
