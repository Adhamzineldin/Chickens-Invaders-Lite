function getSubstring(input_str, k) {
    let n = input_str.length;
    let left = 0;
    let countOnes = 0;
    let bestSubstring = "";

    for (let right = 0; right < n; right++) {
        if (input_str[right] === '1') {
            countOnes++;
        }

        while (countOnes === k) {
            let currentSubstring = input_str.slice(left, right + 1);

            if (bestSubstring === "" || currentSubstring.length < bestSubstring.length ||
                (currentSubstring.length === bestSubstring.length && currentSubstring < bestSubstring)) {
                bestSubstring = currentSubstring;
            }

            if (input_str[left] === '1') {
                countOnes--;
            }
            left++;
        }
    }

    return bestSubstring;
}

console.log(getSubstring("1011",2));