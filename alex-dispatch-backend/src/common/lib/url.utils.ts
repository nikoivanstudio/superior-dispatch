export const superDispatchHost = 'https://carrier.superdispatch.com';

export class UrlUtils {
  static getQueryParamsString = (
    queryParams?: Record<string, string | number>
  ): string => {
    if (!queryParams) {
      return '';
    }

    return Object.entries(queryParams)
      .filter(([key, value]) => !!key && !!value)
      .reduce(
        (acc, [key, value]) =>
          (acc += `${acc !== '?' ? '&' : ''}${key}=${value}`),
        '?'
      );
  };
  public static getUrl(
    url: string,
    queryParams?: Record<string, string | number>
  ) {
    return `${url}/${this.getQueryParamsString(queryParams)}`;
  }
}
