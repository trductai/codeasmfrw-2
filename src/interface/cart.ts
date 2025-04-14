export interface ICart{
    carts:ICartProduct[],
    isOpenSidebar:boolean
}

export interface ICartProduct {
    productId: ProductId;
    quantity: number;
}
export interface ProductId {
  id: number;
  name: string;
  image: string;
  price: string;
  type: string;
  parent: number;
}
export enum TypeCart {
    "openSidebar",
    "updateCart"
}