import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from './../../users/decorator/current-user.decorator';
import { CreateReportDto } from './../dtos/create-report.dto';
import { Serialize } from './../../interceptors/serialize.interceptor';
import { ReportDto } from './../dtos/report.dto';
import { AuthGuard } from './../../guards/auth.guard';
import { ReportsService } from './../service/reports.service';
import { UserEntity } from './../../users/entity/user.entity';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity) {
      return this.reportsService.create(body, user);
    }
}
