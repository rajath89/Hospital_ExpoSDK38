
import React, { Component } from 'react';

import { Text, View, Button } from 'react-native';
import { quizData } from "./Questions/quizData";
// import console = require('console');

export default class QuesList extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {  }
    // }

    state = {
        currentQuestion: 0,
        myAnswer: null,
        options: [],
        score: 0,
        disabled: true,
        isEnd: false,
        op:null
      };


      loadQuizData = () => {
        // console.log(quizData[0].question)
        this.setState(() => {
          return {
            questions: quizData[this.state.currentQuestion].question,
            answer: quizData[this.state.currentQuestion].answer,
            options: quizData[this.state.currentQuestion].options
          };
        });
        
      };
    
      componentDidMount() {
        this.loadQuizData();
      }



      nextQuestionHandler = () => {
        // console.log('test')
        const { myAnswer, answer, score } = this.state;
    
        if (myAnswer === answer) {
          this.setState({
            score: score + 1
            //op:null
           // quizData[this.state.currentQuestion].id
          });
        }
    
        this.setState({
          currentQuestion: this.state.currentQuestion + 1,
          op:null
        });
        console.log(this.state.currentQuestion);
      };


      componentDidUpdate(prevProps, prevState) {
        if (this.state.currentQuestion !== prevState.currentQuestion) {
          this.setState(() => {
            return {
              disabled: true,
              questions: quizData[this.state.currentQuestion].question,
              options: quizData[this.state.currentQuestion].options,
              answer: quizData[this.state.currentQuestion].answer
            };
          });
        }
      }
      //check answer
      checkAnswer = answer => {
          console.log(answer);
        this.setState({ myAnswer: answer, disabled: false,op:answer });
      };
      finishHandler = () => {
        if (this.state.currentQuestion === quizData.length - 1) {
          this.setState({
            isEnd: true
          });
        }
      };
    render() { 
        const { options, myAnswer, currentQuestion, isEnd } = this.state;
        return (
                    <View>
          <Text>{this.state.questions} </Text>

          {options.map(option => (
            <Button title={option} key={this.state.questions.id} onPress={() => this.checkAnswer(option)}/>
              
            
             
          ))}

           {currentQuestion < quizData.length - 1 && (<Button title="next" onPress={this.nextQuestionHandler} disabled={this.state.disabled}/>)}
           <Text>option clicked : {this.state.op} </Text>
           <Text>Ques id :{quizData[this.state.currentQuestion].id}</Text>
        </View>
         )
            

           
}
 
}


// if(isEnd) {
//     return (
//      <Text>game over</Text>
//     );
//   }else {
//       return (
//         <View className="App">
//           <Text>{this.state.questions} </Text>

//           {options.map(option => (
//             <p
//               key={option.id}
//               className={`ui floating message options
//          ${myAnswer === option ? "selected" : null}
//          `}
//               onClick={() => this.checkAnswer(option)}
//             >
//               {option}
//             </p>
//           ))}
//           {currentQuestion < quizData.length - 1 && (
//             <button
//               className="ui inverted button"
//               disabled={this.state.disabled}
//               onClick={this.nextQuestionHandler}
//             >
//               Next
//             </button>
//           )}
//           {/* //adding a finish button */}
//           {currentQuestion === quizData.length - 1 && (
//             <button className="ui inverted button" onClick={this.finishHandler}>
//               Finish
//             </button>
//           )}
//         </View>
//       );

//     //}
 
// //     <Container>
  
// //     <Content>
// //       <Card>
// //         <CardItem>
// //           <Body>
// //             <Text>
// //                card Content
// //             </Text>
// //           </Body>
// //         </CardItem>
// //       </Card>
// //     </Content>
// //   </Container>
     
// //  );
// }