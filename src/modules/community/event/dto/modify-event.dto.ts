import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';

export class ModifyEventDto extends PartialType(CreateEventDto) {}
