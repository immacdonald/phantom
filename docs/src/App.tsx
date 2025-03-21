import 'phantom-library/styles';
import 'phantom-library/tokens';
import './index.module.scss';
import { FC } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { StyledApp } from 'phantom-library';
import { Layout } from '@components/Layout';
import { ErrorView, Home } from '@views';
import { routes } from './routes';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: (
                <StyledApp banners modals anchors rootId="root">
                    <Outlet />
                </StyledApp>
            ),
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/components',
                    element: (
                        <Layout>
                            <Outlet />
                        </Layout>
                    ),
                    children: [
                        ...routes.flatMap((route) =>
                            route.navigation.map((nav) => ({
                                path: nav.link.replace(/^\//, ''),
                                element: nav?.docs || false
                            }))
                        )
                    ]
                },
                { path: '*', element: <ErrorView /> }
            ]
        }
    ],
    {
        basename: import.meta.env.BASE_URL
    }
);

const App: FC = () => {
    return <RouterProvider router={router} />;
};

export { App };
