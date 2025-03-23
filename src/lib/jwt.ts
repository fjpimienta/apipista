import { IJwt } from '../interfaces/jwt.interface.js';
import { EXPIRETIME, MESSAGES } from './../config/constants.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class JWT {
  private secretKey = process.env.SECRET_KEY || 'ApIPiStAsEcReT2024';

  // Informacion del payload con fecha de caducidad 24 horas por defecto
  sign(data: IJwt, expiresIn: number = EXPIRETIME.H24): string {
    return jwt.sign(
      { user: data.user },
      this.secretKey,
      { expiresIn }
    );
  }

  verify(token: string): string | object {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return MESSAGES.TOKEN_VERICATION_FAILED;
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return MESSAGES.TOKEN_VERICATION_FAILED;
      }
      return MESSAGES.TOKEN_VERICATION_FAILED;
    }
  }
}

export default JWT;
