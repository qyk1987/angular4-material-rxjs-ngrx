import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex',
  pure:true
})
export class SexPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let chineseSex;
    switch (value) {
      case 'male':
        chineseSex = '男';
        break;
      case 'female':
        chineseSex = '女';
        break;
      default:
        chineseSex = '未知性别';
        break;

    }
    return chineseSex;
  }


}
