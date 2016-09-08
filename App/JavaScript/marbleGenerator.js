/*
 * This function validates if a value is numeric. Credit to stackoverflow.
 * isNumeric(n)
 *      n: the value to check if it is a number
 */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/*
 * This is the function that gets called when the user selects a marble.
 * generateMarbleGroups(num)
 *      marbleNum: the number of marbes the user wants to see possible combinations of
 */
function generateMarbleGroups(marbleNum) {
  // i used this array of colours because 1) my permutation does not care what
  // the contents of the array are and 2) this makes it easier to apply the styles
  // to the marbles later
  var values = ['blue', 'green', 'red', 'yellow', 'orange'];
  var node = document.getElementById('marbleDisplayArea');

  // displaying an error would be better here
  if(!isNumeric) {
    marbleNum = 1;
  }

  // not the best way to handle this situation
  // an error message would be better without clearing
  // the screen but this is some simple input
  // validation
  if(marbleNum < 1 || marbleNum > 5) {
    marbleNum = 1;
  }

  // this removes all the marbes already displayed
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }

  // the permutation will not print each marble by itself as a
  // valid permutation so do that here first
  for(var i = 0; i < marbleNum; i++) {
    printPermutedArray([values[i]]);
  }

  // if they chose more than one marble, lets being finding possible combinations
  if(marbleNum >= 2) {
    for(var i = 2; i <= marbleNum; i++) {
      var newArr = values.slice(0, i);
      permuteArray(newArr);
    }
  }
};

/*
 * This function is responsible for printing the the marble array passed into it.
 * printPermutedArray(array)
 *      array: the array to print
 */
function printPermutedArray(array) {
  var divChilds = [];
  var displayArea = document.getElementById('marbleDisplayArea');
  var div = document.createElement('div');
  array.forEach(function _asdfg(item, index) {
    var divChild = document.createElement('div');
    divChild.className = 'marble-base marble-' + item;
    div.appendChild(divChild);
  })
  displayArea.appendChild(div);
};

/*
 * This function is responsible for calculating the possible marble combinations.
 * permuteArray(remainingArray, currentArray)
 *      remainingArray: the array elements that need to be permuted
 *      currentArray: the currently permuted array
 *
 * I used a recursive function to calculate the possible permutations for my application.
 * I am aware iterative functions are much more efficient and will not have you running into memory
 * issues as easily.
 */
function permuteArray(remainingArray, currentArray) {
  var array = currentArray || [];

  // we only have one item left to permute so we can just append it an print
  if (remainingArray.length === 1) {
    array.push(remainingArray[0]);
    // print the resulting array permutation
    printPermutedArray(array);
    return;
  }

  // grab the item in the remaining array @ index and push it to the current array
  // then call the function again
  remainingArray.forEach(function _moveArrayElement(item, index) {
    var copyOfCurrentArray = array.slice();
    var copyOfRemainingArray = remainingArray.slice();
    copyOfCurrentArray.push(copyOfRemainingArray.splice(index, 1)[0]);
    permuteArray(copyOfRemainingArray, copyOfCurrentArray);
  });
};
