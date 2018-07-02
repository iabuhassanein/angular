import { Component } from '@angular/core';
import { NewsService } from '../services/news.service';
import { News } from '../../objects/news';

import { config } from '../../shared/config/path';

@Component({
    selector: 'news',
    template: `
    <div class="col-md-12" *ngIf="noMore">
        <img src="/assets/images/logoloader.gif">
        <img src="/assets/images/logoloader.gif">
    </div>
        <div class="col-md-6 col-sm-6" *ngFor="let newPost of news">
            <div class="index-box-post">
                <div class="new-img-main">
                    <img *ngIf="newPost.imgLink != ''" class="wi-full" src="{{ baseURL }}{{ newPost.imgLink }}">
                </div>
                <div class="img-ik">
                    <a routerLink="/news/{{ newPost.id }}">
                        <h3>{{ newPost.title | str_limit:40 }}</h3>
                    </a>
                    <p>{{ newPost.shortDescription | str_limit:85 }}</p>
                    <a routerLink="/news/{{ newPost.id }}"><span>Read More</span></a>
                </div>
            </div>
        </div>
  `,
    providers: [NewsService]
})
export class NewsComponent {
    news: News[] = null;
    baseURL: string;
    noMore: boolean = true;
    constructor(private newsService: NewsService) {
        this.baseURL = config.image_url;
        this.newsService.getNews().subscribe(result => {
            // console.log(news);
            if(result.status) this.news = result.data;
            if (result.data.length > 0) this.noMore = false;
            
        });
    }

}
