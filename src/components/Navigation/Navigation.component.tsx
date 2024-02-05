import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link } from '@nextui-org/link';
import path from '../../config/path';
import { useContext } from 'react';
import SessionContext from '../../context';

const Navigation = () => {
  const { pathname } = useLocation();

  const checkIsActive = (to: string) => {
    if (pathname === path.home) {
      return pathname === to;
    }
    const toPath = to.length > 1 ? to.replaceAll('/', '') : 'null';
    return pathname.split('/').includes(toPath);
  };

  const { currentSession } = useContext(SessionContext);
  const isLoggedIn = !!currentSession;

  return isLoggedIn ? (
    <div className="w-full flex justify-center items-center gap-unit-md px-unit-lg pb-unit-lg md:pb-unit-xl lg:pb-unit-2xl">
      <Link
        as={RouterLink}
        to={path.workouts}
        isBlock
        color={checkIsActive(path.workouts) ? 'success' : 'foreground'}
      >
        Workouts
      </Link>
      <Link
        as={RouterLink}
        to={path.exercises}
        isBlock
        color={checkIsActive(path.exercises) ? 'success' : 'foreground'}
      >
        Exercises
      </Link>
      <Link
        as={RouterLink}
        to={path.profile}
        isBlock
        color={checkIsActive(path.profile) ? 'success' : 'foreground'}
      >
        Profile
      </Link>
    </div>
  ) : null;
};

export default Navigation;
