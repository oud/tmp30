import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IGroupe } from '../groupe.model';
import { GroupeService } from '../service/groupe.service';

@Component({
  templateUrl: './groupe-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class GroupeDeleteDialogComponent {
  groupe?: IGroupe;

  protected groupeService = inject(GroupeService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.groupeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
