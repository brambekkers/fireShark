import { useFileDialog } from '@vueuse/core'
import { ref as storageRef, deleteObject  } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'

export const useImage = (fileLocation) => {
  const storage = useFirebaseStorage()
  const fileRef = storageRef(storage, fileLocation)
  
  const {
    url,
    // gives you a percentage between 0 and 1 of the upload progress
    uploadProgress,
    uploadError,
    // firebase upload task
    uploadTask,
    upload,
  } = useStorageFile(fileRef)
  
  const uploadPicture = (data, meta) => {
    // console.log(data)
    if (data) {
      upload(data)
      console.log(url.value)
    }
  }

  const deletePicture = async () => {
    try {
      await deleteObject(fileRef)
      url.value = null
    } catch (error) {
      return error
    }
  }
  


  return {
    uploadPicture,
    deletePicture,
    url,
    uploadError,
    uploadProgress,
    uploadTask,
  };
};

export default useImage;
