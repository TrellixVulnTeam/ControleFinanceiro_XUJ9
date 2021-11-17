import { Component, Inject, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/services/Categorias.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-listagem-categorias',
  templateUrl: './listagem-categorias.component.html',
  styleUrls: ['./listagem-categorias.component.css']
})
export class ListagemCategoriasComponent implements OnInit {

  categorias = new MatTableDataSource<any>();
  displayedColumns: string[];

  constructor( private categoriaService: CategoriasService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.categoriaService.PegarTodos().subscribe(resultado => {
      this.categorias.data = resultado;
    });
    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas(): string[]{
    return ['nome', 'icone', 'tipo','acoes']
  }

  AbrirDialog(categoriaId: any, nome: any): void{
    this.dialog.open(DialogExclusaoCategoriasComponent, {
      data:{
        categoriaId: categoriaId,
        nome: nome
      } 
    }).afterClosed().subscribe(resultado => {
      if(resultado === true){
        this.categoriaService.PegarTodos().subscribe((dados) =>{
          this.categorias.data = dados;
        });
      }
    });
    this.displayedColumns = this.ExibirColunas();
  }
}
@Component({
  selector:'app-dialog-exclusao-categorias',
  templateUrl:'dialog-exclusao-categorias.html'
})
export class DialogExclusaoCategoriasComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public dados: any,
      private categoriasService : CategoriasService){}

  ExcluirCategoria(categoriaId: number): void {
  this.categoriasService.ExcluirCategoria(categoriaId).subscribe(resultado =>{

  });
}
}