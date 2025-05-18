import { useEffect } from 'react';
const Even = () => {
  useEffect(() => {

    // 3. unmount : 죽음
    // 클린업, 정리함수
    // 컴포넌트가 사라질 때 실행되는 함수
    return () => {
      console.log(`unmount`);
    }
  }, []);

  return <div>짝수입니다.</div>;
};

export default Even;
