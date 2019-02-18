
// function to make artist objects.


function Artist(first,middle,last) {

    this.firstName = first;

    this.middleName = middle;

    this.lastName = last;
}

// Artist objects.

var davinci = new Artist("leonardo","da","vinci");

var escher = new Artist("m","c","escher");

var polluck = new Artist("jackson","","polluck");

var rembrandt = new Artist("rembrandt","","");

var michelangelo = new Artist("michelangelo","","");

var picasso = new Artist("pablo","","picasso");

var dali = new Artist("salvador","","dali");

var warhol = new Artist("andy","","warhol");

var wright = new Artist("frank","lloyd","wright");

var vangogh = new Artist("vincent","van","gogh");

var monet = new Artist("claude","","monet");

var rockwell = new Artist("norman","","rockwell");

var vermeer = new Artist("johannes","","vermeer");

//other variables and arrays

var artistArray = [davinci,escher,polluck,rembrandt,michelangelo,
    picasso,dali,warhol,wright,vangogh,monet,rockwell,vermeer];

var score = 0;

var maxMisses = 7;

var maxScore = artistArray.length;

var nextArtist = true;

var randomArtist;

var miss = true;

var solved;

var painterFirstTxt = document.getElementById("painterFirstTxt");

var painterMiddleTxt = document.getElementById("painterMiddleTxt");

var painterLastTxt = document.getElementById("painterLastTxt");

var missesTxt = document.getElementById("missesTxt");

var guessedTxt = document.getElementById("guessedTxt");

var nextTxt = document.getElementById("nextTxt");

var scoreTxt = document.getElementById("scoreTxt");

var guessed = [];



//some more functions

//updates the document to fill in answered letters.
function updateAnswer(){
    

    nextArtist = true;

    firstStr = " ";
    middleStr = " ";
    lastStr = " ";

    for(i = 0; i < randomArtist.firstName.length; i++){
        if(guessed.indexOf(randomArtist.firstName.charAt(i)) === -1){
        firstStr += "_ ";

        nextArtist = false;
        }
        else{
            firstStr += randomArtist.firstName.charAt(i) + " ";
        }
        
    }
    console.log(firstStr);

    for(i = 0; i < randomArtist.middleName.length; i++){
        if(guessed.indexOf(randomArtist.middleName.charAt(i)) === -1){
        middleStr += "_ ";

        nextArtist = false;
        }   
        else{
            middleStr += randomArtist.middleName.charAt(i) + " ";
        }
        
    }
    console.log(middleStr);

    for(i = 0; i < randomArtist.lastName.length; i++){
        if(guessed.indexOf(randomArtist.lastName.charAt(i)) === -1){
        lastStr += "_ ";

        nextArtist = false;
        }
        else{
            lastStr += randomArtist.lastName.charAt(i) + " ";
        }
        
    }
    console.log(lastStr);

    if(nextArtist){
        score += 1;

        nextTxt.textContent = "Nice!  Now press any key to go to next artist"

        scoreTxt.textContent = String(score) +"/" + String(maxScore);
    }

    painterFirstTxt.textContent = firstStr;

    painterMiddleTxt.textContent = middleStr;

    painterLastTxt.textContent = lastStr;
}

//set initial score

scoreTxt.textContent = String(score) +"/" + String(maxScore);

//checks to see if the letter has been guessed, then checks if it's in the answer.
//If it is, the answer is updated.  Else, the player loses a miss.
//If the player is out of misses, they'll go to the next artist next key press.
function letterCheck(){
    if(guessed.includes(event.key) === false)
        {
            var guessStr = " ";

            guessed.push(event.key)

            for(i = 0; i < guessed.length; i++){
                guessStr += guessed[i] + ", ";
            }

            guessedTxt.textContent = guessStr;

            if(randomArtist.firstName.includes(event.key) ||
            randomArtist.middleName.includes(event.key) ||
            randomArtist.lastName.includes(event.key))
            {
                updateAnswer();
            }
            else{
                misses -= 1;

                missesTxt.textContent = String(misses);

                if(misses === 0){
                    nextArtist = true;

                    nextTxt.textContent = "Not quite.  Now press any key to go to the next artist"
                }
            }

            
        }
}

document.onkeyup = function(event){
    if(nextArtist){
        if(artistArray.length === 0){
            nextTxt.textContent = "Well, that's all the artists!  How did you do?"
        }
        else{
            nextArtist = false;

            nextTxt.textContent = " ";

            //remove a random artist from the array and get their data.
            randomArtist = artistArray[Math.floor(Math.random()*artistArray.length)];

            artistArray.splice(artistArray.indexOf(randomArtist),1)

            guessed = [];

            console.log(randomArtist);

            console.log(artistArray)
            updateAnswer();

            misses = maxMisses;

            missesTxt.textContent = misses;

            guessedTxt.textContent = " "
        }
    }
    else{
        letterCheck();
    }


}