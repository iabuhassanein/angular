import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { config } from '../../shared/config/path';

@Injectable()
export class NewsService {
    limit: number;
    offset: number;
    constructor(private http: Http){
        this.limit = 4;
        this.offset = 0;
    }

    getNews(){
        return this.http.get(config.api_url + 'news?offset='+this.offset+'&limit='+this.limit+'&type=news')
            .map(res => res.json());
    }
}