import { NavigateFunction } from 'react-router-dom';

let navigate: NavigateFunction;

export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav;
};

export const navigateTo = (path: string) => {
  if (navigate) {
    navigate(path);
  } else {
    console.error('Navigate function is not set.');
  }
};
