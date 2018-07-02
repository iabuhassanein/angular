import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

// Services
import { AlertService } from '../../shared/services/alert.service';
import { ContentService } from '../services/content.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ValidationService } from '../../common/services/validation.service';


// Objects
import { Content } from '../../objects/content';

declare var $: any;
declare var Quill: any;
@Component({
    moduleId: module.id,
    selector: 'td-content',
    templateUrl: 'content.template.html',
    providers: [ContentService, ValidationService]
})

export class ContentComponent {
    // newContentForm: FormGroup;
    creatingContent: boolean = false;
    editingContent: boolean = false;
    isCreating: boolean = false;
    isUpdating: boolean = false;
    contentEdit: Content;
    contentNew: Content;
    limit: number = 5;
    offset: number = 0;
    noMore: boolean = false;
    coms_pages: number[] = [];
    comsCount: number = 0;
    currentPage: number = 1;
    comsData: Content[] = [];
    comsDataCal: Content[] = [];
    comsAllData: Content[] = [];
    limitA: number = 5;
    offsetA: number = 0;
    noMoreA: boolean = false;
    coms_pagesA: number[] = [];
    comsCountA: number = 0;
    currentPageA: number = 1;
    comsDataA: Content[] = [];
    comsDataACal: Content[] = [];
    comsAllDataA: Content[] = [];
    constructor(
        private _contentService: ContentService,
        private _alertService: AlertService,
        private _authService: AuthenticationService,
        private _fb: FormBuilder
    ) { }

    ngOnInit() {
        this._contentService.getAnnouncements(this.offset, this.limit).subscribe(
            result => {
                if (result.status) {
                    this.comsAllData = result.data;
                    this.comsCount = result.count;
                    this.comsDataCal = result.dataCalendar;
                    this.coms_pages = Array(Math.ceil(this.comsCount / this.limit)).fill(1);
                    this.comsData = this.comsAllData.slice(0, this.limit);
                } else {
                    this._alertService.error(result.message);
                }
                if (result.data.length < this.limit) {
                    this.noMore = true;
                }
            },
            error => {
                this._authService.handelError(error);
            });
        this._contentService.getNews(this.offsetA, this.limitA).subscribe(
            result => {
                if (result.status) {
                    this.comsAllDataA = result.data;
                    this.comsCountA = result.count;
                    this.comsDataACal = result.dataCalendar;
                    this.coms_pagesA = Array(Math.ceil(this.comsCountA / this.limitA)).fill(1);
                    this.comsDataA = this.comsAllDataA.slice(0, this.limitA);
                } else {
                    this._alertService.error(result.message);
                }
                if (result.data.length < this.limitA) {
                    this.noMoreA = true;
                }
            },
            error => {
                this._authService.handelError(error);
            });
    }
    ngAfterViewInit() {
        this.editorInit('editor');
        this.editorInit('editor1');
    }
    CreateNewContent() {
        this.creatingContent = true;
    }
    createContentSubmit() {
        this.isCreating = true;
        var titleinput = <HTMLInputElement>document.getElementById("createTitle");
        var title = titleinput.value;
        var tags: string[] = [];
        $('.create-tag').each(function (i: number, obj: HTMLElement) {
            tags.push(obj.textContent);
        });
        var desc = document.getElementById("editor").textContent;
        var e = <HTMLSelectElement>document.getElementById("createType");
        var type = e.options[e.selectedIndex].value;
        this.contentNew = {
            title: title,
            desc: desc,
            tags: tags,
            type: type
        }
        this._contentService.createContent(this.contentNew).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message);
                    titleinput.value = '';
                    e.selectedIndex = 0;
                    document.getElementById("editor").textContent = '';
                    this.contentNew.tags = [];
                    this.creatingContent = false;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.isCreating = false;
            },
            () => {
                this.isCreating = false;
                return;
            });
    }
    cancelCreate() {
        this.creatingContent = false;
    }
    updateContentSubmit() {
        this.isUpdating = true;
        var titleinput = <HTMLInputElement>document.getElementById("editTitle");
        var title = titleinput.value;
        var tags: string[] = [];
        $('.edit-tag').each(function (i: number, obj: HTMLElement) {
            tags.push(obj.textContent);
        });
        var desc = document.getElementById("editor1").textContent;
        var e = <HTMLSelectElement>document.getElementById("editType");
        var type = e.options[e.selectedIndex].value;
        this.contentNew = {
            title: title,
            desc: desc,
            tags: tags,
            type: type
        }
        this._contentService.updateContent(this.contentEdit.id, this.contentNew).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message);
                    titleinput.value = '';
                    e.selectedIndex = 0;
                    document.getElementById("editor1").textContent = '';
                    this.editingContent = false;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.isUpdating = false;
            },
            () => {
                this.isUpdating = false;
                return;
            });
    }
    updateContent(index: number, type: string) {
        switch (type) {
            case 'announcements':
                this.contentEdit = this.comsData[index];
                break;
            case 'calAnnouncements':
                this.contentEdit = this.comsDataCal[index];
                break;
            case 'calNews':
                this.contentEdit = this.comsDataACal[index];
                break;
            case 'news':
                this.contentEdit = this.comsDataA[index];
                break;
        }
        // this.editorInit('editor1');
        // document.getElementById("editor1").textContent = this.contentEdit.desc;
        // console.log(this.contentEdit);
        this.editingContent = true;
    }
    cancelUpdate() {
        this.editingContent = false;
    }

    editorInit(selector: string) {
        var container = document.getElementById(selector);
        var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'direction': 'rtl' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': '#fff' }],
            ['clean']
        ];

        var quill = new Quill(container, {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });
    }

    loadMoreComs() {
        if (this.noMore) return;
        this.offset += this.limit;
        this._contentService.getAnnouncements(this.offset, this.limit).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    this.comsCount = result.count;
                    this.coms_pages = Array(Math.ceil(this.comsCount / this.limit)).fill(1);
                    if (arradata) {
                        arradata.forEach((obj: Content, index: number) => {
                            this.comsAllData.push(obj);
                        });
                    }
                    if (arradata.length < this.limit) {
                        this.noMore = true;
                    }
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            },
            () => {
                this.goToPage(this.currentPage);
            });
    }

    goToPage(index: number = 1) {
        if ((index < 1) || (index > this.coms_pages.length)) return;
        let offset = this.limit * (index - 1);
        let limit = offset + this.limit;
        this.currentPage = index;
        if (this.comsAllData.length <= offset) {
            this.loadMoreComs();
        }
        this.comsData = this.comsAllData.slice(offset, limit);
    }

    loadMoreComsA() {
        if (this.noMoreA) return;
        this.offsetA += this.limitA;
        this._contentService.getNews(this.offsetA, this.limitA).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    this.comsCountA = result.count;
                    this.coms_pagesA = Array(Math.ceil(this.comsCountA / this.limitA)).fill(1);
                    if (arradata) {
                        arradata.forEach((obj: Content, index: number) => {
                            this.comsAllDataA.push(obj);
                        });
                    }
                    if (arradata.length < this.limitA) {
                        this.noMoreA = true;
                    }
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            },
            () => {
                this.goToPageA(this.currentPageA);
            });
    }
    goToPageA(index: number = 1) {
        if ((index < 1) || (index > this.coms_pagesA.length)) return;
        let offset = this.limitA * (index - 1);
        let limit = offset + this.limitA;
        this.currentPageA = index;
        if (this.comsAllDataA.length <= offset) {
            this.loadMoreComsA();
        }
        this.comsDataA = this.comsAllDataA.slice(offset, limit);
    }
}