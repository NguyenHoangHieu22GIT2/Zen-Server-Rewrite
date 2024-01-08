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
