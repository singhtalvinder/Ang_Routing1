import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { parseIntAutoRadix } from '@angular/common/src/i18n/format_number';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // to get values from the route, for ex: users/user1 or users/user1/Mike, follow the below approach of using params.
    // Also, oninit is a good approach if we navigate for the first time otherwise the data won't get updated for the next user.
    // So, to handle that we use params(which are observables) on the route instead of snapshot. This part of code is executed
    //  whenever the params change. Also, note that its needed only when we load some data from within this component, as otherwise
    // the component is recreated. THe subscription is cleanedup when the component is destroyed.
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };
    this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }

}
