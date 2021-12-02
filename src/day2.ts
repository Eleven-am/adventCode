import reader, {log} from "../utils/reader";

async function day2A() {
    const puzzle = await reader('2:12.txt');
    let x = 0, y = 0;

    for (let i = 0; i < puzzle.length; i++) {
        const number = puzzle[i].match(/\d+/g);

        if (number)
            switch (true) {
                case /down\s\d/.test(puzzle[i]):
                    y += parseInt(number[0]);
                    break;
                case /up\s\d/.test(puzzle[i]):
                    y -= parseInt(number[0]);
                    break;
                case /forward\s\d/.test(puzzle[i]):
                    x += parseInt(number[0]);
                    break;
                case /backward\s\d/.test(puzzle[i]):
                    x -= parseInt(number[0]);
                    break;
            }
    }

    if (x === 0 && y === 0)
        log(`Santa is at the origin.`);

    else
        log('a', x * y);
}

async function day2B() {
    const puzzle = await reader('2:12.txt');
    let x = 0, y = 0, aim = 0;

    for (let i = 0; i < puzzle.length; i++) {
        const number = puzzle[i].match(/\d+/g);

        if (number)
            switch (true) {
                case /down\s\d/.test(puzzle[i]):
                    aim += parseInt(number[0]);
                    break;
                case /up\s\d/.test(puzzle[i]):
                    aim -= parseInt(number[0]);
                    break;
                case /forward\s\d/.test(puzzle[i]):
                    x += parseInt(number[0]);
                    y += (aim * parseInt(number[0]));

                    break;
                case /backward\s\d/.test(puzzle[i]):
                    x -= parseInt(number[0]);
                    break;
            }
    }

    log('b', x * y);
}

day2A();
day2B();