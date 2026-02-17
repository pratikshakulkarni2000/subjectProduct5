import { Component, Input, OnInit } from '@angular/core';
import { Iproduct } from '../../models/pro';
import { ProductsService } from 'src/app/service/products.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() data !: Iproduct

  constructor(
    private _PService : ProductsService,
    private _dialog : MatDialog
  ) { }

  ngOnInit(): void {
  }

  onEdit(){
    this._PService.setEditPro(this.data)
  }

  onRemove(){
    let matConfig = new MatDialogConfig()
    matConfig.data = `Are you sure to remove this card?`

    let matREf = this._dialog.open(GetConfirmComponent,matConfig)
    matREf.afterClosed().subscribe(res => {
      if(res){
        this._PService.removePro(this.data.id).subscribe(data => {
          this._PService.setRemovePro(this.data.id)
        })
      }
    })
  }

}
