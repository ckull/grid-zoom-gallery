import React, {
  useRef,
  useEffect,
  forwardRef,
  useState,
  Children,
  useLayoutEffect,
} from "react"
import { Container, GridItem, MiniGridItem } from "./styled"
import { images } from './data'
import gsap from "gsap"
import SplitType from "split-type"
import {
  wrapTextLinesReveal,
  inTextLinesReveal,
  outTextLinesReveal,
} from "../Effects/textLinesReveal"
import { adjustedBoundingRect, calcWinsize } from "src/utils"
import { useLenis } from "@studio-freight/react-lenis"
const START = "start"
const SHOW_CONTENT = "showContent"
const SHOW_GRID = "showGrid"

const GridImage = forwardRef(({ row, col, imgUrl, ...props }, ref) => {
  return (
    <GridItem ref={ref} row={row} col={col} imgUrl={imgUrl} {...props}>
      <div className="img">
        <div className="inner" />
      </div>
    </GridItem>
  )
})

const MiniGridImage = forwardRef(({ row, col, imgUrl, ...props }, ref) => {
  return (
    <MiniGridItem ref={ref} row={row} col={col} imgUrl={imgUrl} {...props}>
      <div className="img">
        <div className="inner" />
      </div>
    </MiniGridItem>
  )
})

const MiniGrid = forwardRef(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className="grid grid-cols-4 w-full h-full">
      {children}
    </div>
  )
})

const Home = () => {
  let imagesRef = useRef([])
  let tl = useRef()
  let currentRef = useRef()
  let currentIndexRef = useRef(0)
  let winSize = useRef()
  let isAnimating = useRef(false)
  let isGridView = useRef(true)
  let contentRef = useRef()
  let backBtnRef = useRef()
  let miniGridRef = useRef()
  let miniGridImagesRef = useRef([])
  let bodyEl;
  const lenis = useLenis()
  
  const [currentIndex, setCurrentIndex] = useState(0)

  useLayoutEffect(() => {
    init()
  }, [])

  useEffect(() => {
    handleWinSize()

    if (typeof window !== `undefined`) { // or typeof document !== 'undefined'
      bodyEl = document?.querySelector('body')
    }

    wrapTextLinesReveal(contentRef.current)
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  const handleResize = () => {
    handleWinSize()

    if (!isGridView.current ) {
      handleImageTransform()
    }
  }

  const handleImageTransform = () => {
    const imageTransform = calcTransformImage(imagesRef.current[currentIndex]);
    gsap.set(imagesRef.current[currentIndex], {
        scale: imageTransform.scale,
        x: imageTransform.x,
        y: imageTransform.y
    });

  }

  const init = () => {
    gsap.set(
      [contentRef.current, miniGridRef.current, miniGridImagesRef.current],
      {
        autoAlpha: 0,
      }
    )
  }

  const handleWinSize = () => {
    winSize.current = calcWinsize()
  }

  const handleImageEnter = e => {
    if (!isGridView.current) {
      return false
    }

    let q = gsap.utils.selector(e.currentTarget)
    gsap
      .timeline({
        defaults: { duration: 1.2, ease: "expo" },
      })
      .to(
        q(".inner"),
        {
          scale: 1.4,
        },
        0
      )
      .to(
        q(".img"),
        {
          scale: 0.9,
        },
        0
      )
  }

  const handleImageLeave = e => {
    let q = gsap.utils.selector(e.target)
    console.log("handleImageLeave: ", e.target)
    if (!isGridView.current) {
      return false
    }

    gsap
      .timeline({
        defaults: { duration: 1.2, ease: "expo" },
      })
      .to(
        q(".inner"),
        {
          scale: 1,
        },
        0
      )
      .to(
        q(".img"),
        {
          scale: 1,
        },
        0
      )
  }

  const calcTransformImage = item => {
    const cellrect = adjustedBoundingRect(item)
    console.log("winSize: ", winSize)
    return {
      scale: (winSize.current.width * 0.54) / cellrect.width,
      x: winSize.current.width * 0.65 - (cellrect.left + cellrect.width / 2),
      y: winSize.current.height * 0.5 - (cellrect.top + cellrect.height / 2),
    }
  }

  const handleImageClick = (e, index) => {
    isAnimating.current = true
    isGridView.current = false

    currentRef.current = e.currentTarget
    let currentIndex = currentIndexRef.current = index
    lenis?.stop()

    setCurrentIndex(currentIndex)
    showContent(imagesRef.current[currentIndex])
  }

  const handleMiniGridClick = (e, index) => {
    isAnimating.current = true
    isGridView.current = false
    // currentIndexRef.current = index
    // currentRef.current = e.currentTarget
    setCurrentIndex(index)

    changeContent(index)
  }

  const changeContent = selectedIndex => {
    let currentIndex = currentIndexRef.current
    let q = element => gsap.utils.selector(element)
    let currentImage = imagesRef.current[currentIndex]
    let selectedImage = imagesRef.current[selectedIndex]
    currentIndexRef.current = selectedIndex

    const imageTransform = calcTransformImage(selectedImage)

    gsap.timeline({
      defaults: {
        duration: 1,
        ease: "expo.inOut",
      },
      onComplete: () => {
        isAnimating.current = false
      },
    }).addLabel(START, 0)
    .add(outTextLinesReveal(contentRef.current), START)
    .to(currentImage, {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 0.8,
      onComplete: () => gsap.set(currentImage, {
        zIndex: 1
      }, START)
    }, START).addLabel(SHOW_CONTENT, '>-=0.4')
    .set(selectedImage, {
      zIndex: 101
    }, START)
    .to(selectedImage, {
      scale: imageTransform.scale,
      x: imageTransform.x,
      y: imageTransform.y,
      opacity: 1,
    }, START)
  
    .add(() => inTextLinesReveal(contentRef.current), SHOW_CONTENT)
  }

  const showContent = current => {
    let currentIndex = currentIndexRef.current
    const imageTransform = calcTransformImage(imagesRef.current[currentIndex])
    let q = element => gsap.utils.selector(element)
    let otherImages = imagesRef.current.filter(i => i != current)

    tl.current = gsap.timeline({
      defaults: {
        duration: 1.2,
        ease: "expo.inOut",
      },
      onStart: () => { },
      onComplete: () => {
        isAnimating.current = false
      },
    })

    tl.current
      .addLabel(START, 0)
      .set(
        imagesRef.current[currentIndex],
        {
          zIndex: 100,
        },
        START
      )
      .set(document.querySelector('body'), {
        overflow: 'hidden'
      })

      .to(
        current,
        {
          scale: imageTransform.scale,
          x: imageTransform.x,
          y: imageTransform.y,
        },
        START
      )
      .to(
        q(current)(".inner"),
        {
          scale: 1,
        },
        START
      )
      .to(
        otherImages,
        {
          opacity: 0,
          scale: 0.8,
          stagger: {
            // grid: 'auto',
            amount: 0.18,
            // from: current
          },
        },
        START
      )
      .to(
        backBtnRef.current,
        {
          x: "-50%",
          opacity: 1,
        },
        START
      )
      .to(
        miniGridRef.current,
        {
          autoAlpha: 1,
        },
        START
      )
      .to(
        miniGridImagesRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          stagger: 0.025,
        },
        START
      )
      .addLabel(SHOW_CONTENT, START + "+=.45")
      .to(
        contentRef.current,
        {
          autoAlpha: 1,
          duration: 0.2,
        },
        SHOW_CONTENT
      )
      .add(() => {
        contentRef.current.classList.add("content--open")
        inTextLinesReveal(contentRef.current)
      }, SHOW_CONTENT)
    // .to()
  }

  const handleBackClick = () => {
    if (isAnimating.current) {
      return false
    }

    console.log('lenis: ' ,lenis)
    lenis?.start()
    isAnimating.current = true
    isGridView.current = true
    let currentIndex = currentIndexRef.current
    closeContent(imagesRef.current[currentIndex])
  }

  const closeContent = current => {
    let otherImages = imagesRef.current.filter(i => i != current)

    tl.current = gsap.timeline({
      defaults: {
        ease: "expo.inOut",
        duration: 1,
      },
      onComplete: () => {
        gsap.set(contentRef.current, {
          autoAlpha: 0,
        })

        gsap.set(current, {
          zIndex: 1
        })
      },
    })

    tl.current
      .addLabel(START, 0)
      .add(() => {
        outTextLinesReveal(contentRef.current)
      }, START)
      .set(document.querySelector('body'), {
        overflow: 'auto'
      }, START)
      .to(
        backBtnRef.current,
        {
          x: "50%",
          opacity: 0,
        },
        START
      )
      // .to(
      //   contentRef.current,
      //   {
      //     autoAlpha: 0,
      //   },
      //   START
      // )
      .add(() => {
        contentRef.current.classList.remove("content--open")
      }, START)
      .addLabel(SHOW_GRID, 0)
      .to(
        current,
        {
          scale: 1,
          x: 0,
          y: 0,
        },
        START
      )
      .to(
        otherImages,
        {
          opacity: 1,
          scale: 1,
          // stagger: 0.1,
        },
        START
      )
      .to(
        miniGridRef.current,
        {
          autoAlpha: 0,
        },
        START
      )
      .to(
        miniGridImagesRef.current,
        {
          autoAlpha: 0,
          scale: 0,
          stagger: 0.025,
        },
        START
      )
  }

  // let currentIndex = currentIndexRef.current
  let contentIndex = images[currentIndex].index
  let contentTitle = images[currentIndex]?.content?.title
  let contentDesc = images[currentIndex]?.content?.description

  return (
    <Container className="grid grid-cols-4  p-4 auto-rows-[32vmin]">
      {images.map((val, index) => (
        <GridImage
          key={val.imgUrl + index}
          ref={el => (imagesRef.current[index] = el)}
          onMouseEnter={handleImageEnter}
          onMouseLeave={handleImageLeave}
          onClick={e => handleImageClick(e, index)}
          row={val.row}
          col={val.col}
          imgUrl={val.imgUrl}
        />
      ))}

      <div className="content" ref={contentRef}>
        <div className="title anim">
          <span>{contentIndex}</span><span>{contentTitle}</span>
          </div>
        <div className="description anim">
          { contentDesc }
        </div>
        <button
          ref={backBtnRef}
          className="back font-bold w-fit p-4"
          onClick={handleBackClick}
        >
          <span>back</span>
        </button>
        <div className="invisible md:visible w-[220px] h-[190px]">
          <MiniGrid ref={miniGridRef}>
            {images.map((val, index) => (
              <MiniGridImage
                key={"mini-" + val.imgUrl + index}
                ref={el => (miniGridImagesRef.current[index] = el)}
                onClick={e => handleMiniGridClick(e, index)}
                row={val.row}
                col={val.col}
                imgUrl={val.imgUrl}
                borderItemRadius={0.25}
              />
            ))}
          </MiniGrid>
        </div>
      </div>
    </Container>
  )
}

export default Home
