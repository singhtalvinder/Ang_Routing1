import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) {

     }

  ngOnInit() {
    // // Query param values are always passed as strings and not numbers so we need to convert it by prefixing a + in front.
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);

    // this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params['id']);
    // });
    // commented above implementation to replace it with a resolver implementation(generally useful for asynchronous data).
    this.route.data.subscribe( (data: Data) => {
      this.server = data['server'];
    });
  }

  onEdit() {
    //using relative path. so need to setup 'relativeTo prop and use queryParamsHandling to use the query params as is further on.
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'}); 
  }

}
