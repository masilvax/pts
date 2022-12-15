import { animate, query, style, transition, trigger } from "@angular/animations";

export const fader = 
    trigger('routeAnimations',[
        transition('* <=> *', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
              style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                opacity: 0,
              })
            ], { optional: true }),
            query(':enter',
                animate('600ms ease',
                    style({opacity: 1})
                ),
                { optional: true }
            )
        ])
    ])