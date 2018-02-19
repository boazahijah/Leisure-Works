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
export class FileUploadServiceService {

  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http) {

  }

  public uploadRingtone(formData: any, ringToneName: any, categoryName: any, subCategoryName: any, ringKeyWords: any) {
    return this.http.post(AppSettings.API_UPLOAD_RINGTONE, formData
      ,
      new RequestOptions({
        headers: new Headers({
          'ringtonename': ringToneName,
          'categoryName': categoryName,
          'subCategoryName': subCategoryName,
          'ringKeyWords': ringKeyWords
        })
      }))
      .catch(this.handleError);
  }


  public sendPush(formData: any, imageName: any, pushTitle: any, pushMessage: any) {
    return this.http.post(AppSettings.API_SEND_PUSH, formData
      ,
      new RequestOptions({
        headers: new Headers({
          'imageName': imageName,
          'pushTitle': pushTitle,
          'pushMessage': pushMessage,
        })
      }))
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
