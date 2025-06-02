import { Component, ViewChild } from '@angular/core';
import { Canal, CanalInit } from '../interfaces/canal.interface';
import { CanalFormComponent } from './canal-form/canal-form.component';
import { CanalService } from '../service/canal.sevice';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-canal',
  templateUrl: './canal.component.html'
})
export class CanalComponent {
  public modal: boolean = false
  public models: Canal[] = [];
  public showLoading: boolean = false;
  public title: string = 'Canal';

  public modelEdit: Canal = CanalInit;

  @ViewChild('canalForm')
  canalForm!: CanalFormComponent;

  constructor(
    public service: CanalService,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  editModel(model: Canal) {
    this.canalForm.setModel(model)
  }
}
