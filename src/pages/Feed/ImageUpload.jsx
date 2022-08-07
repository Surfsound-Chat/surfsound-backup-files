import { uploadImage} from '../../redux/postSlice';
import {useDispatch } from 'react-redux';
import { FcPicture } from "../../utils/icons";
// import dotenv from 'dotenv';
// dotenv.config();
const UPLOAD_PRESET = "kj8awleh";
const ImageUpload = () => {
    const dispatch = useDispatch();

    const handleFile = (e) => {
        const { files } = e.target;
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', UPLOAD_PRESET);
        // dispatch(updateUploadStatus());
        dispatch(uploadImage(formData));
    };

    return (
      
        <form>
            <div className='form-group'>
                <input type='file' id='file' style={{ display: 'none' }} onChange={(e) => handleFile(e)} />
                <label htmlFor='file'>
                <FcPicture size={24} />
                </label>
            </div>
        </form>
    );
};

export default ImageUpload;