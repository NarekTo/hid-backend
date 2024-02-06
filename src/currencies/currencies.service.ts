import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Injectable()
export class CurrenciesService {
  constructor(private prisma: PrismaService) {}

  create(createCurrencyDto: CreateCurrencyDto) {
    return this.prisma.lookup_currency_codes.create({
      data: createCurrencyDto,
    });
  }

  findAll() {
    return this.prisma.lookup_currency_codes.findMany();
  }

  findOne(currency_code: string) {
    return this.prisma.lookup_currency_codes.findUnique({
      where: { currency_code },
    });
  }

  update(currency_code: string, updateCurrencyDto: UpdateCurrencyDto) {
    return this.prisma.lookup_currency_codes.update({
      where: { currency_code },
      data: updateCurrencyDto,
    });
  }

  remove(currency_code: string) {
    return this.prisma.lookup_currency_codes.delete({
      where: { currency_code },
    });
  }
}
