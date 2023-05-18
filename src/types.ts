export interface Address {
  street: string;
  number: number;
}

export interface Professional {
  id: string;
  name: string;
  specialties: string[];
  rating: number;
  ratingQuantity: number;
  address: Address;
}
