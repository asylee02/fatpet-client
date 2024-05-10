import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav-layout';
import WithAuth from '@/hocs/WithAuth';

const MemberLayout = () => {
  return (
    <div className="max-w-[480px] border-x-2 w-full h-full ">
      <div className="h-layout-main pt-12 px-8 overflow-auto scrollbar-hidden">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

export default WithAuth(MemberLayout);
