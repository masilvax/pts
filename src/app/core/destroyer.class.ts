import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
@Injectable()
export abstract class Destroyer implements OnDestroy {
    
    destroy$: Subject<boolean> = new Subject<boolean>()
    
    ngOnDestroy(): void {
        console.log('wejszłem w destrojej')
        this.destroy$.next(true)
        this.destroy$.unsubscribe()
    }
}