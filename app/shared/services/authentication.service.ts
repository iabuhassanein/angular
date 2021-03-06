import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
// Objects 
import { Session } from '../../objects/session';

// Services
import { AlertService } from './alert.service';

@Injectable()
export class AuthenticationService {
	limit: number;
	offset: number;
	constructor(
		private http: Http,
		private _router: Router,
		private _alertService: AlertService) {
		this.limit = 4;
		this.offset = 0;
	}

	logout() {
		this.deleteAll('/');
		this._router.navigate(['/']);
	}

	public catch401(): boolean {
		try {
			this.deleteAll();
			this._router.navigate(['/login'], { queryParams: { returnUrl: this._router.url } });
			return true;
		} catch (ex) {
			console.error(ex);
			return false;
		}
	}

	public handelError(error: any) {
		if (error.status === 401) {
			this.catch401();
			let error_body = JSON.parse(error._body);
			this._alertService.error(error_body.message, 3000, 'dark');
		} else if (error.status === 403) {
			let error_body = JSON.parse(error._body);
			this._alertService.error(error_body.message, 3000, 'dark');
		} else {
			this._alertService.error('Internal Error, Please Refrish the page then try again', 3000, 'dark');
		}
	}

	public updateProfile(opj: any) {
		this.delete('profile', '/');
		this.set('profile', JSON.stringify(opj), null, '/');
	}


	public getToken(reqRole: string): boolean | string {
		if (this.check('currentUser')) {
			try {
				var obj = JSON.parse(this.get('currentUser'));
				if (obj.role == reqRole) return obj.token;
				return false;
			} catch (ex) {
				console.error(ex);
				return false;
			}
		}
	}

	public getSession(): Session {
		if (this.check('currentUser') && this.check('profile')) {
			try {
				var session: Session = JSON.parse(this.get('currentUser'));
				return session;
			} catch (ex) {
				console.error(ex);
				return null;
			}
		}
	}

	public getProfile(): any {
		if (this.check('profile')) {
			try {
				var obj = JSON.parse(this.get('profile'));
				return obj;
			} catch (ex) {
				console.error(ex);
				return false;
			}
		} else {
			this.catch401();
			return false;
		}
	}

	/**
	 * Checks the existence of a single cookie by it's name
	 * 
	 * @param  {string} name Identification of the cookie
	 * @returns existence of the cookie
	 */
	public check(name: string): boolean {
		if (typeof document === "undefined") return false;  // Check if document exist avoiding issues on server side prerendering	
		name = encodeURIComponent(name);
		let regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
		let exists = regexp.test(document.cookie);
		return exists;
	}

	/**
	 * Retrieves a single cookie by it's name
	 *
	 * @param  {string} name Identification of the Cookie
	 * @returns The Cookie's value
	 */
	public get(name: string): string {
		if (this.check(name)) {
			name = encodeURIComponent(name);
			let regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
			let result = regexp.exec(document.cookie);
			return decodeURIComponent(result[1]);
		} else {
			return '';
		}
	}

	/**
	 * Retrieves a a list of all cookie avaiable
	 *
	 * @returns Object with all Cookies
	 */
	public static getAll(): any {
		let cookies: any = {};

		if (document.cookie && document.cookie != '') {
			let split = document.cookie.split(';');
			for (let i = 0; i < split.length; i++) {
				let currCookie = split[i].split('=');
				currCookie[0] = currCookie[0].replace(/^ /, '');
				cookies[decodeURIComponent(currCookie[0])] = decodeURIComponent(currCookie[1]);
			}
		}

		return cookies;
	}

	/**
	 * Save the Cookie
	 *
	 * @param  {string} name Cookie's identification
	 * @param  {string} value Cookie's value
	 * @param  {number} expires Cookie's expiration date in days from now or at a specific date from a Date object. If it's undefined the cookie is a session Cookie
	 * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
	 * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
	 * @param  {boolean} secure If true, the cookie will only be available through a secured connection
	 */
	public set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean) {
		let cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';

		if (expires) {
			if (typeof expires === 'number') {
				let dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
				cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
			} else {
				cookieStr += 'expires=' + expires.toUTCString() + ';';
			}
		}

		if (path) {
			cookieStr += 'path=' + path + ';';
		}
		if (domain) {
			cookieStr += 'domain=' + domain + ';';
		}
		if (secure) {
			cookieStr += 'secure;';
		}

		// console.log(cookieStr);
		document.cookie = cookieStr;
	}

	/**
	 * Removes specified Cookie
	 *
	 * @param  {string} name Cookie's identification
	 * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
	 * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
	 */
	public delete(name: string, path?: string, domain?: string) {
		this.set(name, '', -1, path, domain);
	}

	/**
	 * Delete all cookie avaiable
	 */
	public deleteAll(path?: string, domain?: string): any {
		let cookies: any = AuthenticationService.getAll();
		for (let cookieName in cookies) {
			this.delete(cookieName, path, domain);
		}

	}

}