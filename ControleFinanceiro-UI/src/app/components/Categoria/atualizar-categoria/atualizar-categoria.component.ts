import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria';
import { Tipo } from 'src/app/models/Tipo';
import { CategoriasService } from 'src/app/services/Categorias.service';
import { TiposService } from 'src/app/services/tipos.service';

@Component({
  selector: 'app-atualizar-categoria',
  templateUrl: './atualizar-categoria.component.html',
  styleUrls: ['../listagem-categorias/listagem-categorias.component.css']
})
export class AtualizarCategoriaComponent implements OnInit {

  nomeCategoria: string;
  categoria: Observable<Categoria>;
  tipos: Tipo[];
  formulario: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private tiposService: TiposService,
    private categoriasService: CategoriasService) { }

  ngOnInit(): void {

    const categoriaId = this.route.snapshot.params.id;
    this.tiposService.PegarTodos().subscribe(resultado => {
      this.tipos = resultado
    });

    this.categoriasService.PegarCatedoriaPeloId(categoriaId).subscribe(resultado => {
      this.nomeCategoria = resultado.nome;
      this.formulario = new FormGroup({
        categoriaId: new FormControl(resultado.categoriaId),
        nome: new FormControl(resultado.nome),
        icone: new FormControl(resultado.icone),
        tipoId: new FormControl(resultado.tipoId)
      });
    })
  }
  get propriedade() {
    return this.formulario.controls;
  }
  voltarListagem(): void{
    this.router.navigate(['categorias/listagemCategorias']);
  }
}
