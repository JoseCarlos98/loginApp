import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date:Date): string {
    const newDate = moment(date).format('lll');
    return newDate;
  }

}
