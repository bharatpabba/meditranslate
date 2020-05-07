// import the library
import excel from 'xlsx';
import axios from 'axios';
import {props__export} from '../App.js'
import data from './data.js'

const website_url = "http://localhost:8080"

export function getSupportedLanguages(){
  var rows = data
  var languages_supported = ["English"]
  for(var i = 1 ; i < rows.length ; i++){
      languages_supported.push(rows[i][2])
  }
  //converting to a set
  var mySet = new Set(languages_supported)
  var arr = Array.from(mySet)
  props__export.setState({supported_langs:[]})
  for( var i = 0 ; i < arr.length; i++){
    props__export.setState({supported_langs:props__export.state.supported_langs.push(arr[i])})
  }


}

export function getLanguageData(lang_a,lang_b){

    var lang_data = readLanguageData(lang_a,lang_b,data)



    setTimeout(
      function() {
        props__export.setState({a_languagedata:lang_data["a_languagedata"]})
        props__export.setState({a_language:lang_a})
        props__export.setState({b_languagedata:lang_data["b_languagedata"]})
        props__export.setState({b_language:lang_b})
        props__export.setState({categories:lang_data["categories"]})
      }
      .bind(this),
      100
    );


}


export function onChangeCategory(item){
  this.setState({category_selected:item})
}

export function onChangeSearch(e){
  this.setState({search_input:e.target.value})
}

function readLanguageData(language_a,language_b,rows){
  var language_from_rows = []
  var language_to_rows = []
  var language_a_rows = []
  var rows_sort = []

  var response_json = {"a_languagedata":[],"b_languagedata":[],"categories":[]}
  if(language_a == "English" && language_b == "English"){
    return response_json
  }else if(language_a == "English" && language_b != "English"){
    //get the translations for language b
    //seperate them for english as langauge a and language b
    var language_a_data = []
    var language_b_data = []


    for(var i = 0 ; i < rows.length ; i++){
          console.log('language_b',language_b)
          console.log('language_b',rows[i][2])
          if(rows[i][2] == language_b){

            language_a_data.push([rows[i][0],rows[i][3]])
            language_b_data.push([rows[i][1],rows[i][3]])
            rows_sort.push(rows[i])
          }
    }

    var categories = ["All"]
    for(var i = 0 ; i < rows_sort.length ; i++){
          categories.push(rows_sort[i][3])
    }
    response_json["a_languagedata"] = language_a_data
    response_json["b_languagedata"] = language_b_data
    response_json["categories"] = categories
    return response_json



  }else if(language_a != "English" && language_b =="English"){
    var language_a_data = []
    var language_b_data = []
    //get the translations for language a
    //seperate them for language a and english as langauge b

    for(var i = 0 ; i < rows.length ; i++){

          if(rows[i][2] == language_a){
            language_b_data.push([rows[i][0],rows[i][3]])
            language_a_data.push([rows[i][1],rows[i][3]])
            rows_sort.push(rows[i])
          }

    }
    var categories = ["All"]
    for(var i = 0 ; i < rows_sort.length ; i++){
          categories.push(rows_sort[i][3])
    }
    response_json["a_languagedata"] = language_a_data
    response_json["b_languagedata"] = language_b_data
    response_json["categories"] = categories
    return response_json



    // res.send(response_json)
  }else if(language_a != "English" && language_b != "English"){
    //get the translations for language a,b
    //seperate them for language a and language a and b
    var language_a_data = []
    var language_b_data = []
    var lang_dict= {}
    var categories = {}

        // Your CSV data is in an array of arrys passed to this callback as rows.
    for(var i = 0 ; i < rows.length ; i++){
          if(rows[i][2] == language_a){
            lang_dict[rows[i][0]] = {}
          }
          if(rows[i][2] == language_b){
            lang_dict[rows[i][0]] = {}
          }
    }
    for(var i = 0 ; i < rows.length ; i++){
          if(rows[i][2] == language_a){
            lang_dict[rows[i][0]][language_a] = [rows[i][1],rows[i][3]]
            categories[rows[i][3]] = ""
          }
          if(rows[i][2] == language_b){
            lang_dict[rows[i][0]][language_b] = [rows[i][1],rows[i][3]]
            categories[rows[i][3]] = ""
          }
    }
    console.log('Sepearted Translations',lang_dict)
    var final_categories = ["All"]
    console.log('Category JSON',categories)

    for(var i in categories){
        final_categories.push(i)
    }
    for(var i in lang_dict){
        if(lang_dict[i][language_a] != null && lang_dict[i][language_b]!= null ){
          language_a_data.push(lang_dict[i][language_a])
          language_b_data.push(lang_dict[i][language_b])
        }

   }

  response_json["a_languagedata"] = language_a_data
  response_json["b_languagedata"] = language_b_data
  response_json["categories"] = final_categories
  return response_json


  }else{
    return false
  }
}
