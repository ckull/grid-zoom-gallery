import React, { useEffect, useState } from 'react'
import SplitType from 'split-type'
import gsap from 'gsap'
import { wrapLines } from '../../utils'
export const wrapTextLinesReveal = (elements) => {
  
    console.log('elemetns: ', elements)
    let arr = gsap.utils.toArray('.anim')
    console.log('elemetns: ', arr)
    for(const el of arr) {
        console.log('el : ', el)
        const text = new SplitType(el, { types: 'lines' })
        wrapLines(text.lines, 'div', 'line-wrap')

    }
}


export const inTextLinesReveal = (elements) => {
    console.log('content Ref: ', elements)
    const q = gsap.utils.selector(elements)

    console.log('lines: ', q('.line'))
    return gsap.timeline({
        defaults: 1.2,
        ease: 'expo'
    }).set(q('.line'), {
        y: '150%',
    }).to(q('.line'), {
        y: '0%',
        rotate: 0,
        stagger: 0.04
    })
}

export const outTextLinesReveal = (elements) => {
    console.log('content Ref: ', elements)
    const q = gsap.utils.selector(elements)

    return gsap.timeline({
        defaults: 1,
        ease: 'expo.in'
    }).to(q('.line'), {
        y: '-150%',
        // rotate: -5,
        stagger: 0.02
    })
}
