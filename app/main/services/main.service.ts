import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import { config } from '../../shared/config/path';

@Injectable()
export class MainService {
    limit: number;
    offset: number;
    constructor(private _http: Http){
        this.limit = 4;
        this.offset = 0;
    }

    sendMessage(msg: any) {
        let headers = new Headers();
        let body = JSON.stringify(msg);
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(config.api_url + 'contactUs', body, options)
            .map(res => res.json())
            .retry(2);
    }

    getAnnouncements(offset: number, limit: number) {
        return this._http.get(config.api_url + 'news?type=announcement&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    getEvents(offset: number, limit: number) {
        return this._http.get(config.api_url + 'event?offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    getPost(getPost: number) {
        return this._http.get(config.api_url + 'news/'+getPost)
            .map(res => res.json())
            .retry(2);
    }

    getEvent(getPost: number) {
        return this._http.get(config.api_url + 'event/'+getPost)
            .map(res => res.json())
            .retry(2);
    }

}