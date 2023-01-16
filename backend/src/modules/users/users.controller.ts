import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // ---------- Users READ ---------- //
  @Get()
  async getAll() {
    return await this.usersService.getAll();
  }
  @Get('/softdeleted')
  async getAllSoftDeleted() {
    return await this.usersService.getAllSoftDeleted();
  }

  @Get('/:userId')
  async getOneById(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.usersService.getOneById(userId);
    if (user) return user;
    else throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
  }
  @Get('/email/:email')
  async getOneByEmail(@Param('email') email: string) {
    const user = await this.usersService.getOneByEmail(email);
    if (user) return user;
    else throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
  }

  // ---------- Retrieving specific fields ---------- //
  @Get('/all/:fieldName')
  async getAllOfOneField(@Param('fieldName') fieldName: string) {
    return await this.usersService.getAllOfOneField(fieldName);
  }

  // ---------- Users CREATE ---------- //
  @Post()
  @UsePipes(ValidationPipe)
  async createOne(@Body() createUserDtoEntity: CreateUserDto) {
    return await this.usersService.createOne(createUserDtoEntity);
  }

  // ---------- Users UPDATE ---------- //
  @UseGuards(JwtAuthGuard)
  @Put()
  @UsePipes(ValidationPipe)
  async updateOne(@Body() updateUserDtoEntity: UpdateUserDto) {
    return await this.usersService.updateOne(updateUserDtoEntity);
  }

  // ---------- Users DELETE ---------- //
  @UseGuards(JwtAuthGuard)
  @Delete('/:userId')
  async softDeleteOne(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.softDeleteOne(userId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/permanent-delete/:userId')
  async deleteOne(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.deleteOne(userId);
  }

  // ---------- Users Restore ---------- //
  @UseGuards(JwtAuthGuard)
  @Put('/restore-one/:userId')
  async restoreOne(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.restoreOne(userId);
  }
}
