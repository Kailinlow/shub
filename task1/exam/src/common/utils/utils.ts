import * as moment from 'moment';
import slugify from 'slugify';

export const generateFilename = (originalname) => {
  const tokens = originalname.split('.');
  const ext = tokens[tokens.length - 1];
  const name = tokens.slice(0, tokens.length - 1).join(' ');
  const date = moment().unix();
  return {
    ext,
    filename: `${slugify(name, { remove: /[*+~.()'"!:@]/g })}_${date}.${ext}`,
  };
};

export class UtilsService {
  public static toCamelCase(columnName: string): string {
    return columnName
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
  }

  public static mergeDateTime(dateString: string, timeString: string): Date {
    const dateTimeString = `${dateString} ${timeString}`;

    const [datePart, timePart] = dateTimeString.split(' ');

    const [day, month, year] = datePart.split('/').map(Number);

    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes, seconds);
  }
}
