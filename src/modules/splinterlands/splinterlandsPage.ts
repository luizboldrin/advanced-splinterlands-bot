import { Browser, chromium, Page } from 'playwright';
import { Splinters, ManaCap, Rules } from '../../@types/modules/splinterlands.d';

export default class SplinterlandsPage {

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

    async closeModal(): Promise<void> {
        await this.page.click('[data-dismiss=modal]');
    }

    async getEcr(): Promise<number> {
        const ecr = await this.page.textContent('//div[@class=\'dec-options\'][1]/div[@class=\'value\'][2]/div');
        return parseFloat(ecr);
    }

    async getDec(): Promise<number> {
        const dec = await this.page.textContent('//div[@class=\'dec-options\'][1]/div[@class=\'value\'][1]/div');
        return parseFloat(dec);
    }

    async getRating(): Promise<number> {
        const rating = await this.page.textContent('span.number_text');
        return parseFloat(rating);
    }

    async collectQuestReward(): Promise<void> {
        const isQuestRewardCollectable = await this.page.isVisible('#quest_claim_btn');

        if (!isQuestRewardCollectable) {
            console.log('no quest reward to be claimed');
            return;
        }

        console.log('claming quest reward');
        await this.page.click('#quest_claim_btn');
    }

    async collectSeasonReward(account: string): Promise<void> {
        const isSeassonRewardCollectable = await this.page.isVisible('#claim-btn');

        if (!isSeassonRewardCollectable) {
            console.log('no season reward to be claimed');
            return;
        }

        console.log((`claiming the season reward. you can check them here https://peakmonsters.com/@${account}/explorer`));
        await this.page.click('#claim_btn');
    }

    async clickOnBattleButton(): Promise<void> {
        await this.page.click('#battle_category_btn');
    }

    async waitOpponent(): Promise<void> {
        await this.page.waitForSelector('.btn--create-team', { timeout: 25000 });
    }

    async getManaCap(): Promise<ManaCap> {
        const manaCapElement = await this.page.$('div.col-md-12 > div.mana-cap__icon');
        const manaCap = await manaCapElement.getAttribute('data-original-title');
        return parseInt(manaCap.split(':').pop(), 10);
    }

    async getRules(): Promise<Rules> {
        const rulesElements = await this.page.$$('div.combat__rules > div.row > div>  img');
        const rules: Array<string> = [];

        for (const ruleElement of rulesElements) {
            rules.push(await ruleElement.getAttribute('data-original-title'));
        }

        return rules.map((r) => r.split(':')[0]);
    }

    async getSplinters(): Promise<Splinters> {
        const splintersElements = await this.page.$$('div.col-sm-4 > img');
        const splinters: Array<string> = [];

        for (const splintersElement of splintersElements) {
            splinters.push(await splintersElement.getAttribute('src'));
        }

        return splinters.map((s) => this.splinterIsActive(s)).filter((s) => s);
    }

    private splinterIsActive(splinterUrl: string) {
        const splinter = splinterUrl.split('/').slice(-1)[0].replace('.svg', '').replace('icon_splinter_', '');
        return splinter.indexOf('inactive') === -1 ? splinter : '';
    }

    //
    //
    // getOpponentRecentePlayedTeams

}
