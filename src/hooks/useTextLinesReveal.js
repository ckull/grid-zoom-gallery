import React, { useEffect, useState } from 'react'
import SplitType from 'split-type'


const useTextLinesReveal = (element) => {
    const [lines, setLines] = useState()
    // useEffect(() => {
    //     console.log('elements: ', elements)
    //     const text = new SplitType(elements, { types: 'lines' })

    //     console.log('text: ', text)
    // }, [])
    const text = new SplitType(element, { types: 'lines' })

    console.log('text: ', text)

 
}

export default useTextLinesReveal