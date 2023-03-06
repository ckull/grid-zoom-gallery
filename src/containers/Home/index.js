import React, {
  useRef,
  useEffect,
  forwardRef,
  Children,
  useLayoutEffect,
} from "react"
import { Container, GridItem, MiniGridItem } from "./styled"
import gsap from "gsap"
import SplitType from "split-type"
import {
  wrapTextLinesReveal,
  inTextLinesReveal,
  outTextLinesReveal,
} from "../Effects/textLinesReveal"
import { adjustedBoundingRect, calcWinsize } from "../../utils"
const images = [
  {
    row: 1,
    col: 1,
    imgUrl: "https://tympanus.net/Development/GridZoom/1.04213a58.jpg",
    content: {
      title: 'Millions',
      description: 'This practice of creating circumstances and of creating pictures in the minds of millions of persons is very common.'
    }
  },
  {
    row: 1,
    col: 3,
    imgUrl:
      "https://images.unsplash.com/photo-1535579710123-3c0f261c474e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      content: {
        title: 'Millions',
        description: 'This practice of creating circumstances and of creating pictures in the minds of millions of persons is very common.'
      }
  },
  {
    row: 1,
    col: 4,
    imgUrl:
      "https://images.unsplash.com/photo-1586965529163-8c7d69503892?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
      content: {
        title: 'Millions',
        description: 'This practice of creating circumstances and of creating pictures in the minds of millions of persons is very common.'
      }
  },
  {
    row: 2,
    col: 1,
    imgUrl:
      "https://images.unsplash.com/photo-1607332897173-885f1b27e7a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
      content: {
        title: 'Millions',
        description: 'This practice of creating circumstances and of creating pictures in the minds of millions of persons is very common.'
      }
  },
  {
    row: 2,
    col: 3,
    imgUrl:
      "https://images.unsplash.com/photo-1627735696625-d8f4b3f19821?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      content: {
        title: 'Millions',
        description: 'This practice of creating circumstances and of creating pictures in the minds of millions of persons is very common.'
      }
  },
  {
    row: 3,
    col: 2,
    imgUrl:
      "https://images.unsplash.com/photo-1512324981942-bff898741db0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1076&q=80",
      content: {
        title: 'Millions',
        description: 'This practice of creating circumstances and of creating pictures in the minds of millions of persons is very common.'
      }
  },
  {
    row: 3,
    col: 4,
    imgUrl:
      "https://images.unsplash.com/photo-1462804993656-fac4ff489837?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      content: {
        title: 'Millions',
        description: 'This practice of creating circumstances and of creating pictures in the minds of millions of persons is very common.'
      }
  },
  {
    row: 4,
    col: 1,
    imgUrl:
      "https://images.unsplash.com/photo-1513925407702-735e1f07e988?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    content: {
      title: 'Millions',
      description: 'This practice of creating circumstances and of creating pictures in the minds of millions of persons is very common.'
    }
  },
  {
    row: 4,
    col: 3,
    imgUrl:
      "https://images.unsplash.com/photo-1608433112591-134fc0e5bd9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      content: {
        title: 'Millions',
        description: 'This practice of creating circumstances and of creating pictures in the minds of millions of persons is very common.'
      }
  },
  {
    row: 5,
    col: 2,
    imgUrl:
      "https://images.unsplash.com/photo-1529338030931-711fd750f02f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      content: {
        title: 'Millions',
        description: 'This practice of creating circumstances and of creating pictures in the minds of millions of persons is very common.'
      }
  },
]

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
  let bodyEl = document.querySelector('body')

  useLayoutEffect(() => {
    init()
  }, [])

  useEffect(() => {
    handleWinSize()

    wrapTextLinesReveal(contentRef.current)
    window.addEventListener("resize", handleWinSize)

    return () => {
      window.removeEventListener("resize", handleWinSize)
    }
  }, [])

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
    showContent(imagesRef.current[currentIndex])
  }

  const handleMiniGridClick = (e, index) => {
    isAnimating.current = true
    isGridView.current = false
    // currentIndexRef.current = index
    // currentRef.current = e.currentTarget

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
    .add(outTextLinesReveal, START)
    .to(currentImage, {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 0.8,
      onComplete: () => gsap.set(currentImage, {
        zIndex: 1
      })
    }).addLabel(SHOW_CONTENT, '>-=.4')
    .set(selectedImage, {
      zIndex: 100
    }, START)
    .to(selectedImage, {
      scale: imageTransform.scale,
      x: imageTransform.x,
      y: imageTransform.y,
      opacity: 1,
    }, START)
    .add(() => inTextLinesReveal, SHOW_CONTENT)
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
      .set(bodyEl, {
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
      .set(bodyEl, {
        overflow: 'auto'
      })
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

  let currentIndex = currentIndexRef.current
  let contentTitle = images[currentIndex]?.content?.title
  let contentDesc = images[currentIndex]?.content?.description

  return (
    <Container className="grid grid-cols-4  p-4 auto-rows-[32vmin]">
      {images.map((val, index) => (
        <GridImage
          key={val.imgUrl + index}
          ref={el => (imagesRef.current[index] = el)}
          onMouseOver={handleImageEnter}
          onMouseLeave={handleImageLeave}
          onClick={e => handleImageClick(e, index)}
          row={val.row}
          col={val.col}
          imgUrl={val.imgUrl}
        />
      ))}

      <div className="content" ref={contentRef}>
        <div className="title anim">{ contentTitle}</div>
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
        <div className="w-[220px] h-[190px]">
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
