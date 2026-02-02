export const buildQueryParams = (params: Record<string, any>): string => {
  const query = Object.entries(params)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== '',
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join('&');

  return query ? `?${query}` : '';
};

export const validateFields = obj => {
  for (const key in obj) {
    const value = obj[key];

    if (
      value === '' ||
      value === null ||
      value === undefined ||
      value.trim?.() === ''
    ) {
      return [false, key];
    }
  }

  return [true];
};
