import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"

import "../utils/normalize.css"
import "../utils/css/screen.css"


const AxisPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title="Axis Build Calculator">

      <article className="post-content page-template no-image">
        <div className="post-content-body">
   <p>Enter your funds below and select your build to see how many units you can buy. </p>
   <form id="frm1" method="post" action="#">
      <input className="axis-radio" type="radio" id="inf" name="unit" value="inf"/>
      <label for="inf">Infantry (Support heavy)</label>
      <input className="axis-radio" type="radio" id="ainf" name="unit" value="ainf"/>
      <label for="ainf">Infantry (Pure Assuault + medic)</label>
      <input className="axis-radio" type="radio" id="sinf" name="unit" value="sinf"/>
      <label for="sinf">Infantry (Pure Support + medic)</label>
      <input className="axis-radio" type="radio" id="tungsbrem" name="unit" value="tungsbrem"/>
      <label for="tungsbrem">Tungs/Brem (Tanks Anti-Air)</label>
      <input className="axis-radio" type="radio" id="suireb" name="unit" value="suireb"/>
      <label for="suireb">Suirebs</label>
      <input className="axis-radio" type="radio" id="vod" name="unit" value="vod"/>
      <label for="vod">Vodniks/MLR (Jeeps Anti-Infantry)</label>
      <input className="axis-radio" type="radio" id="blk" name="unit" value="blk"/>
      <label for="blk">Black Eagles/Brem</label>
      <input className="axis-radio" type="radio" id="t98" name="unit" value="t98"/>
      <label for="t98">Type 98/Brem</label>
      {/*<input className="axis-radio" onClick={check} type="checkbox" id="existing" name="unit" value="existing"/>*/}
      {/*<label for="existing" id="label1">I have existing units of this build type</label>*/}
      Funds: <input type="text" name="funds" id="funds"/>
   </form>
   <button className="button axis" onClick={myFunction}>Submit</button>
   {/* Break */}
   <p id="demo"></p>
   <p id="demo2"></p>
   {/* Break */}

   <p className="note"> *Please note this an early version so it may be a bit buggy. Let Natty_Boh know about any issues. Thanks to Jorn and Synth for build ratios.  </p>

</div>
      </article>
    </Layout>
  )
}

// let check = () => {
//   if (document.getElementById('existing').checked) {
//     if (document.getElementById('inf').checked && !document.getElementById("existing1")) {
//       var text = "Assault: <input type=\"text\" name=\"existing1\" id=\"existing1\"/> Support: <input type=\"text\" name=\"existing2\" name=\"existing2\" /> Medic: <input type=\"text\" name=\"existing3\" name=\"existing3\" />"
//       document.getElementById("existing").insertAdjacentHTML('beforebegin', text);
//    }
//      if (document.getElementById('tungsbrem').checked) {
//       console.log("wip")

//    }
//      if (document.getElementById('suireb').checked) {
//       console.log("wip")

//        }
//        if (document.getElementById('vod').checked) {
//         console.log("wip")

//        }
  
//     if (document.getElementById('blk').checked) {
//       console.log("wip")

//    }
//      if (document.getElementById('t98').checked) {
//       console.log("wip")

//    }
//      if (document.getElementById('ainf').checked) {
//       console.log("wip")

//        }
//      if (document.getElementById('sinf').checked) {
//       console.log("wip")

//        }
    
//   }
// }

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
    if (document.getElementById('tungsbrem').checked) {
       var text = tanks(x, i,  3500000, "tungs")
      
	}
    if (document.getElementById('suireb').checked) {
      var sui = 1 * 150000
      var reb = 4 * 35000
      var total = sui + reb;
      var number = (x.elements[i].value.replace(/,/g, "")) / total
      var text = Math.floor(number * 1) + " suicide bombers <br>" + Math.floor(number * 4) + " 	rebels <br>" 
      }
      if (document.getElementById('vod').checked) {
      var vod = 3 * 300000
      var mlr = 1 * 3000000
      var total = vod + mlr;
      var number = (x.elements[i].value.replace(/,/g, "")) / total
      var text = Math.floor(number * 3) + " vodnik <br>" + Math.floor(number * 1) + " 	MLR <br>" 
      }
 
	 if (document.getElementById('blk').checked) {
       var text = tanks(x, i,  8000000, "black eagles")
      
	}
    if (document.getElementById('t98').checked) {
       var text = tanks(x, i,  2150000, "type 98")
      
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
                                            <AxisPage location={props.location} data={data} {...props} />
                                          )}
                                        />
)
