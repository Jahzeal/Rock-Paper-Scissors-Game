let score = JSON.parse(localStorage.getItem('score')) ||
    // sample
    // const store = JSON.parse(localStorage.getItem('score'));
    // console.log(store);
    {
        wins: 0,
        loses: 0,
        ties: 0,
      };


      updateScoreElement(); /*calling the function*/
      
    /*if(!score){
      score = {
        wins: 0,
        loses: 0,
        ties: 0,
      };
    }*/
    function updateScoreElement(){
      document.querySelector('.js-score')
      .innerHTML = `Wins:${score.wins},Loses:${score.loses},Ties:${score.ties}`;
    }

    let isAutoPlaying = false;
    let interValidId;

    //const autoPlay =() =>{

    //}


     //event listener for sutoplay
    document.querySelector('.js-autoplay-button')
    .addEventListener('click', ()=>{
      autoPlay();
    })

    //event listener for reset button
    function reset(){
        score.wins = 0;
        score.loses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
      }
      document.querySelector('.js-reset-button').
      addEventListener('click',()=>{
        reset();
      });

    function clearPgh(){
      document.querySelector('.resetpopup').innerHTML = '';
    }




    document.body.addEventListener('keydown', (event)=>{
      const key = event.key.toLowerCase()
      if(key === 'r'){
        playGame('rock');
      }else if(key === 'p'){
        playGame('paper');
      }else if(key === 's'){
        playGame('scissors');
      }else if(key === 'backspace'){
        const resetPopup = document.querySelector('.resetpopup');
        resetPopup.innerHTML = `Are you sure you want to reset the score <button class="js-yes-button">Yes</button><button class="js-no-button">No</button>`;
        document.body.appendChild(resetPopup);
        
        const yesButton = resetPopup.querySelector('.js-yes-button')
        .addEventListener('click',()=>{
          reset();
          clearPgh();
        }
        )
        const noButton = resetPopup.querySelector('.js-no-button')
        .addEventListener('click',()=>{
          clearPgh();
        });
      }
    });

    //autoplay block

    function autoPlay(){
      if(!isAutoPlaying){
      interValidId =  setInterval(()=> {
          const playerMove = pickComputerMove();
          playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
      }else{
        clearInterval(interValidId);
        isAutoPlaying = false;
      }
    }

    document.querySelector('.js-rock-button')
    .addEventListener('click', ()=>{
      playGame('rock');
    });

    document.querySelector('.js-paper-button')
    .addEventListener('click', ()=>{
      playGame('paper');
    });

    document.querySelector('.js-scissors-button')
    .addEventListener('click', ()=>{
      playGame('scissors');
    });

    

    function playGame(playerMove) {
      const computerMove = pickComputerMove(); // Initialize computerMove here
      let result = '';

      if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
          result = 'You lose.';
        } else if (computerMove === 'paper') {
          result = 'You win.';
        } else if (computerMove === 'scissors') {
          result = 'Tie.';
        }
      } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
          result = 'You win.';
        } else if (computerMove === 'paper') {
          result = 'Tie.';
        } else if (computerMove === 'scissors') {
          result = 'You lose.';
        }
      } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
          result = 'Tie.';
        } else if (computerMove === 'paper') {
          result = 'You lose.';
        } else if (computerMove === 'scissors') {
          result = 'You win.';
        }
      }


      if(result === 'You win.'){
        score.wins += 1;
      }else if(result === 'You lose.'){
        score.loses += 1;
      }else if(result == 'Tie.'){
        score.ties += 1;
      }



      localStorage.setItem('score', JSON.stringify(score));

      updateScoreElement();

      document.querySelector('.js-result').innerHTML = result;

      document.querySelector('.js-moves').innerHTML = ` You
    <img src="images/${playerMove}-emoji.png" alt="rockImage" class="move-icon">
    <img src="images/${computerMove}-emoji.png" alt="scissorsImage" class="move-icon">
    Computer`
    }

    function pickComputerMove() {
      const randomNumber = Math.random();
      if (randomNumber >= 0 && randomNumber < 1 / 3) {
        return 'rock';
      } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        return 'paper';
      } else {
        return 'scissors';
      }
    }