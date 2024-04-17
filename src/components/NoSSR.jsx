import { ReactNode, useEffect, useState } from 'react';

const EmptySpan = () => <span />;

const NoSSR = (props) =>  {
  const { onSSR = EmptySpan, children = <EmptySpan /> } = props;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  });

  return isMounted ? children : onSSR({});
};

export { NoSSR };