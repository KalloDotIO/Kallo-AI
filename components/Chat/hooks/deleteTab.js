import React, { useRef,useEffect } from 'react'

export default function deleteTab(handler) {
    const node = useRef(null)
    const clickOutside = (ref, handler) => {useEffect(() => {
        function listener(e) {
            if(ref.current == e.target || ref.current?.contains(e.target)) {
                return
            }
            handler(e)
        }
  
      document.addEventListener('mousedown', listener)
  
      return () => { 
          document.removeEventListener('mousedown', listener) 
      }
  
      }, [ref, handler] )}
      
      if(node) clickOutside(node, handler)    //setDisplay(false))
  return  node
}
