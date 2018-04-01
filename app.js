
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
})




























// Please note, this is only practice code. Therefore, every line is commented to reinforce learning.

/*
RULES:

- Enter the nunber of people currently in the room
- Names of participants
- Timer (default 5 minutes)
- Randomly  / alphabetically / reverse alphabetically disply Names
- Note down ideas (text field + add more + done) for each participant
- display all ideas on screen - classify into phase / shortlist



var score, roundScore, activePlayer, dice; // Declare global variables

init(); // Initialize game

// ROLL BUTTON
document.querySelector('.btn-roll').addEventListener('click', function() { // When the player clicks the Roll Dice button
  diceValue = Math.floor(Math.random() * 6) + 1; // Picks a random number between 1 and 6 and stores it to var diceValue
  var diceDOM = document.querySelector('.dice'); //Shorthand for the dice's document selector property
  diceDOM.style.display = 'block'; // Displays the dice
  diceDOM.src = 'dice-' + diceValue + '.png' // Displays the correct .png file for the dice, based on random diceValue
  
  if (diceValue !== 1) { // If the random dice value is not 1
    roundScore += diceValue; // Add dice value to the round score
    document.querySelector('#current-' + activePlayer).textContent = roundScore; //Display the total round score for current dice roll
  } else {
    nextPlayer(); // Switch players
  }
});

// HOLD BUTTON
document.querySelector('.btn-hold').addEventListener('click', function() { // When the player clicks the Hold button
  score[activePlayer] += roundScore; // Add the active player's round score to their global score
  document.querySelector('#score-' + activePlayer).textContent = score[activePlayer]; // Update the UI to show active player's global score
  
  if (score[activePlayer] >= 100) { // If the active player's global score is more than 100
    document.querySelector('#name-' + activePlayer).textContent = 'WINNER!'; // Update the UI to show active player's name as 'WINNER!'
    document.querySelector('.dice').src = 'winner-' + activePlayer + '.png'; // Update the UI to show the winner's trophy in place of the dive 
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); // Remove 'active' CSS class from the active player
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); // Add 'winner' CSS class to the active player to highlight their victory
    gameOver(); // Call the gameOver function
  } else {
  nextPlayer(); // Switch players 
  }
});

// NEW GAME BUTTON
document.querySelector('.btn-new').addEventListener('click', init); // When the player clicks the New Game button call the init function
  
function init() {
  score = [0, 0]; // Set score to 0 for both players
  activePlayer = 0; // Set Player 1 as default active player
  roundScore = 0; // set round score to 0 for both players
  
  document.querySelector('.dice').style.display = 'none'; // Hide dice before the first roll
  
  document.getElementById('score-0').textContent = '0'; // Update UI to show Player 1's global score as 0
  document.getElementById('score-1').textContent = '0'; // Update UI to show Player 2's global score as 0
  document.getElementById('current-0').textContent = '0'; // Update UI to show Player 1's round score as 0
  document.getElementById('current-1').textContent = '0'; // Update UI to show Player 2's round score as 0
  
  document.getElementById('name-0').textContent = 'Player 1'; // Update UI to show Player 1
  document.getElementById('name-1').textContent = 'Player 2'; //Update UI to show Player 2
  
  document.querySelector('.player-0-panel').classList.remove('winner'); //Update UI to remove 'winner' CSS class from Player 1
  document.querySelector('.player-1-panel').classList.remove('winner'); //Update UI to remove 'winner' CSS class from Player 2 
  
  document.querySelector('.player-0-panel').classList.remove('active'); //Update UI to remove 'active' CSS class from Player 1 
  document.querySelector('.player-1-panel').classList.remove('active'); //Update UI to remove 'active' CSS class from Player 2 
  
  document.querySelector('.player-0-panel').classList.add('active'); //Update UI to add 'active' CSS class to Player 1
  
  document.querySelector('.btn-roll').style.display = 'block'; // Update UI to display the Roll Dice button
  document.querySelector('.btn-hold').style.display = 'block'; // Update UI to display the Hold button
}


function nextPlayer() { // This function switches players
  roundScore = 0; // Update the active player's round score to 0
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // If player 1 is active, switch to player 2 ... and vice-versa
    
  document.getElementById('current-0').textContent = '0'; // Update UI to show roundscore as 0 for player 1
  document.getElementById('current-1').textContent = '0'; // Update UI to show roundscore as 0 for player 2
  
  document.querySelector('.player-0-panel').classList.toggle('active'); // Toggle 'active' CSS class for player 1
  document.querySelector('.player-1-panel').classList.toggle('active'); // Toggle 'active' CSS class for player 2
}

function gameOver() {
  document.querySelector('.btn-roll').style.display = 'none'; // Update UI to hide the Roll Dice button
  document.querySelector('.btn-hold').style.display = 'none'; // Update UI to hide the Hold button
}

*/