import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IParseMatchPage } from './types';

@Injectable()
export class MatchStatsService {
    async getMatchPage(id: number): Promise<any> {
        const page = await axios.get("https://www.hltv.org/matches/" + id + "/_");
        return page.data;
    }
    parseMatchPage(matchId: number, page: string): IParseMatchPage {
        const SearchPage = page;
        const mapDiv = `<div class="mapname">`;
        const teamNameDiv = `<div class="results-teamname text-ellipsis">`;
        const scoreDiv = `<div class="results-team-score">`;
        let pos = 0;
        let posEnd = 0;
        let maps = [];
        while(pos!== -1) {
            pos = SearchPage.indexOf(mapDiv, pos + 1);
            if(pos!=-1) {
                posEnd = SearchPage.indexOf(`</div>`, pos + 1);
                const mapName = SearchPage.slice(pos+mapDiv.length,posEnd);
                const teams = [];
                const score = [];
                for(let i =0;i<2;i++) {
                    pos = SearchPage.indexOf(teamNameDiv, pos + 1);
                    posEnd = SearchPage.indexOf(`</div>`, pos + 1);
                    const teamName = SearchPage.slice(pos+teamNameDiv.length,posEnd);
                    teams.push(teamName);
                    pos = SearchPage.indexOf(scoreDiv, pos + 1);
                    posEnd = SearchPage.indexOf(`</div>`, pos + 1);
                    const scoreString = SearchPage.slice(pos+scoreDiv.length,posEnd);
                    score.push(scoreString);
                }
                maps.push({map:mapName, team1: teams[0], team2: teams[1], score1: score[0], score2: score[1]});
            }
        }
        pos = 0;
        const totalStatsDiv = `<table class="table totalstats">`;
        const players = [];
        while(pos!==-1) {
            pos = SearchPage.indexOf(totalStatsDiv, pos + 1);
            console.log(pos);
            if(pos!==-1) {
            posEnd = SearchPage.indexOf(`</table>`,pos +1);
            
            const tableString = SearchPage.slice(pos + totalStatsDiv.length, posEnd);
            let tablePos = 0;
            let tablePosEnd = 0;
            while(tablePos!==-1) {
                tablePos = tableString.indexOf(`<td class="players">`, tablePos+1);
                const spanPlayerNick = `<span class="player-nick">`;
                const player = [];
                if(tablePos!==-1) {
                    tablePos = tableString.indexOf(spanPlayerNick,tablePos+1);
                    tablePosEnd = tableString.indexOf(`</span>`,tablePos+1);
                    const playerNick =  tableString.slice(tablePos+spanPlayerNick.length, tablePosEnd);
                    player.push(playerNick);
                    const newString = tableString.slice(tablePos, tableString.indexOf(`</tr>`,tablePos+1));
                    let statPos = 0;
                    let statPosEnd = 0;
                    while(statPos!=-1) {
                        statPos= newString.indexOf(`<td class="`, statPos+1);
                        if(statPos!==-1) {
                            statPosEnd = newString.indexOf(`</td`,statPos+1);
                            const res = newString.slice(statPos,statPosEnd);
                            player.push(res.slice(res.lastIndexOf('>')+1));
                            
                        }
                    }
                    let delim = player[1].indexOf('-');
                    const kills = Number(player[1].slice(0, delim));
                    const deaths = Number(player[1].slice(delim + 1));
                    players.push({
                        name:player[0],
                        kills: kills, 
                        deaths: deaths,
                        diff: kills-deaths,
                        adr: Number(player[3]),
                        kast: player[4],
                        rating: Number(player[5])
                    });
                }
                
                
            }
        }
        }
        return {maps: maps, players:players};
    }
    calculateParsedPage(data: any) {
        const total = {team1:{},team2:{}};
        const maps = {};
        return data;

    }
    async calculateMatchStats(id: number) {
        const page = await this.getMatchPage(id);
        const parsedResult = this.parseMatchPage(id, page);
        const calculatedResult = this.calculateParsedPage(parsedResult);
        return calculatedResult;
    }
}
