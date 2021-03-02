export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt?: Date;
}

export interface Review {
  _id: string;
  title: string;
  text: string;
  product: string;
  user: string;
}

export interface Product {
  _id: string;
  brand: string;
  category: string;
  description: string;
  discount: number;
  id: number;
  name: string;
  newPro: boolean;
  pictures: [{ big: string; small: string }];
  price: number;
  sale: boolean;
  salePrice: number;
  shortDetails: string;
  stock: number;
  tags?: string[];
  date?: Date;
  isFav?: boolean;
  isCart?: boolean;
  quantity?: number;
}
