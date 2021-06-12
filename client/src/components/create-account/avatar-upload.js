/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import '../components-style.css';
import { PropTypes } from 'prop-types';
import { Typography } from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';

export default function AvatarUpload({ setAvatar }) {
  const [images, setImages] = useState([]);
  const maxNumber = 6;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    setAvatar(imageList);
  };

  return (
    <>
      <Typography variant="h6">Upload a profile picture</Typography>
      <ImageUploading
        multiple={false}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
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
            {/*     <button type="button" onClick={onImageRemoveAll}>
              Remove all images
            </button> */}
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
    </>
  );
}

AvatarUpload.propTypes = {
  setAvatar: PropTypes.func,
};
