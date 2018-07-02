import { Pipe } from '@angular/core';

@Pipe({ name: 'str_limit' })
export class StringLimit {
    transform(value: string, args: number): any {
        let limit = args > 0 ? args : 10;
        let trail = false ? args : '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}