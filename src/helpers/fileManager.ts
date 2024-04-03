import firebaseAdmin from 'firebase-admin';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import serviceAccount from '../eventer-7928b-firebase-adminsdk-okvon-6c07114cbd.json';

const admin = firebaseAdmin.initializeApp({
  //@ts-ignore
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket('gs://eventer-7928b.appspot.com/');

export async function uploadFile(path: string, filename: string) {
  const storage: any = await storageRef.upload(path, {
    public: true,
    destination: `/uploads/hashnode/${filename}`,
    metadata: {
      firebaseStorageDownloadTokens: uuidv4(),
    }
  });
  return storage[0].metadata.mediaLink;
}
