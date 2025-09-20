export type UserType =
  |'standard'
  | 'pro';

export type CityName =
  | 'Paris'
  | 'Cologne'
  | 'Brussels'
  | 'Amsterdam'
  | 'Hamburg'
  | 'Dusseldorf';

export type HousingType =
  | 'apartment'
  | 'house'
  | 'room'
  | 'hotel';

export type Сonvenience =
  | 'Breakfast'
  | 'Air conditioning'
  | 'Laptop friendly workspace'
  | 'Baby seat'
  | 'Washer'
  | 'Towels'
  | 'Fridge';

export type Location = {
  latitude: number;
  longitude: number;
};
