import { useEffect, useState } from 'react'
import  ReactDOM  from 'react-dom/client'
export const useWindowScrollPositions = () => {

   const [scrollPosition, setPosition] = useState({ scrollX: 0, scrollY: 0 })

   useEffect(() => {
    function updatePosition() {
        setPosition({ scrollX: window.scrollX, scrollY: window.scrollY })
    }

    window.addEventListener('scroll', updatePosition)
    updatePosition()

    
   }, [])

   return scrollPosition
}

export const MyComponent = () => {
  const { scrollX, scrollY } = useWindowScrollPositions()
  
  return <div>Scroll position is ({scrollX}, {scrollY})</div>
} 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyComponent />);