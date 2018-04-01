import {Contact} from './contact/contact.component';
import {HomeContainer} from './home/home.container';
import {Secret} from './secret/secret.component';
import {LoginContainer} from './login/login.container';
import {withAuth} from './shared/with-auth.hoc';

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
  {
    component: LoginContainer,
    path: '/login',
    exact: true,
  },
  {
    component: withAuth(Secret),
    path: '/secret',
    private: true,
  },
];
