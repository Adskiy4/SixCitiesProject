import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, User } from './../../types/index.js';
import { OfferFactory } from './factories/offer.factory.js';

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

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.trim().split('\t'))
      .filter((parts) => parts.length === 17)
      .map((parts) => ({
        title: parts[0],
        description: parts[1],
        publishDate: parts[2],
        city: parts[3],
        previewImage: parts[4],
        images: parts[5],
        isPremium: parts[6],
        isFavorite: parts[7],
        rating: parts[8],
        housingType: parts[9],
        rooms: parts[10],
        guests: parts[11],
        price: parts[12],
        conveniences: parts[13],
        userInfo: parts[14],
        commentsCount: parts[15],
        location: parts[16]
      }))
      .map((rawOffer) => OfferFactory.create(rawOffer, users))
      .filter((offer): offer is Offer => offer !== null);
  }
}
