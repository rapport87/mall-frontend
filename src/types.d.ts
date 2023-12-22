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
    detailed_description : string;
  }

  export interface IOrderHistoryList {
    username:string;
    order_id: number;
    sale_price: number;
    first_product: string;
    first_product_thumbnail: string;
    total_product_price: number;
    created_at: string; 
    order_items: IOrderProducts[];
  }

  export interface IOrderHistoryProducts{
    product_id : number;
    product_name : string;
    sale_price : number;
    quantity : number;
    thumbnail : string;
  }

  export interface IUser {
    id : number;
    username: string;
    email: string;
    name: string;
  }

  export interface IReceiverInfoProps {
    recipientName: string;
    recipientContact: string;
    address: string;
    addressDetail: string;
    zipCode: string;
  }  