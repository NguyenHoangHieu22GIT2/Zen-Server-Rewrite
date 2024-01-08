import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnduserService } from './enduser.service';
import { CreateEnduserDto } from './dto/create-enduser.dto';
import { UpdateEnduserDto } from './dto/update-enduser.dto';
import {
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('End User')
// @ApiHeader({
//   name: 'X-MyHeader',
//   description: 'Custom header',
// })
@Controller('enduser')
export class EnduserController {
  constructor(private readonly enduserService: EnduserService) {}

  @ApiBody({ type: CreateEnduserDto })
  @ApiResponse({
    status: 201,
    description: 'your account has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Invalid inputs' })
  @Post()
  create(@Body() createEnduserDto: CreateEnduserDto) {
    console.log('Hello world');
    return this.enduserService.create(createEnduserDto);
  }

  @Get()
  findAll() {
    return this.enduserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enduserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnduserDto: UpdateEnduserDto) {
    return this.enduserService.update(+id, updateEnduserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enduserService.remove(+id);
  }
}
