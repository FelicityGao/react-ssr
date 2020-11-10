import App from '@/App.tsx';
import About from '@/views/about/index.tsx';
import Test from '@/views/test/index.tsx';

const routes = [
  {
    path: "/",
    exact: true,
    component: App
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/test",
    component: Test
  }
];

export default routes;