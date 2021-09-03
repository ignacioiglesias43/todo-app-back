import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { StatusesService } from './statuses.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('status')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.statusesService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusesService.findOne(+id);
  }
}
