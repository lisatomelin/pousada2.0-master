import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RoomsViewModel } from '../models/rooms-View.Model';
import { QuartosService } from '../services/quartos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-excluir-quartos',
  templateUrl: './excluir-quartos.component.html',
  styleUrls: ['./excluir-quartos.component.scss']
})
export class ExcluirQuartosComponent implements OnInit {
  quartosVM?: Observable<RoomsViewModel | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quartosService: QuartosService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.quartosVM = this.quartosService.selecionarPorId(id);
  }

  gravar(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.quartosService.excluir(id).subscribe({
      next: () => this.processarSucesso(),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso() {
    this.notification.sucesso(
      "O quarto foi excluído com sucesso!"
    );

    this.router.navigate(['/quartos/listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }



}
