export type PopcornFlavor = 'caramel' | 'respresso' | 'butter' | 'cheddar' | 'kettle';

export interface PopcornPrices {
  caramel: number;
  respresso: number;
  butter: number;
  cheddar: number;
  kettle: number;
}

export interface DiscountResponse {
  code: string;
  price: number;
  popcornPrices?: PopcornPrices;
  description: string;
  isActive: boolean;
  requiresEmail: boolean;
}

export interface OrderPayload {
  firstName: string;
  lastName: string;
  company: string;
  phoneNumber: string;
  email: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  discountCode: string;
  popcornQuantities: PopcornPrices;
}
