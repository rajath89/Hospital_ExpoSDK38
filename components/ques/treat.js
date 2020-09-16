
import React, { Component } from 'react';

import { Text, View , StyleSheet,  TouchableOpacity,Alert} from 'react-native';
import { Button } from 'react-native-elements';
import { quizData } from "../Questions/quizData";
import {quizData_3} from "../Questions/quizData/quizData_3";
import {quizData2_3} from "../Questions/quizData2/quizData2_3";
import {quizData2} from "../Questions/quizData2";
import Modal from 'react-native-modalbox';

import Icon from 'react-native-vector-icons/FontAwesome';

// import console = require('console');

//import update from 'immutability-helper';

import { AsyncStorage } from 'react-native';
import { ToastAndroid } from 'react-native';
import { CheckBox } from 'react-native-elements';


export default class Treat extends Component {


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
        quizDecide:quizData_3,
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
              questions: quizData_3[this.state.currentQuestion].question,
              answer: quizData_3[this.state.currentQuestion].answer,
              options: quizData_3[this.state.currentQuestion].options,
              qid:quizData_3[this.state.currentQuestion].id,
              quizDecide:"quizData_3"
            };
          });
        }
        else if(this.state.kannada==true){

          this.setState(() => {
            return {
              questions: quizData2_3[this.state.currentQuestion].question,
              answer: quizData2_3[this.state.currentQuestion].answer,
              options: quizData2_3[this.state.currentQuestion].options,
              qid:quizData2_3[this.state.currentQuestion].id,
              quizDecide:"quizData2_3"
            };
          });
  

        }
        
      };
    
      componentDidMount() {
        this.loadQuizData();
        console.log(quizData_3.length);
        this._retrieveData();
        this._retrieveDataK();
      }


getStatus=(id)=>{
        var ids=[9,15];
        var ids2=[19,5,17,18,21,20];
        var flag=false;
        const mg = {18:"stop smoking",19:"Limit Alcohol", 20:"Add fruits,pulses and vegetables to your diet and Reduce meat intake",17:"To be compliant with medication",21:"Continue treatment,follow up at advised intervals "};
        const mg2 = {18:"ಧೂಮಪಾನ ನಿಲ್ಲಿಸಿ",19:"ಮಧ್ಯಪಾನ ನಿಲ್ಲಿಸಿ",17:"ಸೂಕ್ತ ಸಮಯಕ್ಕೆ ಔಷಧಿಯನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ", 20:"ಹಣ್ಣು ತರಕಾರಿ ಕಾಳುಗಳನ್ನು ಸೇವಿಸಿ, ಮಾಂಸ ತಿನ್ನುವುದನ್ನು ಕಡಿಮೆ ಮಾಡಿ",21:"ವೈದ್ಯರ ಚಿಕಿತ್ಸೆ ಸಲಹೆಯನ್ನು ಮುಂದುವರಿಸಿ"};
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
              console.log(varMg);
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
        if(df=="quizData_3"){
          console.log("#############quizDATA");
          var qd1=quizData_3[this.state.currentQuestion].answer;
          var qidN=quizData_3[this.state.currentQuestion].id;
          console.log("ufgg",qidN);

          
        }else if(df=="quizData2_3"){
          console.log("#############quizData2_3");
          var qd1=quizData2_3[this.state.currentQuestion].answer;
          var qidN=quizData2_3[this.state.currentQuestion].id;

        }
        console.log(qidN,myAnswer,qd1);
    
        if (myAnswer === qd1 && this.getStatus(qidN)) {
          console.log("visit hospital");

        }else if(qidN=="16"){
          console.log("hit qid16")
          var flag1=false;
          if(myAnswer==="None" || myAnswer==="ಯಾವು ಇಲ್ಲ"){
            console.log("proceed");
          }else{
            flag1=true;
          }


          if(flag1==true){
            this.setAbnormalID16();
            
            this.props.navigation.navigate('Message');
          }

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
          if(df=="quizData_3"){
            console.log("###from asyncStorage##########quizDATA");
            
            var qidA=quizData_3[this.state.currentQuestion].id;
  
            
          }else if(df=="quizData_3"){
            console.log("###from asyncStorage##########quizData2_3");
            
            var qidA=quizData2_3[this.state.currentQuestion].id;
  
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
            }

            if(this.state.currentQuestion==4&&an=="No"){
              this.setState({lastQues:true,isVisible2:true,msg:"ವೈದ್ಯರ ಚಿಕಿತ್ಸೆ ಸಲಹೆಯನ್ನು ಮುಂದುವರಿಸಿ"});
            }else if(this.state.currentQuestion==4&&an=="Yes"){
              this.setState({lastQues:true});
            }

            await AsyncStorage.setItem(this.state.qid, an);
            console.log("stored from vv kannada");
           

          }else{
            await AsyncStorage.setItem(this.state.questions, an);
            console.log("stored from vv english");
            console.log(this.state);
            if(this.state.currentQuestion==4&&an=="No"){
              this.setState({lastQues:true,isVisible2:true,msg:"Continue treatment,follow up at advised intervals"});
            }else if(this.state.currentQuestion==4&&an=="Yes"){
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
                questions: quizData2_3[this.state.currentQuestion].question,
                options: quizData2_3[this.state.currentQuestion].options,
                qid:quizData2_3[this.state.currentQuestion].id
              };
            });

          }else if(this.state.kannada==false){
            this.setState(() => {
              return {
                disabled: true,
                questions: quizData_3[this.state.currentQuestion].question,
                options: quizData_3[this.state.currentQuestion].options
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
              
              decide:null

            });
            this.props.navigation.navigate('Message');
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

  if(this.state.kannada==true){
    for(var i=0;i<quizData2.length;i++){
      myarray.push(quizData2[i].id);
    }
    console.log("my array from get quess#######",myarray)
  }

  else if(this.state.kannada==false){
    for(var i=0;i<quizData.length;i++){
      myarray.push(quizData[i].question);
    }
    console.log("my array from get quess#######",myarray)

  }


  return myarray;
}

getMultiple = async () => {

  let values;

  var kannObj=null;
  var engObj=null;
  try {
    arr=this.getQues();
    values = await AsyncStorage.multiGet(arr);
  } catch(e) {
    // read error
  }
  if(values) {
    console.log("values...",values);
  }
  if(values){



      if(this.state.kannada){
        var myarray2= new Array();

        var objectK = Object.fromEntries(values);
        console.log("object from entries",objectK);

        var objId={}
        for(var i=0;i<quizData.length;i++){
          //myarray2.push(quizData[i].question);
          objId[quizData[i].id]=quizData[i].question;
        }
        console.log("all the english questions$$$$$$$$$$$$$$$$$",objId);


       
        var obj2={};
        for (const [key, value] of Object.entries(objectK)) {

        var ky=null;
        ky=objId[key];
   
        obj2[ky]=value;
  
      }

console.log("final obkect#####################",obj2);

var quesA = new Array();

quesA.push(obj2);
//alert(JSON.stringify(myArray));
        //console.log("##########before sending",quesA[0]);
        console.log("#########quesA w/t [0]",quesA);

    //     var obj23={};
    //   for (const [key, value] of Object.entries(quesA[0])) {
    // var st = key.split(' ').join('_');
    // obj23[st]=value;
    //   }


      var obj23={};
      for (const [key, value] of Object.entries(quesA[0])) {
        if(key.includes(",") && !key.includes("(") ){
          console.log("hh",key);
          var d=key.replace(",","_");
          var t=d.split(' ').join('_');
          obj23[t]=value;
        }else if(key.includes("(") && key.includes(")") && key.includes(",")){
          var d2=key.replace("(","_");
          var d3=d2.replace(")","_");
          var d4=d3.replace(",","_");
          var t2=d4.split(' ').join('_');
          obj23[t2]=value;
          console.log(key);
        }else{
             var st = key.split(' ').join('_');
          obj23[st]=value;
        }
     
     
     }



      console.log("changed object..............",obj23);
      kannObj=obj23;

      }


      else{
        var object = Object.fromEntries(values);
        console.log("object from entries",object);
  
          var quesA = new Array();

          quesA.push(object);
          //alert(JSON.stringify(myArray));
                  //console.log("##########before sending",quesA[0]);
                  console.log("#########quesA w/t [0]",quesA);
          
              //     var obj2={};
              //   for (const [key, value] of Object.entries(quesA[0])) {
              // var st = key.split(' ').join('_');
              // obj2[st]=value;
              //   }


                var obj2={};
                for (const [key, value] of Object.entries(quesA[0])) {
                  if(key.includes(",") && !key.includes("(") ){
                    console.log("hh",key);
                    var d=key.replace(",","_");
                    var t=d.split(' ').join('_');
                    obj2[t]=value;
                  }else if(key.includes("(") && key.includes(")") && key.includes(",")){
                    var d2=key.replace("(","_");
                    var d3=d2.replace(")","_");
                    var d4=d3.replace(",","_");
                    var t2=d4.split(' ').join('_');
                    obj2[t2]=value;
                    console.log(key);
                  }else{
                       var st = key.split(' ').join('_');
                    obj2[st]=value;
                  }
               
               
               }
          
          
          
                console.log("changed object..............",obj2);
                engObj=obj2;
      }


      var ty=null;

      if(this.state.kannada){
        ty=kannObj;
      }

      else{
        ty=engObj;
      }

      console.log("ty********************",ty);



        //sending to backend
          (async () => {
  const rawResponse = await fetch('https://flask-app47.herokuapp.com/questions', {//exp://192.168.0.104:19000
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": this.state.globName, "questionDetails":ty})
  });
  const content = await rawResponse.json();

  if(content){
    console.log("before");
    console.log(content);
    console.log("after");
    
  }

})();


   }

  console.log("outside");
//console.log(content);
this.removeFew();
}


 Separator= () =>{
  return <View style={styles.separator} />;
}



finishTime=()=>{
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+','+time;

  (async () => {
  const rawResponse = await fetch('https://flask-app47.herokuapp.com/login', {//exp://192.168.0.104:19000
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": this.state.globName, "quesAttendDate": dateTime})
  });
  const content = await rawResponse.json();

  console.log(content);
})();
}



      finishHandler = () => {
        console.log("finished");
        console.log(this.state.currentQuestion,quizData_3.length,this.state.quizDecide.length)
        if (this.state.currentQuestion === quizData_3.length - 1) {
          this.getMultiple();
        //   this.setState({
        //     isEnd: true
        //   });
          //if(this.state.isEnd){
            this.finishTime();
          
          ToastAndroid.show('Questions are updated in db', ToastAndroid.SHORT);
          this.props.navigation.navigate('BP & Lab reports');
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
        
        if(String(str)=="quizData_3"){
          var df=quizData_3[this.state.currentQuestion].id;
        }else if(String(str)=="quizData2_3"){
          var df=quizData2_3[this.state.currentQuestion].id;
        }
        
        return (
                    <View style={styles.container}>
  {/* {df==17  &&   <CheckBox
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
this.setState({ isVisible2:!this.state.isVisible2})}>
<Text style={{color:'white',textAlign:'center',padding:10}}>OK</Text>
</TouchableOpacity>
        </Modal>

          <View style={[{ width: "40%", margin: 10, backgroundColor: "#f6f6f6" }]}>

           {currentQuestion < quizData_3.length - 1 && (<Button title="next" type="solid" raised="true" buttonStyle={styles.btstyle} onPress={this.nextQuestionHandler} disabled={this.state.disabled}/>)}
           </View>
           

           <View style={[{ width: "40%", margin: 10, backgroundColor: "#f6f6f6" }]}>
            {currentQuestion === quizData_3.length - 1  && this.state.lastQues && (
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
     
     
  },  modal3: {
    height: 250,
    width: 300
  },
});




