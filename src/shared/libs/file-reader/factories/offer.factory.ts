import { Offer, User, CityName, HousingType, Convenience } from './../../../types/index.js';

export class OfferFactory {
  public static create(
    rawData: {
      title: string;
      description: string;
      publishDate: string;
      city: string;
      previewImage: string;
      images: string;
      isPremium: string;
      isFavorite: string;
      rating: string;
      housingType: string;
      rooms: string;
      guests: string;
      price: string;
      conveniences: string;
      userInfo: string
      commentsCount: string;
      location: string;
    },
    users: User[]
  ): Offer | null {
    try {
      const publishDate = new Date(rawData.publishDate);

      const city = CityName[rawData.city as keyof typeof CityName];
      if (!city) {
        return null;
      }

      const housingType = HousingType[rawData.housingType as keyof typeof HousingType];
      if (!housingType) {
        return null;
      }

      const images = rawData.images.split(' ');
      if (images.length !== 6) {
        return null;
      }

      const isPremium = rawData.isPremium === 'True';
      const isFavorite = rawData.isFavorite === 'True';

      const rating = parseFloat(rawData.rating.replace(',', '.'));
      if (isNaN(rating) || rating < 1 || rating > 5) {
        return null;
      }

      const rooms = parseInt(rawData.rooms, 10);
      const guests = parseInt(rawData.guests, 10);
      const price = parseInt(rawData.price, 10);
      const commentsCount = parseInt(rawData.commentsCount, 10);

      const conveniences = rawData.conveniences
        .split(',')
        .map((c) => c.trim())
        .map((c) => Convenience[c as keyof typeof Convenience])
        .filter((c): c is Convenience => !!c);
      if (conveniences.length === 0) {
        return null;
      }

      const [latStr, lngStr] = rawData.location.split(' ');
      const latitude = parseFloat(latStr);
      const longitude = parseFloat(lngStr);
      if (isNaN(latitude) || isNaN(longitude)) {
        return null;
      }

      const userParts = rawData.userInfo.split(' ');
      const emailInfo = userParts[1];

      const user = users.find((u) => u.email === emailInfo);
      if (!user) {
        return null;
      }

      if (
        rawData.title.length < 10 || rawData.title.length > 100 ||
        rawData.description.length < 20 || rawData.description.length > 1024 ||
        rooms < 1 || rooms > 8 ||
        guests < 1 || guests > 10 ||
        price < 100 || price > 100000
      ) {
        return null;
      }

      return {
        title: rawData.title,
        description: rawData.description,
        publishDate,
        city,
        adImage: rawData.previewImage,
        images: images as [string, string, string, string, string, string],
        isPremium,
        isFavorite,
        rating,
        housingType,
        rooms,
        guests,
        price,
        conveniences,
        user,
        commentsCount,
        location: { latitude, longitude }
      };
    } catch {
      return null;
    }
  }
}
