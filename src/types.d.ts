export interface IProductList {
    pk : number;
    id : number;
    name : string;
    price : number;
    sale_price : number;
    shipping_fee : number;
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
    recipient_name : string;
    recipient_tel : string;    
    address : string;
    address_detail : string;
    zip_code : string;
    order_request : string;
    order_items: IOrderHistoryProducts[];
    order_payment : IOrderPayment[];
    shipping_fee : number;
  }

  export interface IOrderHistoryProducts{
    product_id : number;
    product_name : string;
    sale_price : number;
    quantity : number;
    thumbnail : string;
  }

  export interface IOrderPayment{
    payment : number;
    payment_display : string;
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

  export interface ICartProduct {
    id: number;
    name: string;
    price: number;
    sale_price: number;
    shipping_fee : number;
    thumbnail: string;
  }
  
  export interface ICartList {
    id: number;
    product: ICartProduct;
    quantity: number;
  }