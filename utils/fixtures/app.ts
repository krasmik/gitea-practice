import { test as base, Page } from '@playwright/test';
import RegisterPage from '../../pom/pages/RegisterPage';
import DashboardPage from '../../pom/pages/DashboardPage';
import CreateRepositoryPage from '../../pom/pages/CreateRepositoryPage';
import RepositoryPage from '../../pom/pages/RepositoryPage';
import RepositorySettingsPage from '../../pom/pages/RepositorySettingsPage';

type App = {
    page: Page;
    registerPage: RegisterPage;
    dashboardPage: DashboardPage;
    createRepositoryPage: CreateRepositoryPage;
    repositoryPage: RepositoryPage;
    repositorySettingsPage: RepositorySettingsPage;
};

export const test = base.extend<{ app: App }>({
    app: async ({ page }, use) => {
        const app: App = {
            page,
            registerPage: new RegisterPage(page),
            dashboardPage: new DashboardPage(page),
            createRepositoryPage: new CreateRepositoryPage(page),
            repositoryPage: new RepositoryPage(page),
            repositorySettingsPage: new RepositorySettingsPage(page),
        };
        await use(app);
    },
});

export { expect } from '@playwright/test';