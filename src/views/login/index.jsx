import { useEffect, useState } from 'react';
import { uuid } from '@/assets/common/utils';
import { getCheckCodeUrl } from '@/service/request/login';
import AkContainer from '../../components/AkContainer';

const LoginPage = () => {
  const [codeId, setCodeId] = useState('');

  useEffect(() => {
    setCodeId(getCheckCodeUrl(uuid()));
  }, []);

  return (
    <AkContainer>
      <div className='ak-login-box'>
        <div className='ak-login-wrapper'>
          {/* title */}
          123
        </div>
        <img src={codeId} alt='验证码' />
      </div>
    </AkContainer>
  );
};

export default LoginPage;
