import {Contact} from './contact/contact.component';
import {HomeContainer} from './home/home.container';

export const routes = [
  {
    component: HomeContainer,
    path: '/',
    exact: true,
  },
  {
    component: Contact,
    path: '/contact',
    exact: true,
  },
];
