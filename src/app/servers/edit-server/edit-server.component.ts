import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }
  // Added ActivatedRoute to get query params here.

  ngOnInit() {
    // Next 2 lines allows access to the query(?) and fragment(#) params
    this.route.queryParams.subscribe( (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1'? true : false;
      }
    );

    this.route.fragment.subscribe();
    
    // + below convers string to number.
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);

    // Todo: subscribe route params to update the id if params change.
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit) {
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && 
      !this.changesSaved) {
        return confirm('Do you want to discard the changes?');
      } else {
        return true;
      }
   }

}
