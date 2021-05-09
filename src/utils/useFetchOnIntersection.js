import { useEffect, useRef } from "react"

const useFetchOnIntersection = (fetchFunc) => {
  const observableNodeRef = useRef();
  const observerRef = useRef();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) fetchFunc();
    }, {});

    const observableNode = observableNodeRef.current;
    observerRef.current.observe(observableNode);
    
    return () => observerRef.current.unobserve(observableNode);
  }, [fetchFunc])

  return { observableNodeRef, observerRef };
}

export default useFetchOnIntersection;