import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import request from '@/service/index';

let cancelRequest = null;

const AkImage = (props) => {
  const { children, src, httpRequest } = props;
  const childArray = React.Children.toArray(children);
  const errorSlot = [];
  const placeholderSlot = [];

  childArray.forEach((child) => {
    const { slot } = child?.props;
    if (slot === 'placeholder') {
      placeholderSlot.push(child);
    }
    if (slot === 'error') {
      errorSlot.push(child);
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  // 默认请求方式
  const defaultHttpRequest = () => {
    return request.get(src, {
      responseType: 'blob',
      cancelToken: new axios.CancelToken((c) => {
        cancelRequest = c;
      }),
    });
  };

  // 加载失败
  const loadImageErrorHandle = () => {
    setError(true);
    setLoading(false);
  };

  // 移除blob url
  const revokeBlobUrlHandle = () => {
    if (imageSrc) {
      global.URL.revokeObjectURL(imageSrc);
      setImageSrc(null);
    }
  };

  // 加载图片
  const loadImageHandle = async () => {
    // 中断请求
    cancelRequest?.();

    if (!src) return loadImageErrorHandle();

    revokeBlobUrlHandle();

    // 重置状态
    setError(false);
    setLoading(true);

    try {
      const requestFn = httpRequest || defaultHttpRequest;

      const blob = await requestFn(src);
      setError(false);
      setLoading(false);
      setImageSrc(global.URL.createObjectURL(blob));
    } catch (e) {
      if (e?.message !== 'canceled') {
        loadImageErrorHandle();
      }
    }
  };

  useEffect(() => {
    loadImageHandle();

    return () => {
      revokeBlobUrlHandle();
    };
  }, []);

  useEffect(() => {
    loadImageHandle();
  }, [src]);

  return (
    <div className='ak-image-box'>
      <div className='ak-image-placeholder'>
        {loading && (placeholderSlot.length ? placeholderSlot : <LoadingOutlined className='ak-image-loading' />)}
        {error && errorSlot}
        {!loading && !error && (
          <img className='ak-image-inner' src={imageSrc} alt='code' onError={loadImageErrorHandle} />
        )}
      </div>
    </div>
  );
};

export default AkImage;
