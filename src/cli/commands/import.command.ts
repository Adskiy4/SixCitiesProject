import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { createOffer, getErrorMessage } from '../../shared/helpers/index.js';
import { User } from '../../shared/types/index.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public users: User[] = [ { firstname: 'Ivan', email: 'ivan@mail.com', password: '123456', type: 'pro', avatarPath: 'ivanAva.jpg' },
    { firstname: 'Dima', email: 'dima@mail.com', password: '123456', type: 'standard', avatarPath: 'dimaAva.jpg' } ];

  private onImportedLine(line: string) {
    const offer = createOffer(line, this.users);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
