const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a string: ', (input) => {
  let input_str = input;

  rl.question('Enter a number for k: ', (num) => {
    let number_of_ones = parseInt(num, 10);

    // Process the input_str after getting all input
    var substrings = [];
    let substrings_with_three_ones = [];
      for (var i = 0; i < input_str.length; i++) {
          for (var j = i; j < input_str.length; j++) {
              substrings.push(input_str.substring(i, j + 1));
          }
      }

      for(var i = 0; i < substrings.length; i++) {
        let couter = 0;
        let temp = "";
        for (var j = 0; j < substrings[i].length; j++) {
            temp += substrings[i].charAt(j);
            if (substrings[i].charAt(j) === '1') {
               couter++;
            }
            if (couter === number_of_ones) {
                if(!substrings_with_three_ones.includes(temp)){
                    substrings_with_three_ones.push(temp);
                }
                break;
            }
        }

    }
    //  0101101
    console.log(substrings_with_three_ones);
    var answer = substrings_with_three_ones[0];
    for (var i = 0; i < substrings_with_three_ones.length; i++) {
        if (substrings_with_three_ones[i] <  answer) {
            answer = substrings_with_three_ones[i];
        }
    }

    for (var i = 0; i < answer.length; i++) {
        if (answer.charAt(i) === '1') {
            answer = answer.substring(i, answer.length);
            break;
        }
    }
    console.log("The answer is: "+ answer);

    // Close the readline interface
    rl.close();
  });
});
