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
                height: '80%',
                opacity: 0,
                overflow: 'hidden'
              })
            ], { optional: true }),
            query(':enter',
                animate('600ms ease',
                    style({
                        opacity: 1,
                        height:'100%'
                    })
                ),
                { optional: true }
            ),
/*             query(':leave',
                animate('0ms ease',
                    style({
                        height: '1000px',
                        bacground: 'yellow'
                    })
                ),
                { optional: true }
            ) */
        ])
    ])