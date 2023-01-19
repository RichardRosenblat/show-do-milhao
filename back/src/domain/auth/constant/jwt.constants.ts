import * as dotEnv from 'dotenv';

dotEnv.config();
export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
