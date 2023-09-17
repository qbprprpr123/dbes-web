import './index.scss';

const AkContainer = (props) => {
  return (
    <div className='ak-container'>
      <div className='table-container'>{props?.children}</div>
    </div>
  );
};

export default AkContainer;
