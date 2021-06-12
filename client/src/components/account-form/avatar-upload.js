/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import '../components-style.css';
import { PropTypes } from 'prop-types';
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
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
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
          </div>
        </div>
      )}
    </ImageUploading>
  );
}

AvatarUpload.propTypes = {
  setAvatar: PropTypes.func,
};
