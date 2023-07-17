import { Response } from 'express';
export function setRefreshTokenCookie(res: Response, payload: string) {
  res.cookie('refreshToken', payload, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
}
