import { SetMetadata } from '@nestjs/common';

export const META_ROLE = 'roles';

export const RoleProtected = (...args: string[]) => SetMetadata(META_ROLE, args);
