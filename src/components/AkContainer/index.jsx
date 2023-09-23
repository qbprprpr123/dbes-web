import './index.scss';

const AkContainer = (props) => {
  const { children, className } = props;
  return (
    <div className={`ak-container ${className}`}>
      <div className='table-container'>{children}</div>
    </div>
  );
};

export default AkContainer;
