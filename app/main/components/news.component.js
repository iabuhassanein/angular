"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var news_service_1 = require('../services/news.service');
var NewsComponent = (function () {
    function NewsComponent(newsService) {
        var _this = this;
        this.newsService = newsService;
        this.baseURL = 'http://kfupm.mmed.email:8080';
        this.newsService.getNews().subscribe(function (news) {
            // console.log(news);
            _this.news = news;
        });
    }
    NewsComponent = __decorate([
        core_1.Component({
            selector: 'news',
            template: "\n        <div class=\"col-md-6 col-sm-6\" *ngFor=\"let newPost of news\">\n            <div class=\"index-box-post\">\n                <div class=\"new-img-main\">\n                    <img *ngIf=\"newPost.imgLink != ''\" class=\"wi-full\" src=\"{{ baseURL }}{{ newPost.imgLink }}\">\n                </div>\n                <div class=\"img-ik\">\n                    <a routerLink=\"/news/{{ newPost.id }}\">\n                        <h3>{{ newPost.title }}</h3>\n                    </a>\n                    <p>{{ newPost.description }}</p>\n                    <a routerLink=\"/news/{{ newPost.id }}\"><span>Read More</span></a>\n                </div>\n            </div>\n        </div>\n  ",
            providers: [news_service_1.NewsService]
        }), 
        __metadata('design:paramtypes', [news_service_1.NewsService])
    ], NewsComponent);
    return NewsComponent;
}());
exports.NewsComponent = NewsComponent;
//# sourceMappingURL=news.component.js.map