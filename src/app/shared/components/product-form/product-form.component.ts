import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/service/products.service';
import { Iproduct } from '../../models/pro';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

   prodForm !: FormGroup
  isInEditMode : boolean = false
  editId !: string

  constructor(
    private _prodService : ProductsService
  ) { }

  ngOnInit(): void {
    this.createForm()
    this.patchVAlue()
  }
 

  createForm(){
    this.prodForm = new FormGroup({
      name : new FormControl(null,[Validators.required]),
      overview : new FormControl(null,[Validators.required]),
      image : new FormControl(null,[Validators.required]),
    })
  }

  get f() {
    return this.prodForm.controls
  }

  onSubmit(){
    if(this.prodForm.valid){
      let obj = this.prodForm.value
      console.log(obj);

      this._prodService.createProd(obj).subscribe(res => {
        console.log(res);
        
        this.prodForm.reset()

        this._prodService.setNewPro({...obj,id : res.name})
      })
      
    }
  }

  patchVAlue(){
    this._prodService.editProObs$.subscribe(res => {
      if(res){
        this.prodForm.patchValue(res)
        this.isInEditMode = true
        this.editId = res.id
      }
    })
  }

  onUpdate(){
    if(this.prodForm.value){
      let obj : Iproduct = {
        ...this.prodForm.value,
        id : this.editId
      }
      console.log(obj);

      this._prodService.updatePro(obj).subscribe(res => {
        this.isInEditMode = false
        this.prodForm.reset()

        this._prodService.setUpdatePro(obj)
      })
      
    }
  }

}
