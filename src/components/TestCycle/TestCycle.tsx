import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const ChildComponent1 = (props: any) => {
  const mounted = useRef(false);
  useLayoutEffect(() => {
    mounted.current = true;
  }, []);

  if (!mounted.current) return <div>Not Mounted</div>;

  return <div>Mounted</div>;
};

const ChildComponent3 = () => {
  return <ChildComponent1 />;
};

const TestCycle = (props: any) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 3) {
      setCount((count) => count + 1);
    }
  }, [count]);

  const ChildComponent2 = () => {
    return <ChildComponent1 />;
  };

  const ChildComponent4 = useMemo(() => {
    return <ChildComponent1 />;
  }, [count]);

  // return <ChildComponent2 />;
  return ChildComponent4;
};

export default TestCycle;
