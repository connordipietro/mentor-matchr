/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { PropTypes } from 'prop-types';
import ImageUploading from 'react-images-uploading';
import '../style/components-style.css';
import BackupIcon from '@material-ui/icons/Backup';

export default function AvatarUpload({ setAvatar }) {
  const [images, setImages] = useState([]);
  const onChange = (imageList) => {
    // data for submit
    setImages(imageList);
    setAvatar(imageList);
  };

  return (
    <ImageUploading
      multiple={false}
      value={images}
      onChange={onChange}
      dataURLKey="data_url"
      maxFileSize={5000000}
      acceptType={['jpg', 'jpeg', 'gif', 'png']}
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
        errors,
      }) => (
        <div className="upload__image-wrapper">
          <button
            className="image-upload"
            type="button"
            style={isDragging ? { color: 'red' } : null}
            onClick={onImageUpload}
            {...dragProps}
          >
            <BackupIcon />
            <br />
            Click or Drop Here to Upload
          </button>
          &nbsp;
          <div className="upload__image-wrapper">
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button type="button" onClick={() => onImageUpdate(index)}>
                    Update
                  </button>
                  <button type="button" onClick={() => onImageRemove(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {errors && (
              <div>
                {errors.maxFileSize && <span>Max image file size is 5mb.</span>}
                {errors.acceptType && (
                  <span>Only jpg, jpeg, gif, and png are allowed.</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </ImageUploading>
  );
}

AvatarUpload.propTypes = {
  setAvatar: PropTypes.func,
};
