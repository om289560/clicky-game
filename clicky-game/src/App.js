import React, { Component } from "react";
import ImageFileNames from "./ImageFileNames";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ImageBlockListing from "./components/ImageBlockListing";
import Footer from "./components/Footer";


class App extends Component {
	state = {
    imageFileNames: ImageFileNames,
    clickedImages: [],
    score: 0,
    topScore: 0,
    feedback: "Click an image to begin!",
    gameStatus: 0 
  };

  componentDidMount() {
    this.setState({
      imageFileNames: this.shuffle(this.state.imageFileNames)
    }, () => {
      console.log("Shuffled the images on game start");
    });
  }

  handleClick = event => {
    // console.log(event.target); // example output => <img class="col-md-3 col-sm-4 col-xs-12 pb-4 imageBlock" src="/static/media/alchemist.ce4808c0.png" alt="alchemist.png">
    // console.log(event.target.alt); // example output => alchemist.png
    const clickedImageFileName = event.target.alt;
    // console.log("The clicked image is: " + clickedImageFileName);
    // console.log("state BEFORE: " + JSON.stringify(this.state));
    const wasImageClickedBefore = this.imageClickedBefore(clickedImageFileName);
    if (wasImageClickedBefore) {
      this.setState({
        imageFileNames: this.shuffle(this.state.imageFileNames),
        clickedImages: [],
        score: 0,
        feedback: "Game Over! You Guessed The Same Image Twice!",
        gameStatus: 2
      }, () => {
        // console.log("IF block state AFTER GAME OVER: " + JSON.stringify(this.state));
      });
    } else {
      let newScore = this.state.score + 1;
      if (newScore === this.state.imageFileNames.length) {
        this.setState({
        imageFileNames: this.shuffle(this.state.imageFileNames),
        // imageFileNames: this.state.imageFileNames, //for debugging only
          clickedImages: [],
          score: 0,
          topScore: newScore,
          feedback: "Congrats! You Have Guessed All Of The Images Correctly!",
          gameStatus: 1
          });
      } else {
        const clickedImagesCopy = this.state.clickedImages.slice();
        clickedImagesCopy.push(clickedImageFileName);
        const newTopScore = (newScore > this.state.topScore) ? newScore : this.state.topScore;
        this.setState({
        imageFileNames: this.shuffle(this.state.imageFileNames),
        // imageFileNames: this.state.imageFileNames, //for debugging only
          clickedImages: clickedImagesCopy,
          score: newScore,
          topScore: newTopScore,
          feedback: "Yes! You Guessed The Image Correctly!",
          gameStatus: 0
          }, () => {
          // console.log("IF block state AFTER CORRECT GUESS: " + JSON.stringify(this.state));
        });
      }
    }
  };

  imageClickedBefore = (clickedImageFileName) => {
  	for (let index=0; index<this.state.clickedImages.length; index++) {
  		if (this.state.clickedImages[index] === clickedImageFileName) {
        return true;
      }
    }
    return false;
  };

  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  render() {
   return (
    <div>
      <Navbar score={this.state.score} topScore={this.state.topScore} feedback={this.state.feedback} gameStatus={this.state.gameStatus} />
      <Banner />
      <ImageBlockListing imageFileNames={this.state.imageFileNames} clickHandler={this.handleClick} gameStatus={this.state.gameStatus} />
      <Footer />
    </div>
    );
  }
}

export default App;