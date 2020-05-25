export interface PizzaMagicShop {
  _id?: number;
  name: string;
  postcode: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
}


export interface ShopLocation {
  name: string;
  postcode: string;
  address: string;
  distance: number;
}
