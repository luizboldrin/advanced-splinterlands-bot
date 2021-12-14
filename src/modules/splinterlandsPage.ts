import { Browser, chromium, Page } from 'playwright';

export default class SplintelandsPage {

    browser: Browser;

    page: Page;

    async init(): Promise<void> {
        this.browser = await chromium.launch({
            headless: false,
            slowMo: 100,
            args: ['--window-position=1920,0', '--das-size=1000,1000'],
        });
        this.page = await this.browser.newPage();
    }

    async gotoBattlePage() {
        await this.page.goto('https://splinterlands.com/?p=battle_history');
    }

    async isUserLogged(account: string) {
        const loggedAccount = await this.page.textContent('.dropdown-toggle .bio__name__display');

        return account === loggedAccount;
    }

    async login(account: string, password: string) {
        try {
            await this.page.click('#log_in_button > button');
            await this.page.fill('#email', account);
            await this.page.fill('#password', password);
            await this.page.focus('#password');
            await this.page.keyboard.press('Enter');
            await this.page.waitForNavigation();
        } catch (e) {
            throw new Error('Didnt login');
        }
    }

    async closeModal() {
        await this.page.click('[data-dismiss=modal]');
    }

    async getEcr() {
        // TODO
    }

    async getDec() {
        // TODO
    }

    async getRating() {
        // TODO
    }

    async getCards() {
        // TODO
    }

    async isRewardCollectable() {
        // TODO
    }

    async getQuest() {
        // TODO
    }

}
