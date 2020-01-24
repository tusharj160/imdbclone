import { Component, OnInit, Input,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface DialogData {
  movieId: any;
  name: string;
  review:any;
}
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
@Input() movie:any
score : number = 0;
  displayRatingScore = 4;
  durationInSeconds = 5;

  constructor(public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.movie.imdbRating);
    
  }
  onRateChange = (score) => {
    this.score = score;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {movieId: this.movie.imdbID, name: this.movie.Title}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result){
        this._snackBar.openFromComponent(PizzaPartyComponent, {
          duration: this.durationInSeconds * 1000,
        });
        localStorage.setItem(result.movieId,JSON.stringify(result))
      }
      
      
      
    });
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  score
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onRateChange = (score) => {
    this.score = score;
    console.log(this.score);
    
  }

}
@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent {}
