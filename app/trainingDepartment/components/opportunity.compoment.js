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
var opportunity_service_1 = require('./../services/opportunity.service');
var router_1 = require('@angular/router');
var alert_service_1 = require('../../shared/services/alert.service');
var authentication_service_1 = require('../../shared/services/authentication.service');
var OpportunityComponent = (function () {
    function OpportunityComponent(_ADService, _alertService, _authService, _router, _fb) {
        this._ADService = _ADService;
        this._alertService = _alertService;
        this._authService = _authService;
        this._router = _router;
        this._fb = _fb;
        this._base_url = "http://kfupmf.mmed.email/backend/public/api/";
        this._base_url_img = "http://kfupmf.mmed.email/backend/public/";
        this.opportunity = '';
        this.comments = [];
        this.isCommenting = false;
    }
    OpportunityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addCommentForm = this._fb.group({
            commentBody: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(512)])],
        });
        this.subscribtion = this._router.params.subscribe(function (params) {
            _this.oppID = +params['id'];
        });
        this._ADService.getOpportunity(this.oppID).subscribe(function (result) {
            if (result.status) {
                _this.opportunity = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this.getOpportunityComments();
    };
    OpportunityComponent.prototype.getOpportunityComments = function () {
        var _this = this;
        this._ADService.getOpportunityComments(this.oppID).subscribe(function (result) {
            if (result.status) {
                _this.comments = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
    };
    OpportunityComponent.prototype.ngOnDestroy = function () {
        this.subscribtion.unsubscribe();
    };
    OpportunityComponent.prototype.addNewComment = function () {
        var _this = this;
        var comment = {
            oppID: this.opportunity.id,
            comment: this.addCommentForm.controls['commentBody'].value
        };
        this.isCommenting = true;
        this._ADService.createOpportunityComment(comment).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message);
                _this.addCommentForm.reset({ commentBody: '' });
                _this.getOpportunityComments();
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isCommenting = false;
        }, function () {
            _this.isCommenting = false;
            return;
        });
    };
    OpportunityComponent.prototype.RequestMoreInfo = function () {
        this._alertService.success('We Request New Information');
    };
    OpportunityComponent.prototype.ApproveOpp = function () {
        var _this = this;
        this._ADService.approveOppertunity(this.oppID).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message);
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isCommenting = false;
        });
    };
    OpportunityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'view-opptd',
            templateUrl: 'opportunity.template.html',
            providers: [opportunity_service_1.OpportunityService]
        }), 
        __metadata('design:paramtypes', [opportunity_service_1.OpportunityService, alert_service_1.AlertService, authentication_service_1.AuthenticationService, router_1.ActivatedRoute, forms_1.FormBuilder])
    ], OpportunityComponent);
    return OpportunityComponent;
}());
exports.OpportunityComponent = OpportunityComponent;
//# sourceMappingURL=opportunity.compoment.js.map