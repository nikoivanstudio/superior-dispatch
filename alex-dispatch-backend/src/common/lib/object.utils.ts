export type WithoutNull<T extends Record<string, unknown>> = {
  [K in keyof T as null extends T[K] ? K : never]?:
    | Exclude<T[K], null>
    | undefined;
} & {
  [K in keyof T as null extends T[K] ? never : K]: T[K];
};

const removeNullProperties = <T extends Record<string, unknown>>(
  value: T
): WithoutNull<T> => {
  return Object.fromEntries(
    Object.entries(value).filter(([, propertyValue]) => propertyValue !== null)
  ) as WithoutNull<T>;
};

export const objectUtils = { removeNullProperties };
