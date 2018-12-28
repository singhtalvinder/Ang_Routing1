import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { 

              }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // Router.navigate doesn't know which path(route) you are on so relative or absolute has not much significance.
    // So to tell navigate, where we are in , we pass a second argumentent which is a js object where we configure the navigation.
    // whereas the routerLink knows which component or link it sits on so knows what the currently loaded route is.
    //this.router.navigate(['servers'], {relativeTo: this.route});
  }

}
