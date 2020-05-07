//react
import React from 'react';

//import css
import '../Roboto-Black.ttf'
import '../App.css';

class Header extends React.Component{
  constructor(){
    super();
  }

  render(){
    return(
      <nav class="navbar navbar-expand-lg " style={{background:"#C1DBBC",color:"black",width:"100%"}} >
        <a class="navbar-brand" href="#"><span style={{fontFamily:"Bebas Neue",color:"black",fontSize:"1.3em",fontStyle:"regular"}}>MediTranslate</span> </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
          <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link disabled" href="#">  <span style={{fontFamily:"Roboto",color:"black"}}>COVID-19 Phrasebook  </span></a>
            </li>
           </ul>
           <form class="form-inline">
            <a class="nav-link " style={{textAlign:'center',width:'100%'}} href="#">
              <a class="nav-link" href="mailto:hello@meditranslate.co">    <a  data-toggle="tooltip" data-html="true"  ><span style={{fontFamily:"Roboto",color:"black"}}>Contact Us </span></a>
              </a>
            </a>
          </form>
        </div>
      </nav>
    )
  }

}

export default Header
