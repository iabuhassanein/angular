import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { config } from '../../shared/config/path';

@Injectable()
export class EventService {
    limit: number;
    offset: number;
    constructor(private http: Http){
        this.limit = 5;
        this.offset = 0;
    }

    getEvents(){
        return this.http.get(config.api_url+'event?offset='+this.offset+'&limit='+this.limit)
            .map(res => res.json());
    }
}