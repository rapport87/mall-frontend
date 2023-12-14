export interface IProductList {
    pk : number;
    name : string;
    price : number;
    sale_price : number;
    thumbnail : string;
    category : string;
    display_status : string;
  }

  export interface IProductPhoto {
    pk: string;
    photo: string;
  }

  export interface IProductDetail extends IProductList {
    description : string;
    stock : number;
    images : IProductPhoto[];
  }