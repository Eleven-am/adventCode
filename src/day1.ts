import reader,{log} from "../utils/reader";

/**
 * @desc counts how many times a suite increases based on previous element
 * @param {number[]} input
 * @returns {number}
 */
function countSuites(input: number[]): number {
    let count = 0;
    for (let i = 0; i < input.length - 1; i++)
        if (input[i] < input[i + 1])
            count++;

    return count;
}

async function day1A(): Promise<void> {
    const puzzle = await reader('1:12.txt');
    const inputArray = puzzle.map(e => +(e));
    log("a", countSuites(inputArray));
}

async function day1B(): Promise<void> {
    const puzzle = await reader('1:12.txt');
    const inputArray = puzzle.map(e => +(e));

    const newDepth: number[] = [];
    for (let i = 0; i < inputArray.length - 2; i++) {
        const temp = inputArray[i] + inputArray[i + 1] + inputArray[i + 2];
        newDepth.push(temp);
    }

    log("b", countSuites(newDepth));
}

day1A();
day1B();