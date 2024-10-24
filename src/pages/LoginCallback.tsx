import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function LoginCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const authorizationCode = queryParams.get('code');

    if (authorizationCode) {
      fetch('/api/auth/login/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: authorizationCode,
          platform: 'Naver',
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.uuid) {
            navigate('/EmailVerification', { state: { uuid: data.uuid } });
          } else if (data.jwtToken) {
            document.cookie = `jwtToken=${data.jwtToken}; path=/; secure; samesite=strict`;
            navigate('/Home');
          }
        });
    }
  }, [location, navigate]);

  return <div>로그인 처리 중...</div>;
}
