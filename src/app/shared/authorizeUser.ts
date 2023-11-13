import { KeyId } from '../constants';
import * as CryptoJS from 'crypto-js';

export const authorizeUser = (
  req: { params: { userId: any }; user: { id: any } },
  res: {
    status: (code: number) => {
      json: (data: { message: string }) => void;
    };
  },
  next: () => void
) => {
  const userId = req.params.userId;
  let authenticatedUserId = localStorage.getItem('userId');

  if (authenticatedUserId) {
    const decryptedData = CryptoJS.AES.decrypt(authenticatedUserId, KeyId);
    authenticatedUserId = decryptedData.toString(CryptoJS.enc.Utf8);
  } else {
    console.log('La variable no se encuentra en localStorage');
  }

  if (userId === authenticatedUserId) {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado' });
    alert('Acceso Denegado!');
    history.back();
  }
};
