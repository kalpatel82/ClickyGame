import React, { Component } from "react";
import ImageNames from "./ImageNames";
import Navbar from "./components/Navbar"
import ImageBlockListing from "./components/ImageBlockListing";
import Footer from "./components/Footer";
import Jumbotron from "./components/jumbotron";

class App extends Component{
  state = {
    imageNames: ImageNames,
    clickedImage: [],
    score: 0,
    highScore: 0,
    message: "Click image to start!",
    status: 0 
    // status: 0 = game started, 1 = won, 2 = loss
  };

  componentDidMount(){
    this.setState({
      imageNames: this.shuffle(this.state.imageNames)
    }, () => {
      console.log("Images shuffled on start");
    });
  }

  handleClick = event => {

    const clickedImageName = event.target.alt;

    const previousClicks = this.clickedOnce(clickedImageName);

    if (previousClicks){
      this.setState({
        imageNames: this.shuffle(this.state.ImageNames),
        clickedImage: [],
        score: 0,
        message: "Game Over! Already Clicked!",
        status: 2
      },() => {
      });
    } else {
      let newScore = this.state.score +1;
      if (newScore === this.state.imageNames.length){
        this.setState({
          imageNames: this.shuffle(this.state.imageNames),

          clickedImages: [],
          score: 0,
          highScore: newScore,
          feedback: "Congrats! You Have Guessed All Of The Images Correctly!",
          gameStatus: 1
       });
      } else {
        const clickedImagesCopy = this.state.clickedImage.slice();
        clickedImagesCopy.push(clickedImageName);
        const newHighScore = (newScore > this.state.highScore) ? newScore : this.state.highScore;
        this.setState({
        imageFileNames: this.shuffle(this.state.imageFileNames),
        // imageFileNames: this.state.imageFileNames, //for debugging only
          clickedImages: clickedImagesCopy,
          score: newScore,
          highScore: newHighScore,
          feedback: "Yes! You Guessed The Image Correctly!",
          gameStatus: 0
          }, () => {
          });
        }
      }
    };

    imageClickedPreviously = (clickedImageName) => {
      for (let index=0; index<this.state.clickedImages.length; index++) {
        if (this.state.clickedImage[index] === clickedImageName) {
          return true;
        }
      }
      return false;


  };

  // Copied from stackoverflow post:
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  render() {
   return (
    <div>
      <Navbar />
      <Jumbotron score={this.state.score} topScore={this.state.highScore} feedback={this.state.message} gameStatus={this.state.status} />
     
      <ImageBlockListing imageFileNames={this.state.imageNames} clickHandler={this.handleClick} gameStatus={this.state.status} />
      <Footer />
    </div>
    );
  }
}


export default App;
