import { Injectable } from '@nestjs/common';
import axios from 'axios';
/*
<td class="statsCenterText">29 - 16</td>
<td class="gtSmartphone-only centerStat won">+13</td>
<td class="match-won ratingPositive">1.54</td>
*/

/*
<tr class="group-1 ">
                    <td><a href="https://www.hltv.org/stats/matches/mapstatsid/79584/x6tence-galaxy-vs-winstrike?contextIds=16612&amp;contextTypes=player">
                        <div class="time" data-time-format="d/M/yy" data-unix="1545138000000">18/12/18</div>
                      </a></td>
                    <td>
                      <div class="gtSmartphone-only"><a href="https://www.hltv.org/stats/teams/9183/winstrike" class="inline-block" data-tooltip-id="uniqueTooltipId-1608303548">
                          <div class="text-center"><img alt="Winstrike" src="./n0rb3r7 match history _ HLTV.org_files/TsHpwfnv_gFU54oayT80gq.svg" class="statsLogo smartphone-only" title="Winstrike"></div>
<span><img alt="Russia" src="./n0rb3r7 match history _ HLTV.org_files/RU.gif" class="flag" title="Russia">Winstrike</span></a><span> (17)</span></div>
                      <div class="smartphone-only"><a href="https://www.hltv.org/stats/teams/9183/winstrike" class="block" data-tooltip-id="uniqueTooltipId--960033384">
                          <div class="text-center"><img alt="Winstrike" src="./n0rb3r7 match history _ HLTV.org_files/TsHpwfnv_gFU54oayT80gq.svg" class="statsLogo smartphone-only" title="Winstrike"></div>
                        </a></div>
                    </td>
                    <td>
                      <div class="gtSmartphone-only"><a href="https://www.hltv.org/stats/teams/9481/x6tence-galaxy" class="inline-block" data-tooltip-id="uniqueTooltipId-1019884287">
                          <div class="text-center"><img alt="x6tence Galaxy" src="./n0rb3r7 match history _ HLTV.org_files/1Sxcm-3thUL7D4FXz4DGs7.png" class="statsLogo smartphone-only" title="x6tence Galaxy"></div>
<span><img alt="Sweden" src="./n0rb3r7 match history _ HLTV.org_files/SE.gif" class="flag" title="Sweden">x6tence Galaxy</span></a><span> (19)</span></div>
                      <div class="smartphone-only"><a href="https://www.hltv.org/stats/teams/9481/x6tence-galaxy" class="block" data-tooltip-id="uniqueTooltipId-1128505264">
                          <div class="text-center"><img alt="x6tence Galaxy" src="./n0rb3r7 match history _ HLTV.org_files/1Sxcm-3thUL7D4FXz4DGs7.png" class="statsLogo smartphone-only" title="x6tence Galaxy"></div>
                        </a></div>
                    </td>
                    <td class="statsMapPlayed">d2</td>
                    <td class="statsCenterText">34 - 26</td>
                    <td class="gtSmartphone-only centerStat won">+8</td>
                    <td class="match-lost ratingPositive">1.33</td>
                  </tr>
*/
@Injectable()
export class HltvParserService {
    async getMatchHistoryPage(id: number): Promise<any> {
        const page = await axios.get("https://www.hltv.org/stats/players/matches/"+ id + "/_");
        return page.data;
    }
    parseMatchHistoryPage(playerId: number, page: string): any {
        const SearchPage = page;
        const titleStart = SearchPage.indexOf("<title>");
        const titleEnd = SearchPage.indexOf("</title>");
        const title = SearchPage.slice(titleStart+7, titleEnd);
        const firstSpace = title.indexOf(' ');
        const nickname = title.slice(0, firstSpace);
        let pos;
        let td;
        let newtd;
        let res = [];
        let str;
        let lastInd;
        let infoStr;
        let id =1;
        while (pos !== -1) {
            let arr = [];
            pos = SearchPage.indexOf(`<tr class="group`, pos + 1);
            if(pos!==-1) {
                const teams = [];
                for(let i =0;i<2;i++) {
                    const end = SearchPage.indexOf(`</span></a><span>`, pos + 1);
                    const endStr = SearchPage.slice(pos+1,end);
                    const start = endStr.lastIndexOf(`>`);
                    teams.push(SearchPage.slice(pos+2+start,end));
                    pos = end;
                }

                pos = SearchPage.indexOf("statsMapPlayed", pos + 1);
                td = pos;
                //console.log(pos);
                for(let i =0;i<4;i++) {
                    newtd = SearchPage.indexOf("</td>", td + 1);
                    str = SearchPage.slice(td,newtd);
                    lastInd = str.lastIndexOf(">");
                    infoStr = str.slice(lastInd + 1);
                    arr.push(infoStr);
                    //console.log(arr);
                    td=newtd;
                }
                let delim = arr[1].indexOf('-');
                res.push({ 
                    id: id,
                    team1: teams[0], 
                    team2: teams[1], 
                    map: arr[0], 
                    kills: Number(arr[1].slice(0, delim)), 
                    deaths:Number(arr[1].slice(delim + 1)), 
                    diff: Number(arr[2]), 
                    rating: Number(arr[3])
                });
                id++;
            }
        }
        return {id: playerId, name: nickname, matches: res};
    }
    
    calculateParsedPage(parseResult: any): any {
        let totalKills = {}
        let totalDeaths = {};
        let maps = {};
        let team1 = {};
        let team2 = {};
        parseResult.matches.map((obj) => {
            if(totalKills[obj.kills] === undefined)
            totalKills[obj.kills] = 0;
            if(totalDeaths[obj.deaths] === undefined)
            totalDeaths[obj.deaths] = 0;
            if(maps[obj.map] === undefined)
            maps[obj.map] = 0;
            if(team1[obj.team1] === undefined)
            team1[obj.team1] = 0;
            if(team2[obj.team2] === undefined)
            team2[obj.team2] = 0;

            totalKills[obj.kills]++;
            totalDeaths[obj.deaths]++;
            maps[obj.map]++;
            team1[obj.team1]++;
            team2[obj.team2]++;
        });
        return {name: parseResult.name, kills:totalKills,deaths:totalDeaths, maps: maps,team1:team1, team2:team2};
    }
    async calculateMatchHistory(id: number): Promise<any> {
        const text = await this.getMatchHistoryPage(id);
        const parseResult = this.parseMatchHistoryPage(id, text.toString());
        const calculatedResult = this.calculateParsedPage(parseResult);
        return calculatedResult;
    }
}
