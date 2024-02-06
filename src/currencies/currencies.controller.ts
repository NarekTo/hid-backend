import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';

@ApiTags('currencies')
@Controller('currencies')
@UseGuards(JwtAuthGuard) // Apply JWT Auth Guard to all routes
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Create a new currency' })
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currenciesService.create(createCurrencyDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return all currencies' })
  findAll() {
    return this.currenciesService.findAll();
  }

  @Get(':currency_code')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return a currency by code' })
  findOne(@Param('currency_code') currency_code: string) {
    return this.currenciesService.findOne(currency_code);
  }

  @Put(':currency_code')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update a currency' })
  update(
    @Param('currency_code') currency_code: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ) {
    return this.currenciesService.update(currency_code, updateCurrencyDto);
  }

  @Delete(':currency_code')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Remove a currency' })
  remove(@Param('currency_code') currency_code: string) {
    return this.currenciesService.remove(currency_code);
  }
}
