import { ResponseUserDTO } from '../dto/responseUser.dto';
import { User } from '../entitity/user.entity';

export function userEntityToResponseDTO(user: User) {
  if (!user) {
    return null;
  }
  const dto = new ResponseUserDTO();

  Object.entries(user).forEach(([k, v]) => (dto[k] = v));

  return dto;
}
