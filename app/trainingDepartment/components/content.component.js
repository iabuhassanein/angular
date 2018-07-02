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
var forms_1 = require('@angular/forms');
// Services
var alert_service_1 = require('../../shared/services/alert.service');
var content_service_1 = require('../services/content.service');
var authentication_service_1 = require('../../shared/services/authentication.service');
var validation_service_1 = require('../../common/services/validation.service');
var ContentComponent = (function () {
    function ContentComponent(_contentService, _alertService, _authService, _fb) {
        this._contentService = _contentService;
        this._alertService = _alertService;
        this._authService = _authService;
        this._fb = _fb;
        // newContentForm: FormGroup;
        this.creatingContent = false;
        this.editingContent = false;
        this.isCreating = false;
        this.isUpdating = false;
        this.limit = 5;
        this.offset = 0;
        this.noMore = false;
        this.coms_pages = [];
        this.comsCount = 0;
        this.currentPage = 1;
        this.comsData = [];
        this.comsDataCal = [];
        this.comsAllData = [];
        this.limitA = 5;
        this.offsetA = 0;
        this.noMoreA = false;
        this.coms_pagesA = [];
        this.comsCountA = 0;
        this.currentPageA = 1;
        this.comsDataA = [];
        this.comsDataACal = [];
        this.comsAllDataA = [];
    }
    ContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._contentService.getAnnouncements(this.offset, this.limit).subscribe(function (result) {
            if (result.status) {
                _this.comsAllData = result.data;
                _this.comsCount = result.count;
                _this.comsDataCal = result.dataCalendar;
                _this.coms_pages = Array(Math.ceil(_this.comsCount / _this.limit)).fill(1);
                _this.comsData = _this.comsAllData.slice(0, _this.limit);
            }
            else {
                _this._alertService.error(result.message);
            }
            if (result.data.length < _this.limit) {
                _this.noMore = true;
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this._contentService.getNews(this.offsetA, this.limitA).subscribe(function (result) {
            if (result.status) {
                _this.comsAllDataA = result.data;
                _this.comsCountA = result.count;
                _this.comsDataACal = result.dataCalendar;
                _this.coms_pagesA = Array(Math.ceil(_this.comsCountA / _this.limitA)).fill(1);
                _this.comsDataA = _this.comsAllDataA.slice(0, _this.limitA);
            }
            else {
                _this._alertService.error(result.message);
            }
            if (result.data.length < _this.limitA) {
                _this.noMoreA = true;
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
    };
    ContentComponent.prototype.ngAfterViewInit = function () {
        this.editorInit('editor');
        this.editorInit('editor1');
    };
    ContentComponent.prototype.CreateNewContent = function () {
        this.creatingContent = true;
    };
    ContentComponent.prototype.createContentSubmit = function () {
        var _this = this;
        this.isCreating = true;
        var titleinput = document.getElementById("createTitle");
        var title = titleinput.value;
        var tags = [];
        $('.create-tag').each(function (i, obj) {
            tags.push(obj.textContent);
        });
        var desc = document.getElementById("editor").textContent;
        var e = document.getElementById("createType");
        var type = e.options[e.selectedIndex].value;
        this.contentNew = {
            title: title,
            desc: desc,
            tags: tags,
            type: type
        };
        this._contentService.createContent(this.contentNew).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message);
                titleinput.value = '';
                e.selectedIndex = 0;
                document.getElementById("editor").textContent = '';
                _this.contentNew.tags = [];
                _this.creatingContent = false;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isCreating = false;
        }, function () {
            _this.isCreating = false;
            return;
        });
    };
    ContentComponent.prototype.cancelCreate = function () {
        this.creatingContent = false;
    };
    ContentComponent.prototype.updateContentSubmit = function () {
        var _this = this;
        this.isUpdating = true;
        var titleinput = document.getElementById("editTitle");
        var title = titleinput.value;
        var tags = [];
        $('.edit-tag').each(function (i, obj) {
            tags.push(obj.textContent);
        });
        var desc = document.getElementById("editor1").textContent;
        var e = document.getElementById("editType");
        var type = e.options[e.selectedIndex].value;
        this.contentNew = {
            title: title,
            desc: desc,
            tags: tags,
            type: type
        };
        this._contentService.updateContent(this.contentEdit.id, this.contentNew).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message);
                titleinput.value = '';
                e.selectedIndex = 0;
                document.getElementById("editor1").textContent = '';
                _this.editingContent = false;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isUpdating = false;
        }, function () {
            _this.isUpdating = false;
            return;
        });
    };
    ContentComponent.prototype.updateContent = function (index, type) {
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
    };
    ContentComponent.prototype.cancelUpdate = function () {
        this.editingContent = false;
    };
    ContentComponent.prototype.editorInit = function (selector) {
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
    };
    ContentComponent.prototype.loadMoreComs = function () {
        var _this = this;
        if (this.noMore)
            return;
        this.offset += this.limit;
        this._contentService.getAnnouncements(this.offset, this.limit).subscribe(function (result) {
            if (result.status) {
                var arradata = result.data;
                _this.comsCount = result.count;
                _this.coms_pages = Array(Math.ceil(_this.comsCount / _this.limit)).fill(1);
                if (arradata) {
                    arradata.forEach(function (obj, index) {
                        _this.comsAllData.push(obj);
                    });
                }
                if (arradata.length < _this.limit) {
                    _this.noMore = true;
                }
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        }, function () {
            _this.goToPage(_this.currentPage);
        });
    };
    ContentComponent.prototype.goToPage = function (index) {
        if (index === void 0) { index = 1; }
        if ((index < 1) || (index > this.coms_pages.length))
            return;
        var offset = this.limit * (index - 1);
        var limit = offset + this.limit;
        this.currentPage = index;
        if (this.comsAllData.length <= offset) {
            this.loadMoreComs();
        }
        this.comsData = this.comsAllData.slice(offset, limit);
    };
    ContentComponent.prototype.loadMoreComsA = function () {
        var _this = this;
        if (this.noMoreA)
            return;
        this.offsetA += this.limitA;
        this._contentService.getNews(this.offsetA, this.limitA).subscribe(function (result) {
            if (result.status) {
                var arradata = result.data;
                _this.comsCountA = result.count;
                _this.coms_pagesA = Array(Math.ceil(_this.comsCountA / _this.limitA)).fill(1);
                if (arradata) {
                    arradata.forEach(function (obj, index) {
                        _this.comsAllDataA.push(obj);
                    });
                }
                if (arradata.length < _this.limitA) {
                    _this.noMoreA = true;
                }
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        }, function () {
            _this.goToPageA(_this.currentPageA);
        });
    };
    ContentComponent.prototype.goToPageA = function (index) {
        if (index === void 0) { index = 1; }
        if ((index < 1) || (index > this.coms_pagesA.length))
            return;
        var offset = this.limitA * (index - 1);
        var limit = offset + this.limitA;
        this.currentPageA = index;
        if (this.comsAllDataA.length <= offset) {
            this.loadMoreComsA();
        }
        this.comsDataA = this.comsAllDataA.slice(offset, limit);
    };
    ContentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'td-content',
            templateUrl: 'content.template.html',
            providers: [content_service_1.ContentService, validation_service_1.ValidationService]
        }), 
        __metadata('design:paramtypes', [content_service_1.ContentService, alert_service_1.AlertService, authentication_service_1.AuthenticationService, forms_1.FormBuilder])
    ], ContentComponent);
    return ContentComponent;
}());
exports.ContentComponent = ContentComponent;
//# sourceMappingURL=content.component.js.map