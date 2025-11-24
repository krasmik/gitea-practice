import { test as base, Page } from '@playwright/test';
import RegisterPage from '../../pom/pages/registerPage';
import DashboardPage from '../../pom/pages/DashboardPage';


type App = {
    page: Page,
    registerPage: RegisterPage;
    dashboardPage: DashboardPage;
};

export const test = base.extend<{ app: App }>({
    app: async ({ page }, use) => {
        const app: App = {
            page,
            registerPage: new RegisterPage(page),
            dashboardPage: new DashboardPage(page),
        };
        await use(app);
    },
});

export { expect } from '@playwright/test';