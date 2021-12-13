import { Browser, chromium, Page } from 'playwright';

export default class SplintelandsPage {

    browser: Browser;

    page: Page;

    async init(): Promise<void> {
        this.browser = await chromium.launch({
            headless: false,
            slowMo: 100,
        });
        this.page = await this.browser.newPage();
    }

    async gotoBattlePage() {
        if (this.page.url() === 'https://splinterlands.com/?p=battle_history') {
            return;
        }
        await this.page.goto('https://splinterlands.com/?p=battle_history');
    }

    async isUserLogged(account: string) {
        const loggedAccount = await this.page.textContent('.dropdown-toggle .bio__name__display');

        return account === loggedAccount;
    }

    async login(account: string, password: string) {
        if (await this.isUserLogged(account)) {
            return;
        }

        await this.page.click('#log_in_button > button');
        await this.page.fill('#email', account);
        await this.page.fill('#password', password);
        await this.page.keyboard.press('Enter');
    }

}
