import fs from 'fs/promises';
import Splinterlands from '../splinterlands';

const accountsToGrab = ['schwarszchild', 'kesxel', 'patternroot', 'kenshin24', 'churchilll', 'hyde-20', 'iozealous', 'gorillaglue4', 'owl000', 'lechatsplinter', 'rageteezy', 'keithlyn', 'fapperman', 'carabiner', 'rexymonster', 'klyn', 'shin92', 'jumbawan', 'najla', 'roguex', 'obcydian', 'inzayne', 'dyablo-x', 'friking', 'riab', 'arlyn07', 'wrrrri', 'splinterest1', 'mikhel25', 'e-jen', 'seijuru', 'v4nz777', 'janesh', 'devilz1704', 'maikeru82', 'asenath', 'caloiskie2', 'slasher1417', 'dartisx1', 'stalfberg', 'garbageposter', 'lologom', 'neolegend', 'stoma', 'kaye777', 'sol0kyu', 'deerambo', 'beybikosikulot', 'jaldp', 'chilapo', 'champocloister', 'isaiah-izach', 'chungtlll322', 'chungtlll161', 'undaunted02', 'wrongperson', 'b4dongggg-3', 'koril9', 'keith07', 'sporon', 'xiamara23', 'zklx1v', 'rhosie30', 'wesley23', 'quinxy', 'sland04', 'chooks-tv', 'cassey07', 'sneezy', 'aljan', 'ralphss', 'benz1206', 'missguided', 'hypers', 'jeykiii', 'keepbrite', 'miligan', 'johnhp-01', 'chungtlll139', 'owl001', 'rid90', 'nnn1jls', 'chungtlll151', 'ertsheyker', 'deydey07', 'zentrady4', 'muji02', 'vicente101', 'undaunted01', 'vicente048', 'sps-018', 'arvinaice4', 'vicente056', 'jaggmitchell', 'jqka88', 'sonoson', 'vicente109', 'sterby28', 'dec009', 'eco-worrier'];

(async () => {
    const splinterlands = new Splinterlands();
    const battles = [];

    for (const account of accountsToGrab) {
        const playerBattles = await splinterlands.api.getPlayerBattleHistory(account);
        battles.push(...playerBattles);
    }

    await fs.writeFile('src/data/history.ts', `export default ${JSON.stringify(battles)}`);
})()
    .catch(console.log);
