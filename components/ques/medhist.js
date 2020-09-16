
import React, { Component } from 'react';

import { Text, View , StyleSheet,  TouchableOpacity,Alert} from 'react-native';
import { Button } from 'react-native-elements';
//import { quizData } from "./Questions/quizData";
import {quizData_2} from "../Questions/quizData/quizData_2";
import {quizData2_2} from "../Questions/quizData2/quizData2_2";
//import {quizData2} from "../Questions/quizData2";
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox';

// import console = require('console');

//import update from 'immutability-helper';

import { AsyncStorage } from 'react-native';
import { ToastAndroid } from 'react-native';
import { CheckBox } from 'react-native-elements';


export default class Medhist extends Component {


    state = {
        globName:'',
        qid:null,
        abnormalID:null,
        currentQuestion: 0,
        myAnswer: null,
        options: [],
        score: 0,
        disabled: true,
        isEnd: false,
        op:null,
        ans:[],
        decide:'',
        msg:"",
        kannada:false,
        quizDecide:quizData_2,
        alert:false,
        butId:null,
        isVisible2:false,
        lastQues:false
      };

      

async _retrieveData() {
        try {
          const value = await AsyncStorage.getItem('globalName');
          if (value !== null) {
            // We have data!!
            console.log(value);
            this.setState({
              globName:value
            });
            console.log("from state:",this.state.globName);
            if(this.state.globName){
              //this.getMultiple();
              console.log("globNmae");
              //this.getMultiple();
              console.log("after getmultiple");
            }
          }
        } catch (error) {
          // Error retrieving data
        }
      }


      async _retrieveDataK() {
        try {
          const value = await AsyncStorage.getItem('kannadaLang');
          if (value !== null && value=="TRUE") {
            // We have data!!
            console.log(value);
            this.setState({
              kannada:true
            });
            console.log("from state:",this.state.globName);

          }
        } catch (error) {
          // Error retrieving data
        }
      }







      loadQuizData = () => {
        // console.log(quizData[0].question)

        if(this.state.kannada==false){
          this.setState(() => {
            return {
              questions: quizData_2[this.state.currentQuestion].question,
              answer: quizData_2[this.state.currentQuestion].answer,
              options: quizData_2[this.state.currentQuestion].options,
              qid:quizData_2[this.state.currentQuestion].id,
              quizDecide:"quizData_2"
            };
          });
        }
        else if(this.state.kannada==true){

          this.setState(() => {
            return {
              questions: quizData2_2[this.state.currentQuestion].question,
              answer: quizData2_2[this.state.currentQuestion].answer,
              options: quizData2_2[this.state.currentQuestion].options,
              qid:quizData2_2[this.state.currentQuestion].id,
              quizDecide:"quizData2_2"
            };
          });
  

        }
        
      };
    
      componentDidMount() {
        this.loadQuizData();
        console.log(quizData_2.length);
        this._retrieveData();
        this._retrieveDataK();
      }


getStatus=(id)=>{
        var ids=[228,226];
        var ids2=[9,10,11,12,13,14,15];
        var flag=false;
        const mg = {9:"Visit Hospital",10:"Visit Hospital", 11:"Visit Hospital",12:"Visit Hospital",13:"Check medication compliance.If symptoms still persisting, visit hospital at the earliest",14:"Check medication compliance.If symptoms still persisting, visit hospital at the earliest",15:"Visit hospital at the earliest"};
        const mg2 = {9:"ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ",10:"ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ", 11:"ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ",12:"ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ",13:"ಸೂಕ್ತ ಸಮಯದಲ್ಲಿ ಔಷಧಿಯನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ, ಒಂದು ವೇಳೆ ಲಕ್ಷಣಗಳು ಇನ್ನೂ ಇದ್ದಲ್ಲಿ ತಕ್ಷಣ ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ",14:"ಸೂಕ್ತ ಸಮಯದಲ್ಲಿ ಔಷಧಿಯನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ, ಒಂದು ವೇಳೆ ಲಕ್ಷಣಗಳು ಇನ್ನೂ ಇದ್ದಲ್ಲಿ ತಕ್ಷಣ ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ",15:"ತಕ್ಷಣ ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ"};
        //console.log("from stst",mans);
        for(var i=0;i<ids.length;i++){
          if(ids[i]==id){
            //console.log(mans=="None")
             
              flag=true;
              this.setState({
                decide: "abnormal",
                abnormalID:id
  
              });
            }
        }

        for(var i=0;i<ids2.length;i++){
          if(ids2[i]==id){
            var varMg;

            if(this.state.kannada==true){
              varMg=mg2[id]
              console.log("varmg ###############3",varMg);
            }else if(this.state.kannada==false){
              varMg=mg[id]
              console.log(varMg);
            }


            
             
              flag=true;
              this.setState({
                decide: "normal",
                msg:varMg
  
              });
            }
        }
          
        
        return flag
        }

        




      nextQuestionHandler = () => {
        // console.log('test')
        const { myAnswer, answer, score,qid,quizDecide } = this.state;
        var st=quizDecide;
        console.log("nextq",quizDecide);
        var df=String(st);
        //this.changeState();
        if(df=="quizData_2"){
          console.log("#############quizDATA");
          var qd1=quizData_2[this.state.currentQuestion].answer;
          var qidN=quizData_2[this.state.currentQuestion].id;
          console.log("ufgg",qidN);

          
        }else if(df=="quizData2_2"){
          console.log("#############quizData2_2");
          var qd1=quizData2_2[this.state.currentQuestion].answer;
          var qidN=quizData2_2[this.state.currentQuestion].id;

        }
        console.log(qidN,myAnswer,qd1);
    
        if (myAnswer === qd1 && this.getStatus(qidN)) {
          console.log("visit hospital");

        }else if(qidN=="16"){
          console.log("hit qid16")
          var flag1=false;
          if(myAnswer==="None" || myAnswer==="ಯಾವು ಇಲ್ಲ"){
            this.setState({lastQues:true});
            console.log("proceed");
          }else{
            flag1=true;
            this.setState({alert:true,msg:"last ques",isVisible2:true})
          }


          // if(flag1==true){
          //   //this.setAbnormalID16();
            
          //   //this.props.navigation.navigate('Message');
          //   // Alert.alert(
          //   //     "Visit hospital at the earliest"
          //   //  );
          //   this.se
          // }

        }
    
        this.setState({
          currentQuestion: this.state.currentQuestion + 1,
          butId:null
          //,
          //op:null
        });
        //console.log(this.state.currentQuestion);
      };

        _storeData = async () => {
        try {

          var st=this.state.quizDecide;
          var df=String(st);
          if(df=="quizData_2"){
            console.log("###from asyncStorage##########quizDATA");
            
            var qidA=quizData_2[this.state.currentQuestion].id;
  
            
          }else if(df=="quizData_2"){
            console.log("###from asyncStorage##########quizData2_2");
            
            var qidA=quizData2_2[this.state.currentQuestion].id;
  
          }
          await AsyncStorage.setItem(qidA, this.state.op);
          console.log("stored");
          
        } catch (error) {
          // Error saving data
        }
      };

      vv = async (an) =>{
        //console.log(typeof JSON.stringify(this.state.op));
        var g=JSON.stringify(this.state.op);
        try {


          if(this.state.kannada){
            console.log("ID####################",this.state.qid,an);
            if(an=="ಹೌದು"){
              an="Yes";
            }else if(an=="ಇಲ್ಲ"){
              an="No";
            }else if(an=="ಯಾವು ಇಲ್ಲ"){
              an="None";
            }else if(an=="ಮಲದಲ್ಲಿ ರಕ್ತ ಹೋಗುವುದು"){
              an="Black tarry stools";
            }else if(an=="ದೇಹದ ಇತರೆಡೆ ರಕ್ತಸ್ರಾವ"){
              an="Bleeding from any other site";
            }else if(an=="ಸ್ನಾಯು ನೋವು"){
              an="Muscle pain";
            }else if(an=="ತೊಡೆಯ ಸಂದಿಯ ಭಾಗದಲ್ಲಿ ಊತ"){
              an="Swelling at site of procedure";
            }

            if(this.state.currentQuestion==7&&an!=="None"){
              this.setState({lastQues:true,isVisible2:true,msg:"ತಕ್ಷಣ ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ"});
            }else if(this.state.currentQuestion==7&&an=="None"){
              this.setState({lastQues:true});
            }

            await AsyncStorage.setItem(this.state.qid, an);
            console.log("stored from vv kannada");
           

          }else{
            await AsyncStorage.setItem(this.state.questions, an);
            console.log("stored from vv english");
            console.log(this.state);
            if(this.state.currentQuestion==7&&an!=="None"){
              this.setState({lastQues:true,isVisible2:true,msg:"Visit hospital at the earliest"});
            }else if(this.state.currentQuestion==7&&an=="None"){
              this.setState({lastQues:true});
            }
          }
          
        } catch (error) {
          // Error saving data
          console.log("err");
        }
      }


      setAbnormalID = async (value) => {

        console.log(this.state.kannada);


        const firstPair = ["ID", this.state.abnormalID]
        const secondPair = ["lang", String(this.state.kannada)]
        try {
          await AsyncStorage.multiSet([firstPair, secondPair])
        }
         catch(e) {
          // save error
        }
      
        console.log('abnormal id set Done.')
      }


      setAbnormalID16 = async (value) => {
        try {
          await AsyncStorage.setItem('ID',"16" );
          await AsyncStorage.setItem('lang',this.state.kannada );
        } catch(e) {
          // save error
        }
      
        console.log('abnormal id set Done.')
      }


      componentDidUpdate(prevProps, prevState) {
        const {quizDecide}=this.state;
        
        if (this.state.currentQuestion !== prevState.currentQuestion) {
          console.log(quizDecide);
          console.log("length$$$$$",this.state.quizDecide.length)
          if(this.state.kannada==true){
            this.setState(() => {
              return {
                disabled: true,
                questions: quizData2_2[this.state.currentQuestion].question,
                options: quizData2_2[this.state.currentQuestion].options,
                qid:quizData2_2[this.state.currentQuestion].id
              };
            });

          }else if(this.state.kannada==false){
            this.setState(() => {
              return {
                disabled: true,
                questions: quizData_2[this.state.currentQuestion].question,
                options: quizData_2[this.state.currentQuestion].options
              };
            });
          }

        }

                if (prevState.decide !== this.state.decide ) {
          console.log('decide state has changed.',this.state.decide);
          if(this.state.decide=="abnormal"){
            console.log("log hit from compondidup after decide abnormal");
            // this.setState({
            //   modBool: false

            // });
            this.setAbnormalID();
            console.log("abnormal id:",this.state.abnormalID);
            this.setState({
              
              decide:null,
              isVisible2:true

            });
            //this.props.navigation.navigate('Message');
          }
          else if(this.state.decide=="normal"){
            console.log("non fatal");
            // ToastAndroid.showWithGravity(
            //   'All Your Base Are Belong To Us',
            //   ToastAndroid.SHORT,
            //   ToastAndroid.CENTER
            // );
            var fg;
            fg=this.state.msg;
          //   Alert.alert(
          //     fg
          //  );
            this.setState({
              modBool: true,
              decide:null,
              isVisible2:true

            });
          }
          
        }
        if (prevState.questions !== this.state.questions) {
          console.log('ques state has changed.',this.state.questions);
          console.log(this.state);
          
        }

        if (prevState.kannada !== this.state.kannada) {
          console.log('kannada state has changed.');
          this.loadQuizData();
          
        }
        if (prevState.alert !== this.state.alert) {
            console.log('alert state has changed.');
            Alert.alert(
                "Visit hospital at the earliest"
             );
            
          }

      }
      //check answer
      checkAnswer = answer => {
        var arr=[]
        var arr2=[]

        arr.push(answer);
        arr=[...this.state.ans]
        var t=[];
        var state1 = [];
        
         var ques1=this.state.questions;
         var ans=this.state.myAnswer;
         var ans2=answer;
         var mystate={
          ques1,
          ans,
          ans2
        };
        const clone = JSON.parse(JSON.stringify(mystate));
        state1.push(clone);
        //console.log(state1);
        if(answer){
         
          this.setState({butId:answer});

        }



        //console.log("not state",arr2);
        this.setState({ myAnswer: answer, disabled: false,op:answer, ans:[mystate,...this.state.ans]});
        //console.log("after",this.state.ans);
      };


removeFew = async () => {
  console.log('cleared all ques keys before');
  const keys = ['@MyApp_USER_1', '@MyApp_USER_2']
  try {

    arr1=this.getQues();
    await AsyncStorage.multiRemove(arr1);
    
  } catch(e) {
    // remove error
  }

  console.log('cleared all ques keys after');

}


// get all keys
getAllKeys = async () => {
  let keys = [];
  console.log("get keys");
  try {
    keys = await AsyncStorage.getAllKeys();
    console.log(keys);
  } catch(e) {
    // read key error
  }

}

getQues = () => {
  var myarray= new Array();
  for(var i=0;i<quizData_2.length;i++){
    myarray.push(quizData_2[i].question);
  }

  

  return myarray;
}

getMultiple = async () => {

  let values
  try {
    arr=this.getQues();
    values = await AsyncStorage.multiGet(arr);
  } catch(e) {
    // read error
  }
  console.log(values);

}


 Separator= () =>{
  return <View style={styles.separator} />;
}



      finishHandler = () => {
        console.log("finished");
        console.log(this.state.currentQuestion,quizData_2.length,this.state.quizDecide.length)
        if (this.state.currentQuestion === quizData_2.length - 1) {
          //this.getMultiple();
          this.setState({
            isEnd: true
          });
          //if(this.state.isEnd){
          
          ToastAndroid.show('Questions are updated in db', ToastAndroid.SHORT);
          this.props.navigation.navigate('Jayadeva Hrudaya Spandana');
        //}
        }
        //this.getAllKeys();
        //console.log(this.getQues());

//#################uncomment getmultiple####
        //this.getMultiple();

};

changeState=()=>{
  this.setState({kannada: !this.state.kannada,state:this.state});
  console.log(this.state.kannada);
}
    

    render() { 
        const { options, myAnswer, currentQuestion, isEnd ,quizDecide} = this.state;

        var str=quizDecide;
        
        if(String(str)=="quizData_2"){
          var df=quizData_2[this.state.currentQuestion].id;
        }else if(String(str)=="quizData2_2"){
          var df=quizData2_2[this.state.currentQuestion].id;
        }
        
        return (
                    <View style={styles.container}>
  {/* {df==9  &&   <CheckBox
  title="change language"
  checked={false}
  onPress={() => this.setState({kannada: !this.state.kannada})}
/>} */}


          <Text style={styles.header}>{this.state.questions} </Text>

          <View style={[{ width: "90%", margin: 10, backgroundColor: "#f6f6f6" }]}>

          {options.map(option => ( 
                     //,this.vv(option)
                     <React.Fragment>
            <Button title={option} type={option==this.state.butId?"solid":"outline"} raised="true" buttonStyle={styles.btstyle} key={this.state.questions.id} onPress={() => {this.checkAnswer(option),this.vv(option)}}/>
            <View style={styles.separator}/>
            </React.Fragment>
          ))}
        </View>

        <Modal style={[styles.modal, styles.modal3]} position={"center"}  isOpen={this.state.isVisible2} ref={"modal3"} backdropPressToClose={false}>
    <Text style={styles.header2}>{this.state.msg}</Text>


    <View style={styles.hairline} />
    <View style={styles.hairline} />
    <View style={styles.hairline} />
    <View style={styles.hairline} />
          <TouchableOpacity style={{backgroundColor:'#65a2db',width:'30%'}} onPress={() => 
this.setState({ isVisible2:!this.state.isVisible2,lastQues:true})}>
<Text style={{color:'white',textAlign:'center',padding:10}}>OK</Text>
</TouchableOpacity>
        </Modal>

          <View style={[{ width: "40%", margin: 10, backgroundColor: "#f6f6f6" }]}>

           {currentQuestion < quizData_2.length - 1 && (<Button title="next" type="solid" raised="true" buttonStyle={styles.btstyle} onPress={this.nextQuestionHandler} disabled={this.state.disabled}/>)}
           </View>
           

           <View style={[{ width: "40%", margin: 10, backgroundColor: "#f6f6f6" }]}>
            {currentQuestion === quizData_2.length - 1 && this.state.lastQues&&(
            <Button title="Finish" type="solid" raised="true" buttonStyle={styles.btstyle} className="ui inverted button" onPress={this.finishHandler}/>
              
            
          )}

          </View>


          {/* <Text>option clicked : {this.state.op} </Text>
           <Text>Ques id :{df}</Text> */}
           
        </View>
         )
            

           
}
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  header:{
    fontSize:25,
    fontWeight:"bold",
    color:"#364f6b",
    marginBottom:40,
    marginLeft:20,
    marginRight:20
  },  header2:{
    fontSize:17,
    fontWeight:"bold",
    color:"#097fed",
    marginBottom:40,
    marginLeft:20,
    marginRight:20
  },  modal3: {
    height: 250,
    width: 300
  },
  item:{
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:20,
    padding:10,
    marginBottom:10,
    flexDirection:"row",
  },
  checkBoxTxt:{
    marginLeft:20
  },
  button: {
    padding: 20,
    fontSize: 15,
    fontFamily: "arial",
    width: 400,
    height: 40,
    textAlign: "center"
  },
  btstyle:{
  
    // borderRadius:15,
    // borderWidth: 1,
    // borderColor: '#3740FE',
    // elevation:10,
    
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.5,
    // shadowRadius: 10
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modal: {
     

   justifyContent: 'center',
   alignItems: 'center'
     
     
  }, 
});




