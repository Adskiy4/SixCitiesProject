import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, User,UserType,HousingType,CityName,Convenience } from './../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(users: User[]): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData.split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => {
        const tokens = line.trim().split('\t');

        const [
          title,
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
          userStr,
          commentsCount,
          latitude,
          longitude
        ] = tokens;

        const [firstname, email, password, typeRaw, avatarPath] = userStr.split(' ');

        const type = typeRaw.toLowerCase() === 'pro'
          ? UserType.Pro
          : UserType.Standard;

        let user: User = {
          firstname,
          email,
          password,
          type,
          avatarPath
        };

        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
          user = existingUser;
        } else {
          users.push(user);
        }

        const offer: Offer = {
          title,
          description,
          publishDate: new Date(
            publishDate.split('.').reverse().join('-')
          ),
          city: city as CityName,
          adImage,
          images: images.split(' ') as [string, string, string, string, string, string],
          isPremium: isPremium.toLowerCase() === 'true',
          isFavorite: isFavorite.toLowerCase() === 'true',
          rating: parseFloat(rating),
          housingType: housingType as HousingType,
          rooms: parseInt(rooms, 10),
          guests: parseInt(guests, 10),
          price: parseInt(price, 10),
          conveniences: conveniences.split(',').map((c) => c.trim()) as Convenience[],
          user,
          commentsCount: parseInt(commentsCount, 10),
          location: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
          }
        };

        return offer;
      });
  }
}
