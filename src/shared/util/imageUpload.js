import axios from "axios";
import toast from "react-hot-toast";


const image_hosting_key = import.meta.env.VITE_IMAGE_UPLOAD_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

export const imageUpload = async(file) => {
  const formData= new FormData()
  formData.append('image',file)
  try{
    const res = await axios.post(image_hosting_api,formData)
    return res.data.data.url;
  }catch(err) {
    toast.error('Error uploading image:', err)
    return
  }
}
