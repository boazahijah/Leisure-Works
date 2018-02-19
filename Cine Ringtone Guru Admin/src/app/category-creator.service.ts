import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map'
import { AppSettings } from './app-settings';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class CategoryCreatorService {
  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  createParentCategory(categoryData: any) {
    let body = JSON.stringify(categoryData);
    return this.http.post(AppSettings.API_CREATE_PARENT_CATEGORY, body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createSubCategory(categoryData: any) {
    let body = JSON.stringify(categoryData);
    return this.http.post(AppSettings.API_CREATE_SUB_CATEGORY, body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteParentCategory(categoryId: any, categoryName: any) {
    return this.http.post(AppSettings.API_DELETE_PARENT_CATEGORY, {
      categoryId: categoryId,
      categoryName: categoryName
    }, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteSubCategory(categoryId: any, categoryName: any, subCategoryName: any) {
    return this.http.post(AppSettings.API_DELETE_SUB_CATEGORY, {
      categoryId: categoryId,
      categoryName: categoryName,
      subCategoryName: subCategoryName,
    }, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  fetchParentCategory() {
    return this.http.get(AppSettings.API_FETCH_PARENT_CATEGORY)
      .map(this.extractData)
      .catch(this.handleError);
  }

  fetchSubCategory(categoryName: any) {
    return this.http.get(AppSettings.API_FETCH_SUB_CATEGORY + "?categoryName=" + categoryName)
      .map(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    console.log("Response : " + res.status);
    return res || {};
  }

  private handleError(error: any) {
    //console.error(error);
    return Observable.throw(error);
  }

}
