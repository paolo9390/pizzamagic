export interface PizzaMagicShop {
  _id?: number;
  name: string;
  postcode: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  fulfillment_methods?: ShopFulfillmentMethod[];
  opening_hours?: OpeningHours[];
}

export interface ShopInfo {
  fulfillment_method: ShopFulfillmentMethod;
  opening_hours: OpeningHours;
}

export interface ShopFulfillmentMethod {
  shop_id: number;
  name: string;
  label: string;
  asap: ASAP;
  radius?: number;
  max_radius?: number;
  delivery_fee?: number;
  non_asap_minutes: number;
  times: DailyOpenClose;
}

export interface ASAP {
  label: string;
  display_label: string;
  range: string;
  selected_time: {
    day: string;
    time: string;
  }
}

export interface OpeningHours {
  shop_id: number;
  mon: DailyOpenClose;
  tue: DailyOpenClose;
  wed: DailyOpenClose;
  thu: DailyOpenClose;
  fri: DailyOpenClose;
  sat: DailyOpenClose;
  sun: DailyOpenClose;
}

export interface DailyOpenClose {
  open: string;
  close: string;
}

export interface ShopLocation {
  name: string;
  postcode: string;
  address: string;
  distance: number;
}
