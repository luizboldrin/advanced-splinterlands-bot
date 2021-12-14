import SplinterlandsApi from './splinterlandsApi';
import SplinterlandsPage from './splinterlandsPage';

export default class Splinterlands {

    page: SplinterlandsPage;

    api: SplinterlandsApi;

    constructor() {
        this.page = new SplinterlandsPage();
        this.api = new SplinterlandsApi();
    }

    async init() {
        await this.page.init();
    }

}
