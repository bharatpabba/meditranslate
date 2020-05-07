//react
import React from 'react';

//import css
import '../Roboto-Black.ttf'
import '../App.css';

class Footer extends React.Component{
  constructor(){
    super();
  }

  render(){
    return(
      <footer class="footer">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4" style={{textAlign:'center',marginLeft:"3vh",marginRight:"3vh",color:"gray",fontSize:"14px",}}>
              <span class="text-muted" style={{align:"center" }} >	&copy; 2023 by MediTranslate.  All information on this site is not a  replacement for a proper medical consultation. If you have  symptoms, please seek medical assistance.

             </span>
          </div>
          <div class="col-md-4"></div>
        </div>
        <br />
      </footer>
    )
  }

}

export default Footer
