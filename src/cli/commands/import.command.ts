import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { User, UserType } from '../../shared/types/index.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public users: User[] = [
    { firstname: 'Ivan', email: 'ivan@mail.com', password: '123456', type: UserType.Pro, avatarPath: 'ivanAva.jpg' },
    { firstname: 'Dima', email: 'dima@mail.com', password: '123456', type: UserType.Standard, avatarPath: 'dimaAva.jpg' }
  ];

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray(this.users));
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
