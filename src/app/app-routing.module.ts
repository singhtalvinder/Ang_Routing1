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
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

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
                path: ':id', component: ServerComponent, resolve: {server: ServerResolver}
            },
            {
                path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]
            }
    ]}, // child components need seperate outlet as these should be loaded nested into the parent component.
    
    // { 
    //     path: 'not-found',
    //     component: PageNotFoundComponent
    // },
    { 
        path: 'not-found',
        component: ErrorPageComponent,
        data: {message: 'Page not found!'} // Pass the data/message that we want the error page to display.
    },
    
    {
        path: '**',
        redirectTo: '/not-found'
    } // catch all paths that we don't know. Ensure this is the last one in the list.
   ];
  

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
     
        // Alternate approach, not used.
        //RouterModule.forRoot(appRoutes, {useHash: true})// second param for configuring the routes. 
                            //so the routes now have a # in the path as :http://localhost:4200/#/users. Generally useful for live web severs.
                            // Informs the web-server to ONLY care about the part before the # in the url, so all the part after it is ignored by
                            // the web-server. So this also works on servers that don't return index.html on 404 errors because they only care about
                            // the part before the hash(#) tag. And tha part after the # can be parsed by Angular or any client.
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
      
}