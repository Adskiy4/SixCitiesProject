import {HousingType, CityName, Location, Сonvenience} from './support.types.js';
import {User} from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  publishDate: Date;
  city: CityName;
  adImage: string;
  images: [string, string, string, string, string, string]; // exactly 6
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  rooms: number;
  guests: number;
  price: number;
  conveniences: Сonvenience[];
  user: User;
  commentsCount: number;
  location: Location;
};
