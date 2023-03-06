import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableAccountFilter'
})
export class TableAccountFilterPipe implements PipeTransform {

  transform(list: any[], value: string) {
  

    return value ? list.filter(item => item.nameRole === value) : list;
  }

}