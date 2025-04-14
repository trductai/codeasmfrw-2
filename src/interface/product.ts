export interface IProduct {
  id: string|number;
  name: string;
  image: string;
  price: number;
  type: string;
  parent: number;
  rating: number;
  description: string;
  colors: string[];  // Đây là mảng chuỗi
  sizes: string[];   // Đây là mảng chuỗi
  size: string;
  color: string;
  images: string[];  // Đây là mảng chuỗi (thumbnail images)
  bestSelling: true|false
}
