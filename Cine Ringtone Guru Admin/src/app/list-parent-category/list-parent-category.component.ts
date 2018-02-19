import { Component, OnInit } from '@angular/core';
import { CategoryCreatorService } from '../category-creator.service';

declare var $: any;

@Component({
  selector: 'app-list-parent-category',
  templateUrl: './list-parent-category.component.html',
  styleUrls: ['./list-parent-category.component.scss'],
  providers: [CategoryCreatorService]
})
export class ListParentCategoryComponent implements OnInit {
  public parentCategory: any = {
    categoryName: "",
    categoryImage: "",
    categoryDescription: "",
    head: "",
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
      this.showNotification('top', 'center', 2, "Listing Parent Categories.");
      this.parentCategory = results;
    } else {
      this.showNotification('top', 'center', 4, "Failed to Fetch Parent Categories. Please try again.");
    }

  }

  private handleError(error: any) {
    this.showNotification('top', 'center', 4, "Failed to Fetch Parent Categories. Please try again.");

  }


  deleteCategory = (categoryId, categoryName) => this.categoryCreatorService.deleteParentCategory(categoryId, categoryName).subscribe(
    (res) => {
      if (res.status == 200) {
        this.showNotification('top', 'center', 2, "Parent category Deleted Successfully");
        this.loadCategories();
      }

    },
    error => this.showNotification('top', 'center', 4, "Failed to delete Parent Category. Please try again.")
  );;

}
