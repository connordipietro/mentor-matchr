import { useState, useEffect } from 'react';
import { checkIfBanner } from '../../utilities/api';
import '../style/components-style.css';

export default function Banner() {
  const [bannerStatus, setBannerStatus] = useState();
  const [bannerMsg, setBannerMsg] = useState('');

  useEffect(() => {
    checkIfBanner()
      .then(({ data }) => {
        setBannerMsg(data.bannerMsg);
        setBannerStatus(true);
      })
      .catch((err) => {
        setBannerStatus(false);
      });
  });
  return !bannerStatus ? null : (
    <div className="banner">
      <div className="banner-inner">{bannerMsg}</div>
    </div>
  );
}
