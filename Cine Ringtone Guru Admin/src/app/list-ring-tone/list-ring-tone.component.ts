import { Component, OnInit } from '@angular/core';
import { CategoryCreatorService } from '../category-creator.service';
import { ListRingToneService } from '../list-ring-tone.service';

@Component({
  selector: 'app-list-ring-tone',
  templateUrl: './list-ring-tone.component.html',
  styleUrls: ['./list-ring-tone.component.scss'],
  providers: [CategoryCreatorService, ListRingToneService]

})
export class ListRingToneComponent implements OnInit {
  public categoryName: any = "";
  public parentCategory: any = {
    categoryName: "",
    categoryImage: "",
    categoryDescription: "",
    _id: ""
  };
  public ringTones: any = {
    _id: "",
    categoryName: "",
    subCategoryName: "",
    ringToneName: "",
    serverPath: "",
    ringKeyWords: "",
    createdDate: "",
    hits: ""
  };
  constructor(private categoryCreatorService: CategoryCreatorService, private listRingToneService: ListRingToneService) {

  }
  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryCreatorService.fetchParentCategory().subscribe(res => this.handleResult(res));
  }

  private handleResult(res: any) {
    //console.log("Result :" + JSON.stringify(result));
    //console.log(res.status);
    let results = res.json();
    //console.log(results);
    if (res.status == "200") {
      this.parentCategory = results;
    } else {

    }
  }
  private handleError(error: any) {
  }

  loadRingtones() {
    this.listRingToneService.fetchRingTones(this.categoryName).subscribe(res => this.handleFetchedRingtones(res));
  }

  private handleFetchedRingtones(res: any) {
    let results = res.json();
    console.log(results);
    if (res.status == "200") {
      this.ringTones = results;
    } else {

    }
  }



}
