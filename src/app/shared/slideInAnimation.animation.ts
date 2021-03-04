import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild,
  group,
  // ...
} from '@angular/animations';
// ! config
const AnimeEnter = '300ms';
const AnimeLeave = '300ms';
const Animestyle = 'ease-in-out';

export const slideInAnimation = trigger('routeAnimations', [
  transition('HomePage <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate(AnimeLeave + ' ' + Animestyle, style({ left: '100%' })),
      ]),
      query(':enter', [
        animate(AnimeEnter + ' ' + Animestyle, style({ left: '0%' })),
      ]),
    ]),
    query(':enter', animateChild()),
  ]),
  transition('* <=> HomePage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate(AnimeLeave + ' ' + Animestyle, style({ left: '100%' })),
      ]),
      query(':enter', [
        animate(AnimeEnter + ' ' + Animestyle, style({ left: '0%' })),
      ]),
    ]),
    query(':enter', animateChild()),
  ]),
]);
