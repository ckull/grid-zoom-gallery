import React, { useEffect } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Home from "../containers/Home"
import LocomotiveScroll from "locomotive-scroll"

const IndexPage = () => {

  // useEffect(() => {
  //   const scroller = new LocomotiveScroll({
  //     el: document.querySelector('[data-scroll-container]'),
  //     smooth: true
  //   })
  // }, [])


  return (
    <Layout >
      <Home/>
    </Layout>
  )

}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
