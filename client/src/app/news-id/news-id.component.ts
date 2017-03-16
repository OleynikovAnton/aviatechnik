
import { Component, OnDestroy} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
  
@Component({
  selector: 'app-news-id',
  templateUrl: './news-id.component.html',
  styleUrls: ['./news-id.component.css']
})

export class NewsIdComponent implements OnDestroy { 
     
    private id: number;
    private subscription: Subscription;
    constructor(private activateRoute: ActivatedRoute){
         
        this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
    }
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}