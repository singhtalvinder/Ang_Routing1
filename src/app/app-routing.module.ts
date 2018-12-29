import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth-guard.service";

const appRoutes: Routes =[
    {path: '', component: HomeComponent},
    {path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent} // /: is used to get the parameters on the path.for Ex: users/123/Peter
    ]},
    
    {
        path: 'servers', 
        //canActivate: [AuthGuard], 
        canActivateChild: [AuthGuard], 
        component: ServersComponent, 
        children: [
            {
                path: ':id', component: ServerComponent
            },
            {
                path: ':id/edit', component: EditServerComponent
            }
    ]}, // child components need seperate outlet as these should be loaded nested into the parent component.
    
    { 
        path: 'not-found',
        component: PageNotFoundComponent
    },
    
    {
        path: '**',
        redirectTo: '/not-found'
    } // catch all paths that we don't know. Ensure this is the last one in the list.
   ];
  

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
      
}