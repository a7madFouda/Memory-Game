// Splash Screen

document.querySelector('.control-buttons span').onclick = function () {
    
    let yourName = prompt('Whats Your Name?');

    if(yourName == null || yourName =='') {
        document.querySelector('.name span').innerHTML = 'Unknown';

    } else {
        document.querySelector('.name span').innerHTML = yourName;
    }

    document.querySelector('.control-buttons').remove();
};

// Effect Duration
let duration = 1000;

//Create Array From Game Blocks
let blockContainer = document.querySelector('.memory-game-blocks');

//Create Range Of Keys
let blocks = Array.from(blockContainer.children);

let orderRange = [...Array(blocks.length).keys()]; // or Array.from(Array(blocks.length).keys())

// call function shuffle

shuffle(orderRange);

// Add Order Css Property To Game Blocks

blocks.forEach((block, index) => {
   
    block.style.order = orderRange[index];

    // Add CLick Event

    block.addEventListener('click', function () {

        flipBlock(block);
    });
});

// Flip Block Function

function flipBlock(selectedBlock) {

    selectedBlock.classList.add('is-flipped');

    // Collect All Fliped card

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If There IS Two Selected Block

    if (allFlippedBlocks.length === 2) {

        // Stop Click

        stopClick ();

        // Check Matched Block

        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

// Stop Click function

function stopClick () {

    //add Class No Click on main cintainer
    blockContainer.classList.add('no-clicking');

    setTimeout(() => {

        //Remove Class No Clicking After Duration

        blockContainer.classList.remove('no-clicking');

    }, duration);
}

// check Match block

function checkMatchedBlocks (firstBlock, secondBlock) {

    let tryElement = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();
    } else {

        tryElement.innerHTML = (parseInt(tryElement.innerHTML) + 1);

        setTimeout( () => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration);

        document.getElementById('fail').play();
    }
}

// shuffle function

function shuffle (array) {

    let current = array.length,
        temp,
        random;

    while(current > 0) {
        // Get Random Number
        random = Math.floor(Math.random() * current);

        current--;

        // swap

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;

        
    }

    return array;

}