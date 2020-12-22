import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"

import "../utils/normalize.css"
import "../utils/css/screen.css"


const AlliesPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title="Allies Build Calculator">

      <article className="post-content page-template no-image">
        <div className="post-content-body">
   <p>Enter your funds below and select your build to see how many units you can buy. </p>
   <form id="frm1" method="post" action="#">
      <input className="allies-radio" type="radio" id="inf" name="unit" value="inf"/>
      <label for="inf">Infantry (Support heavy)</label>
      <input className="allies-radio" type="radio" id="ainf" name="unit" value="ainf"/>
      <label for="ainf">Infantry (Pure Assuault + medic)</label>
      <input className="allies-radio" type="radio" id="sinf" name="unit" value="sinf"/>
      <label for="sinf">Infantry (Pure Support + medic)</label>
      Funds: <input type="text" name="funds"/>
   </form>
   <button className="button allies" onClick={myFunction}>Submit</button>
   {/* Break */}
   <p id="demo"></p>
   <p id="demo2"></p>
   {/* Break */}

   <p className="note"> *Please note this an early version so it may be a bit buggy. Let Natty_Boh know about any issues. </p>
   <p className="note"> **We need more allies builds! If you are a long time allies player, please let Natty_Boh know the best ratios for allied builds. </p>


</div>
      </article>
    </Layout>
  )
}

let myFunction = () => {
  var x = document.getElementById("frm1");
  var text = "";
  var i;
  for (i = 0; i < x.length ;i++) {
	if (document.getElementById('inf').checked) {
     var support = 13 * 125000
     var assault = 6 * 100000
     var medic = 1 * 250000
     var total = support + assault + medic;
     var number = (x.elements[i].value.replace(/,/g, "")) / total
     var text = Math.floor(number * 13) + " support <br>" + Math.floor(number * 6) + " 	assault <br>" + Math.floor(number * 1) + " medic <br>" 
	}
   
    if (document.getElementById('ainf').checked) {
      var assault = 19 * 100000
      var medic = 1 * 250000
      var total = assault + medic;
      var number = (x.elements[i].value.replace(/,/g, "")) / total
      var text = Math.floor(number * 19) + " assault <br>" + Math.floor(number * 1) + " medic <br>" 
      }
    if (document.getElementById('sinf').checked) {
      var support = 19 * 125000
      var medic = 1 * 250000
      var total = support + medic;
      var number = (x.elements[i].value.replace(/,/g, "")) / total
      var text = Math.floor(number * 19) + " support <br>" + Math.floor(number * 1) + " medic <br>" 
      }
   
  }

    document.getElementById("demo").innerHTML = text;
 }
  
  function tanks(x, i, unitcost, unitname) {
     var funds = x.elements[i].value.replace(/,/g, "")
     var tungcost = unitcost
     var bremcost = 5000000
     var total = tungcost * 19 + bremcost * 1;
     var number = funds / total
     
     var tungcount = Math.floor(number*19)
     var bremcount = Math.floor(number)
     var tungprice = tungcount * tungcost
     var bremprice = bremcount * bremcost
     var totalprice = bremprice + tungprice
     var leftover = funds- totalprice

     if (leftover >= tungcost) {
          return (tungcount-1) + " "+ unitname + " <br>" + (bremcount+1) + " 	brem <br>" 

     } else {
       return (tungcount-2) + " " + unitname + "<br>" + (bremcount+1) + " 	brem <br>"
     } 
  } 

const indexQuery = graphql`
  query {
                                          site {
                                          siteMetadata {
                                          title
                                        }
    }
    benchAccounting: file(
      relativePath: {eq: "bench-accounting-49909-unsplash.jpg" }
    ) {
                                          childImageSharp {
                                          fluid(maxWidth: 1360) {
                                          ...GatsbyImageSharpFluid
                                        }
      }
    }
  }
`

export default props => (
  <StaticQuery
                                          query={indexQuery}
                                          render={data => (
                                            <AlliesPage location={props.location} data={data} {...props} />
                                          )}
                                        />
)
