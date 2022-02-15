import { Controller, Get, Param } from '@nestjs/common';
import { MatchStatsService } from './match-stats.service';

@Controller('match-stats')
export class MatchStatsController {
    constructor(private readonly MatchStatsService: MatchStatsService) {}

    @Get(':id')
    async getMatchesByPlayer(@Param() params): Promise<any> {
        const id = params.id;
        const res = await this.MatchStatsService.calculateMatchStats(id);
        return res;
    }
}
