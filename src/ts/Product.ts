export interface Product {
  id: string;
  uniqueId: string; // Novo campo para IDs únicos
  name: string;
  price: number;
  parcelamento: Array<number>;
  color: string;
  image: string;
  size: Array<string>;
  date: string;
}
