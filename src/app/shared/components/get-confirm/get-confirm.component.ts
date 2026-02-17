import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confirm',
  templateUrl: './get-confirm.component.html',
  styleUrls: ['./get-confirm.component.scss']
})
export class GetConfirmComponent implements OnInit {

  msg !: string
  constructor(
    private _matREf : MatDialogRef<GetConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data : string
  ) { 
    this.msg = data
  }

  onClose(f : boolean){
    this._matREf.close(f)
  }

  ngOnInit(): void {
  }

}
