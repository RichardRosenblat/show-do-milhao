import { ResponseUserDTO } from '../dto/responseUser.dto';
import { User } from '../entitity/user.entity';

export function userEntityToResponseDTO(user: User) {
  if (!user) {
    return user;
  }
  const dto = new ResponseUserDTO();
  const { password, ...userWithoutPassword } = user;

  Object.entries(userWithoutPassword).forEach(([k, v]) => (dto[k] = v));

  return dto;
}
