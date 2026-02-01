import { BASE_URL } from './environment';
import { buildQueryParams } from '../utils/helperFunctions';

type Params = string | number;

interface queryParams {
  title?: String;
  price?: Number;
  price_min?: Number;
  price_max?: Number;
  categoryId?: String;
}

export const getAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/api/v1/products`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

export const getProductByID = async (params: Params) => {
  const response = await fetch(`${BASE_URL}/api/v1/products/${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

export const getProductsByFilters = async (params: queryParams) => {
  const queryString = buildQueryParams(params);
  const response = await fetch(`${BASE_URL}/api/v1/products${queryString}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

export const getAllCategory = async () => {
  const response = await fetch(`${BASE_URL}/api/v1/categories`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

export const getSingleCategory = async (params: Params) => {
  const response = await fetch(`${BASE_URL}/api/v1/categories/${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
