import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useUserIsLogin = (userLogIn: boolean) => {
  const router = useRouter()
  useEffect(() => {
    if (userLogIn) {
      router.push('/auctions');
    }
  }, [userLogIn])
}
