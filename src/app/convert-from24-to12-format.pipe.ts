import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertFrom24To12Format'
})
export class ConvertFrom24To12FormatPipe implements PipeTransform {

    transform(time: any): any {
      //console.log(parseInt(time));
        let hour = (time.split(':'))[0]
        let min = (time.split(':'))[1]
        //console.log(hour);
        
        let part = hour >= 12 ? 'pm' : 'am';
        min = (min+'').length == 1 ? `0${min}` : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour+'').length == 1 ? `0${hour}` : hour;
        return `${hour}:${min} ${part}`
      
}
}
