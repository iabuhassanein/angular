
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'readableBoolean'})
export class ReadableBoolean implements PipeTransform {
  transform(value: string, args: string[]): any {
    if(value) 
        return 'Yes';
    
    return 'No';
  }
}