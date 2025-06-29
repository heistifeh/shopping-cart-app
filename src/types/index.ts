export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  isOutOfStock: boolean;
  image: string;
  inCart: boolean;
  quantity: number;
}
