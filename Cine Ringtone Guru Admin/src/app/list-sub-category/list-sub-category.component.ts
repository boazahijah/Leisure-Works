import { Component, OnInit } from '@angular/core';
import { CategoryCreatorService } from '../category-creator.service';
declare var $: any;

@Component({
  selector: 'app-list-sub-category',
  templateUrl: './list-sub-category.component.html',
  styleUrls: ['./list-sub-category.component.scss'],
  providers: [CategoryCreatorService]

})
export class ListSubCategoryComponent implements OnInit {
  public categoryName: any = "";
  public parentCategory: any = {
    categoryName: "",
    categoryImage: "",
    categoryDescription: "",
    _id: ""
  };
  public subCategory: any = {
    categoryName: "",
    subCategoryName: "",
    subCategoryImage: "",
    subCategoryDescription: "",
    _id: ""
  };
  constructor(private categoryCreatorService: CategoryCreatorService) {

  }


  showNotification(from, align, color, textMessage) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    //const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: textMessage

    }, {
        type: type[color],
        timer: 4000,
        placement: {
          from: from,
          align: align
        }
      });
  }
  ngOnInit() {
    this.loadParentCategories();
  }

  loadParentCategories() {
    this.categoryCreatorService.fetchParentCategory().subscribe(res => this.handleFetchParentResult(res));
  }

  loadSubCategories() {
    //alert(this.categoryName);
    this.categoryCreatorService.fetchSubCategory(this.categoryName).subscribe(res => this.handleFetchSubResult(res));
  }

  private handleFetchSubResult(res: any) {
    //console.log("Result :" + JSON.stringify(result));
    //console.log(res.status);
    let results = res.json();
    console.log(results);
    if (res.status == "200") {
      this.showNotification('top', 'center', 2, "Listing Sub Categories.");
      this.subCategory = results;
    } else {
      this.showNotification('top', 'center', 4, "Failed to Fetch Sub Categories. Please try again.");
    }

  }

  private handleFetchParentResult(res: any) {
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
    this.showNotification('top', 'center', 4, "Failed to Fetch Parent Categories. Please try again.");

  }


  deleteSubCategory = (categoryId, categoryName, subCategoryName) => this.categoryCreatorService.
    deleteSubCategory(categoryId, categoryName, subCategoryName).subscribe(
    (res) => {
      if (res.status == 200) {
        this.showNotification('top', 'center', 2, "Sub category Deleted Successfully");
        this.loadSubCategories();
      }

    },
    error => this.showNotification('top', 'center', 4, "Failed to delete Sub Category. Please try again.")
    );;

}
