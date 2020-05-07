//react
import React from 'react';

//import css
import './Roboto-Black.ttf'
import './App.css';

//import components
import Header from './components/Header'
import Footer from './components/Footer'

//import methods from readSheet.js
import {getSupportedLanguages,getLanguageData_A,getLanguageData_B,getLanguageData,onChangeCategory,onChangeSearch} from './Methods/readSheet'

//export a global variable of App
export var props__export

class App extends React.Component{

  constructor(){
    super();
    //define react state

    //page_number
    //page_number : 1 means the default will be master list
    //page_number : 2 means faq page will be selected
    //page_number : 3 means download

    //supported_langs state stores all the languages which are shown in the dropdowns

    //search_input stores the user search made through the search widget

    //a_languagedata stores the translations retrieved from the server for the first dropdown

    //b_languagedata stores the translations retrievered from the server for the second dropdown

    //a_language is the language selected from the first dropdown. By default its selected to English

    //b_language is the language selected from the first dropdown. By default its selected to Bengali

    //category_selected is the currently selected category by default is selected to All
    this.state= {
      page_number:1,
      supported_langs : [],
      search_input:"",
      a_languagedata : [],
      b_languagedata : [],
      a_language:"English",
      b_language:"Bengali / বাংলা",
        category_selected:"All",
    }

    //intialise a state varaible for this class
    props__export = this;

    //intialise methods that may alter the react states

    //this method pulls out all the supported languages
    this.getSupportedLanguages = getSupportedLanguages.bind(this)
    //this method is trigged when a category is selected
    this.onChangeCategory = onChangeCategory.bind(this)
    //this method is triggred when a language from the dropdown is selected
    this.getLanguageData = getLanguageData.bind(this)
    //this is triggered when a search made through the input
    this.onChangeSearch = onChangeSearch.bind(this)
    //this is triggered when the menu in the master list, faq and download is clicked
    this.changeMenu = this.changeMenu.bind(this)

    //Initllay when the site is loaded call the below methods to intialise the supported languages and language data from the react server
    //retreive supported languages
    this.getSupportedLanguages()
    this.getLanguageData("English","Bengali / বাংলা")

  }


  //method that alters the state of the main menu
  changeMenu(pagenum){
    this.setState({page_number:pagenum})
  }


  render(){


    var this_ =this;

    //create html content for dropdowns using the array of all supported languages
    var options_language_a = this.state.supported_langs.map(function(item,idx){
      console.log(idx,item)
      return(
        <option value={item} >{item}</option>
      )
    })
    var options_language_b = this.state.supported_langs.map(function(item,idx){
      console.log(idx,item)
      return(
        <option value={item} >{item}</option>
      )
    })

    //retrieve categories
    var categories = this.state.categories
    let mySet = new Set(categories)
    let final_categories = Array.from(mySet)

    //prepare content for all the categories shown on the left menu
    var cat_option_html = final_categories.map(function(item,idx){
      var all_button = ""
      var highlight_color = this_.state.category_selected
      var bg_color= ""
      var color = ""
      if(item == highlight_color){
        bg_color = "#4B6261"
        color = "white"
      }else{
        bg_color = "lightgray"
        color = "#373737"
      }
      return(
        <span><button  type="button" class="btn " onClick={() => {this_.onChangeCategory(item)}} style={{fontWeight: 3,padding:"0.3vh",textAlign:"center",marginLeft:"-1.5vh",fontFamily:"Bebas Neue",background:bg_color,color:color,width:"126px",height:"53px",fontSize:"1.1em",borderTopLeftRadius:"0em",marginTop:"1vh",fontSize:"1.1em",borderBottomLeftRadius:"0em",borderTopRightRadius:"1em",borderBottomRightRadius:"1em",textAlign:'left'}}>&nbsp;{item}</button><br /></span>
      )
    })

    //prepare the content for the translations
    var cards_html;
    //check if the data retrieved from the server is not null
    if(this.state.b_languagedata.length != 0 && this.state.b_languagedata.length != 0 && this.state.a_languagedata.length == this.state.b_languagedata.length){
      //loop through the language data
      cards_html =this.state.a_languagedata.map(function(item,idx){
          //filter out the input based on the search
          if(this_.state.search_input == idx+1 || item[0].toLowerCase().indexOf(this_.state.search_input.toLowerCase()) > -1 || this_.state.b_languagedata[idx][0].toLowerCase().indexOf(this_.state.search_input.toLowerCase()) > -1 ){
              if(this_.state.category_selected == item[1] || this_.state.category_selected =="All"){
                console.log('b_language_data',this_.state.b_languagedata[idx])

                return(
                  <div class="card" style={{width:"228px",background:"white",marginTop:"1em",marginLeft:"1vh"}}>
                    <div class="card-body" style={{textAlign:"left"}}>
                      <p class="card-text" style={{color:"#8C8C8C",fontFamily:"Bebas Neue",height:"29px",fontStyle:"bold",fontSize:"18"}}><b>{idx+1}</b></p>
                      <p class="card-text" style={{color:"gray",fontSize:"14"}}>{item[0]}</p>
                      <p class="card-title" style={{fontSize:"1.3em",fontSize:"16"}}>{this_.state.b_languagedata[idx][0]}</p>
                    </div>
                  </div>
                )
              }
            }


          }
      )

    }else{

        cards_html = ""


    }

    //below code finds out if the search results are null
    //thereby displaying no results found
    var undefined_count = 0;
    if(this.state.search_input != ""){
      for(var i=0; i < cards_html.length ;i++){
        if(cards_html[i] == undefined){
            undefined_count++
        }

      }
    }
    if(undefined_count == cards_html.length && this.state.search_input !=""){
      cards_html =   <div class="card" style={{width:"228px",height:"100px",background:"white",marginTop:"1em",marginLeft:"1vh"}}>

          <div class="card-body" style={{textAlign:"left"}}>
            <span style={{fontSize:"1.3em",fontSize:"16"}}>No Results Found</span>

          </div>
        </div>
    }


    if(this.state.page_number == 1){ //show the translations
      var menu_content =<span>
                            <div class="row no-gutters" style={{width:"95%",margin:"2vh",}}>
                              <div class="col">
                                <input type="text" class="form-control border-secondary " style={{borderTopLeftRadius:"100px",borderBottomLeftRadius:"100px",borderRight:"0"}} type="search" placeholder="Search" id="example-search-input4"  onChange={(e) => this.onChangeSearch(e)} x-webkit-speech/>
                              </div>
                              <div class="col-auto" >
                                <button class="btn btn-outline-secondary " style={{borderTopRightRadius:"100px",borderBottomRightRadius:"100px",borderLeft:"0px"}} type="button">
                                  <i class="fa fa-search" style={{color:"lightgray"}}></i>
                                </button>
                              </div>
                             </div>
                            <table style={{width:"100%",overflowY:"auto",background:"white"}}  class="table table-striped header-fixed">
                                <tr>
                                  <td align="left">
                                  {cat_option_html}
                                  </td>
                                  <td>
                                    <div class="row" style={{height:"90vh",width:"95%",overflowY:"auto",background:"white"}} id="translation_cards">
                                      {cards_html}
                                    </div>

                                  </td>
                                </tr>
                             </table>
                            </span>
    }
    else if(this.state.page_number == 2){ //show faq content
      var menu_content =         <table style={{width:"100%",overflowY:"auto",background:"white",}}  class="table table-striped header-fixed">
                                    <tr>
                                      <br /><br /><br />
                                      <span style={{fontFamily:"Roboto Light",fontSize:"25px"}}>Coming Soon</span>
                                    </tr>
                                  </table>

    }else if(this.state.page_number == 3){//show the download content
      var menu_content =         <table style={{width:"100%",overflowY:"auto",background:"white"}}  class="table table-striped header-fixed">
                                    <tr>
                                      <br /><br /><br />
                                      <span style={{fontFamily:"Roboto Light",fontSize:"25px"}}>Coming Soon</span>
                                    </tr>
                                  </table>

    }



    return (

      <div className="App" style={{width:"100%"}}>
        <Header />
        <div style={{boxShadow:"0px 3px lightgray",  align:"center",textAlign:"center",color:"white",width:'100%'}} id="banner">
          <div class="row" >
            <div class="col-md-3" ></div>
            <div class="col-md-5" style={{color:"white",fontSize:"14",fontFamily:"Roboto",marginLeft:"3vh",marginRight:"3vh"}}><br />
              A Free Resource for Front-Line Health Workers and Patients to communicate with one another,  regardless of languages spoken <br /><br />
            </div>
            <div class="col-md-3" ></div>
          </div>
          <div class="row" >
            <div class="col-md-3" ></div>
            <div class="col-md-6" style={{color:"#1A1A1A",fontSize:"12",marginLeft:"3vh",marginRight:"3vh"}}>
              <select id="English" name="English" onChange={(e) => {this.getLanguageData(e.target.value,this.state.b_language)}} value= {this.state.a_language} style={{color:"black",background:"white",border:"2px solid black",width:"43%"}} class="dropdown_language_selection">
                &nbsp;&nbsp;{options_language_a}
              </select>
              <span style={{width:"5%",marginLeft:"1vh",marginRight:'1vh',color:'white'}}>TO</span>
              <select id="Bengali / বাংলা" name="Bengali / বাংলা" onChange={(e) => {this.getLanguageData(this.state.a_language,e.target.value)}} value= {this.state.b_language} style={{color:"black",background:"white",border:"2px solid black",width:"43%"}} class="dropdown_language_selection">
                &nbsp;&nbsp;{options_language_b}
              </select>
            </div>
            <div class="col-md-3" ></div>
        </div>
        <br />
        <div  class="row" style={{align:"center"}}>
            <button  type="button" class="btn" onClick = {() => this.changeMenu(1)} style={{borderRight:"3px solid #373533",padding:"1vh",background:this.state.page_number==1 ? "#4B6261" :'#5B6268' ,color:"white",width:"35%"}}>&nbsp;MASTER LIST</button>
            <button  type="button"  onClick = {() => this.changeMenu(2)} style={{borderRight:"3px solid #373533",padding:"1vh",cursor:"pointer",color:"white",width:"30%",background:this.state.page_number==2 ? "#4B6261" :"#5B6268"}}class="btn btn-secondary">FAQ</button>
            <button  type="button" onClick = {() => this.changeMenu(3)}  style={{border:0,padding:"1vh",cursor:"pointer",color:"white",width:"35%",background:this.state.page_number==3 ? "#4B6261" :"#5B6268"}} class="btn btn-secondary"  >DOWNLOAD</button>
        </div>
      </div>
      {menu_content}
      <br /><br />
      <Footer />

    </div>





    );
  }

}

export default App;
