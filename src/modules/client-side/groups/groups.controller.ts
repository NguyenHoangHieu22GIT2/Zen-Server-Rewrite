import { Controller, Inject } from '@nestjs/common';
import {
  IGroupService,
  IGroupServiceString,
} from 'src/modules/community/group/services';

@Controller('groups')
export class GroupsController {
  constructor(
    @Inject(IGroupServiceString) private readonly groupService: IGroupService,
    @Inject(IGroupServiceString)
    private readonly groupMemberService: IGroupService,
  ) {}
}
