import { Offer, User, isCityName, isConvenience, isHousingType, isUserType } from '../types/index.js';

export function createOffer(offerData: string, users: User[]): Offer {
  const [title,
    description,
    publishDate,
    city,
    adImage,
    images,
    isPremium,
    isFavorite,
    rating,
    housingType,
    rooms,
    guests,
    price,
    conveniences,
    firstname,
    email,
    avatarPath,
    password,
    typeRaw,
    commentsCount,
    latitude,
    longitude
  ] = offerData.replace('\n','').split('\t');
  let user: User = {
    firstname,
    email,
    password,
    type: isUserType(typeRaw) ?? undefined,
    avatarPath
  };
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    user = existingUser;
  } else {
    users.push(user);
  }

  return {
    title,
    description,
    publishDate: new Date(publishDate.split('.').reverse().join('-')),
    city: isCityName(city) ?? 'Amsterdam',
    adImage,
    images: images.split(' ') as [string, string, string, string, string, string],
    isPremium: isPremium.toLowerCase() === 'true',
    isFavorite: isFavorite.toLowerCase() === 'true',
    rating: parseFloat(rating),
    housingType: isHousingType(housingType) ?? 'apartment',
    rooms: parseInt(rooms, 10),
    guests: parseInt(guests, 10),
    price: parseInt(price, 10),
    conveniences: conveniences.split(',').map((c) => isConvenience(c.trim()) ?? 'Fridge'),
    user,
    commentsCount: Number.parseInt(commentsCount, 10),
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude)
    }
  };
}
