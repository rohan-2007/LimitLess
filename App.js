import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Dimensions, ScrollView } from 'react-native';
import questions from './questions.json';
// import database from '@react-native-firebase/database';
// import { ref, set } from 'firebase/database';
import { db } from "./firebase"
import { ref, push } from "firebase/database"
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

// const question1 = questions[0].question;
// console.log(question1);

// let q1 = questions[0].question;
// console.log(q1);
randomize = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randNum = randomize(0, 115);

// const jsonData = require('./hackthon-uc/limitless/assets/questions.json');

export default class App extends Component {
  state = {
    questionNumber: randNum,
    username: '',
    password: '',
    feedbackRender: "",
    pointsTracker: 0,
    
    loginPage: 'block', 
    masterPage: 'none',
    signupPage: 'none',
    dashboardPage: 'none',
    questionPage: 'none',
    settingsPage: 'none',
    
    usernameReal: "",

    data: null,
    loading: true, 
    error: null,
  }

  sampleFn = () => {
    return "hello"
  }

  selectAnswer = (answer) => {
    const correctSoln = questions[this.state.questionNumber].soln; 
    console.log(correctSoln, "correctSoln"); // string
    console.log(answer.choice3, "answer") // {choice1: string}
    
    // DON'T TOUCH
    let tOrF = false;

    if (answer.choice1 === correctSoln) {
      tOrF = true;
    }
    if (answer.choice2 === correctSoln) {
      tOrF = true;
    }
    if (answer.choice3 === correctSoln) {
      tOrF = true;
    }
    if (answer.choice4 === correctSoln) {
      tOrF = true;
    }

    if (tOrF) {
        this.setState({ 
            pointsTracker: this.state.pointsTracker + 1,
            
        })
    } else {
        this.setState({
            
        })
    }
}

  loginLogic = (username) => {
    if (username == "") {
      this.setState({ 
        errorMsg: "Error",
      })
    }
  }

  _handleUsernameTextChange = username => {
    this.setState({ username });
  };

  _handlePasswordTextChange = password => {
    this.setState({ password });
  };

  _handleFirstNameTextChange = firstname => {
    this.setState({ firstname });
  };

  _handleLastNameTextChange = lastname => {
    this.setState({ lastname });
  };

  _handlePhoneNumberTextChange = phonenumber => {
    this.setState({ phonenumber });
  };

  _handleUsernameRealTextChange = usernameReal => {
    this.setState({ usernameReal });
  };

  handleSignupPage = () => this.setState(state => ({
    logInPage: 'none', 
    signupPage: 'block',
    masterPage: 'none',
    dashboardPage: 'none',
    questionPage: 'none',
  }));

  handleDashboardPage = () => this.setState(state => ({
    logInPage: 'none', 
    signupPage: 'none',
    masterPage: 'none',
    dashboardPage: 'block',
    questionPage: 'none',
  }));

  handleQuestionPage = () => this.setState(state => ({
    logInPage: 'none', 
    signupPage: 'none',
    masterPage: 'block',
    dashboardPage: 'none',
    questionPage: 'block',
  }));

  handleLoginPage = () => this.setState(state => ({
    logInPage: 'block', 
    signupPage: 'none',
    masterPage: 'none',
    dashboardPage: 'none',
    questionPage: 'none',
  }));

  handleProfilePage = () => this.setState(state => ({
    logInPage: 'none', 
    signupPage: 'none',
    masterPage: 'block',
    dashboardPage: 'block',
    questionPage: 'none',
  }));

  render() {
        const 
        question1 = questions[this.state.questionNumber].question;
        const choice1 = questions[this.state.questionNumber].choice1;
        const choice2 = questions[this.state.questionNumber].choice2;
        const choice3 = questions[this.state.questionNumber].choice3;
        const choice4 = questions[this.state.questionNumber].choice4;
        const addUserToDatabase = async (userData) => {
          // const userId = userData.username;

          // const userRef = ref(database, `users/${userId}`);
          // await set(userRef, userData);
          await push(ref(db, "/users"), {
            email_id: this.state.username,
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            password: this.state.password,
            phonenumber: this.state.phonenumber,
          })
        };

        // const userData = {
        //   email_id: this.state.username,
        //   first_name: this.state.firstname,
        //   last_name: this.state.lastname,
        //   password: this.state.password,
        //   phonenumber: this.state.phonenumber,
        //   username: this.state.usernameReal,
        // };
        // addUserToDatabase(userData);
      
      
         
        return (
          <View style={styles.container}>

            {/* Log in page content */}
            <View style={{ display: this.state.logInPage }}>
              <View style={styles.logInStyle}>
                <Text style={styles.title}>
                  LimitLess
                </Text>
                <Text style={styles.logInTitle}>
                  Log In
                </Text>
                <TextInput
                  value={this.state.username}
                  onChangeText={this._handleUsernameTextChange}
                  style={styles.textInput}
                  placeholder={"Enter Email"}
                />
                <TextInput
                  value={this.state.password}
                  onChangeText={this._handlePasswordTextChange}
                  style={styles.textInput}
                  placeholder={"Enter Password"}
                />
                <TouchableHighlight style={styles.logInButton}
                  onPress={this.handleQuestionPage}
                >
                  <Text style={styles.logInText}>
                    Log In
                  </Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.logInButton}
                  onPress={this.handleSignupPage}
                >
                  <Text style={styles.logInText}>
                    Sign Up
                  </Text>
                </TouchableHighlight>
                
              </View>
            </View>

            {/* Sign up page content */}
            <View style={{ display: this.state.signupPage }}>
              <View style={styles.logInStyle}>
                  <Text style={styles.title}>
                    Limitless
                  </Text>
                  <Text style={styles.logInTitle}>
                    Sign Up
                  </Text>
                  <TextInput
                    value={this.state.username}
                    keyboardType="email-address"
                    onChangeText={this._handleUsernameTextChange}
                    style={styles.textInput}
                    placeholder={"Enter Email"}
                  />
                  <TextInput
                    value={this.state.password}
                    onChangeText={this._handlePasswordTextChange}
                    style={styles.textInput}
                    placeholder={"Enter Password"}
                    secureTextEntry='true'
                  />
                  <TextInput
                    value={this.state.firstname}
                    onChangeText={this._handleFirstNameTextChange}
                    style={styles.textInput}
                    placeholder={"Enter First Name"}
                  />
                  <TextInput
                    value={this.state.lastname}
                    onChangeText={this._handleLastNameTextChange}
                    style={styles.textInput}
                    placeholder={"Enter Last Name"}
                  />
                  <TextInput
                    value={this.state.phonenumber}
                    keyboardType='numeric'
                    onChangeText={this._handlePhoneNumberTextChange}
                    style={styles.textInput}
                    placeholder={"Enter Phone Number"}
                  />
                  
                  <TouchableHighlight style={styles.logInButton}
                      onPress={() => {
                        addUserToDatabase();
                        this.handleLoginPage();
                      }}
                  >
                    <Text style={styles.logInText}>
                      Sign Up
                    </Text>
                  </TouchableHighlight>
                </View>
            </View>

            {/* App page content */}
            <View style={{ display: this.state.masterPage }}>
              <ScrollView style={{ display: this.state.dashboardPage }}>
                <View style={styles.article}>
                  <Text style={styles.heading}>Introduction to Calculus</Text>
                  <Text style={styles.paragraph}>
                    Calculus is the mathematical study of continuous change. It has two main branches: differential calculus and integral calculus.
                  </Text>
                  <Text style={styles.subheading}>Differential Calculus</Text>
                  <Text style={styles.paragraph}>
                    Differential calculus is concerned with the study of the rates at which quantities change. It involves concepts such as derivatives and rates of change.
                  </Text>
                  <Text style={styles.subheading}>Integral Calculus</Text>
                  <Text style={styles.paragraph}>
                    Integral calculus, on the other hand, deals with the accumulation of quantities and the computation of areas and volumes. It involves concepts such as integrals and areas under curves.
                  </Text>
              
                </View>
              </ScrollView>
              
              <View style={{ display: this.state.questionPage }}>
                <View style={styles.container}>
                    <Text style={styles.bigTextQuestion}>
                      {question1}
                    </Text>

                    <View style={styles.answerContainer}>
                      <TouchableHighlight
                          onPress={() => {
                            this.selectAnswer({choice1})
                            randNum = randomize(0, 115); 
                            this.setState({ 
                            questionNumber: randNum, 
                            feedbackRender: "", 
                        });
                            }
                          }
                      >
                          <View style={styles.answerButton}>
                            <Text style={styles.text}>
                              {choice1}
                            </Text>     
                          </View>
                      </TouchableHighlight>
                      <TouchableHighlight
                          onPress={() => {
                            this.selectAnswer({choice2})
                            randNum = randomize(0, 115); 
                            this.setState({ 
                            questionNumber: randNum, 
                            feedbackRender: "", 
                        });
                            }
                          }
                      >
                          <View style={styles.answerButton}>
                              <Text style={styles.text}>
                                {choice2}
                              </Text>
                          </View>
                      </TouchableHighlight>
                    </View>
                    <View style={styles.answerContainer}>
                    <TouchableHighlight
                          onPress={() => {
                            this.selectAnswer({choice3})
                            randNum = randomize(0, 115); 
                            this.setState({ 
                            questionNumber: randNum, 
                            feedbackRender: "", 
                        });
                            }
                          }
                      >
                          <View style={styles.answerButton}>
                            <Text style={styles.text}>
                              {choice3}
                            </Text>     
                          </View>
                      </TouchableHighlight>
                      <TouchableHighlight
                          onPress={() => {
                            this.selectAnswer({choice4})
                            randNum = randomize(0, 115); 
                            this.setState({ 
                            questionNumber: randNum, 
                            feedbackRender: "", 
                        });
                            }
                          }
                      >
                          <View style={styles.answerButton}>
                              <Text style={styles.text}>
                                {choice4}
                              </Text>
                          </View>
                      </TouchableHighlight>
                    </View>
                    <Text style={styles.bigText}>
                        {this.state.feedbackRender}
                    </Text>
                    <Text style={styles.bigText}>
                        Points: {this.state.pointsTracker}
                    </Text>
                    
                    
                </View>
              </View>

              <View style={styles.navbarContainer}>
                  <TouchableHighlight style={styles.navButton}
                      onPress={this.handleProfilePage}
                    >
                      <Text style={styles.text}>
                          Profile
                      </Text>
                  </TouchableHighlight>
                  
                  <TouchableHighlight style={styles.navButton}
                      onPress={this.handleQuestionPage}
                  >
                      <Text style={styles.text}>
                          Questions
                      </Text>
                  </TouchableHighlight>
                  
                  <TouchableHighlight style={styles.navButton}
                      onPress={this.handleLoginPage}
                  >
                      <Text style={styles.text}>
                          Log Out
                      </Text>
                  </TouchableHighlight>
              </View>
            </View>
            
            
          </View>
          
      );}
    }
  
const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B10F2E',
  },
  logInStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    // paddingTop: deviceHeight/8,
    fontFamily: "arial",
    color: "#FDFFFF",
    fontSize: deviceHeight / 10,
    fontWeight: "bold",
  },
  textInput: {
    height: deviceHeight / 15,
    width: deviceHeight / 2.5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#FDFFFF",
    color: '#FDFFFF',
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 20,
    padding: 10,
    fontWeight: "bold",
  },
  centerView: {
    justifyContent: "center",
    alignItems: "center",
  },
  logInTitle: {
    paddingBottom: deviceHeight / 20,
    fontFamily: "arial",
    color: "#FDFFFF",
    fontSize: deviceHeight / 15,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: "bold",
  },
  logInText: {
    color: '#FDFFFF',
    fontSize: deviceHeight / 45,
    fontFamily: 'arial',
    fontWeight: "bold",
  },
  logInButton: {
    height: deviceHeight / 20,
    width: deviceHeight / 3,
    backgroundColor: "#FF2C55",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#F4EBE8",
    padding: 5,
    borderRadius: 10,
  },
  text: {
    color: '#F4EBE8',
    fontSize: deviceHeight / 45,
    fontFamily: 'arial',
    fontWeight: "bold",
  },
  bigTextQuestion: {
    color: "#F4EBE8",
    fontSize: deviceHeight / 20,
    margin: 10,
    fontWeight: "bold",
  },
  bigText: {
    color: "#F4EBE8",
    fontSize: deviceHeight / 15,
    margin: 10,
    fontWeight: "bold",
  },
  navbarContainer: {
    height: deviceHeight / 6,
    width: deviceWidth,
    backgroundColor: "#7D1128",
    justifyContent: "center",
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    flexDirection: "row",
  },
  navButton: {
    height: deviceHeight / 15,
    width: deviceHeight / 8,
    backgroundColor: "#FF2C55",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    padding: 5,
    borderColor: "#F4EBE8",
    borderRadius: 10,
  },
  answerContainer: {
    height: deviceHeight / 8,
    width: deviceWidth,
    backgroundColor: "#7D1128",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  answerButton: {
    height: deviceHeight / 10,
    width: deviceHeight / 5,
    backgroundColor: "#FF2C55",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    padding: 5,
    borderColor: "#F4EBE8",
    borderRadius: 10,
  },
});
