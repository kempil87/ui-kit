import { Layout } from './shared/components/layout/layout.tsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './shared/contants/routes.tsx';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<Navigate replace to='/buttons' />} path='/' />

        {ROUTES.map(({ element, path }) => (
          <Route key={path} element={element} path={path} />
        ))}
      </Routes>
    </Layout>
  );
};
