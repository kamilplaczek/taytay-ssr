import {Home} from './home/home.component';
import {Contact} from './contact/contact.component';

export const routes = [
  {
    component: Home,
    path: '/',
    exact: true,
  },
  {
    component: Contact,
    path: '/contact',
    exact: true,
  },
];
