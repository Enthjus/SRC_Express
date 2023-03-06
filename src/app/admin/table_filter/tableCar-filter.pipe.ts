import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableCarsFilter'
})
export class TableCarsFilterPipe implements PipeTransform {

  transform(list: any[], value: string) {
  

    return value ? list.filter(item => item.typeName === value) : list;
  }

}