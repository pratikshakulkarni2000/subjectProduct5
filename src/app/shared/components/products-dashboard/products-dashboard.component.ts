import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../models/pro';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.scss']
})
export class ProductsDashboardComponent implements OnInit {

  prodArr : Array<Iproduct> = []

  constructor(
    private _service : ProductsService
  ) { }

  ngOnInit(): void {
    this.fetchData()
    this.onAdd()
    this.onUp()
    this.onRemove()
  }

   trackById(index : number,i:Iproduct){
    return i.id
  }

  fetchData(){
    this._service.fetchAllProducts().subscribe(res => {
      this.prodArr = res
    })
  }

  onUp(){
    this._service.updateProObs$.subscribe(data => {
      let get = this.prodArr.findIndex(u => u.id === data.id)
      this.prodArr[get] = data
    })
  }

  onAdd(){
    this._service.newProObs$.subscribe(data => {
      this.prodArr.unshift(data)
    })
  }

  onRemove(){
    this._service.removeProObs$.subscribe(res => {
      let g = this.prodArr.findIndex(r => r.id === res)
      this.prodArr.splice(g,1)
    })
  }

}
