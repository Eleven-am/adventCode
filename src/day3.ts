import reader, {log} from "../utils/reader";

interface Gamma {
    zero: number;
    one: number;
    mostBit: number;
    leastBit: number;
}

const counter = async (filter = false, check?: 'oxg'|'co2'): Promise<Gamma[]> => {
    let data = await reader("3:12.txt");
    const gammaReading: Gamma[] = [];
    const gammaLength = data[0].length;
    let index = 0;

    while (index < gammaLength) {
        gammaReading[index] = {
            zero: 0,
            one: 0,
            mostBit: 0,
            leastBit: 0
        };

        data.forEach(row => {
            const value = parseInt(row.charAt(index));
            if (value === 0)
                gammaReading[index].zero++;
            else
                gammaReading[index].one++;
        });

        gammaReading[index].mostBit = gammaReading[index].zero > gammaReading[index].one ? 0 : 1;
        gammaReading[index].leastBit = gammaReading[index].zero < gammaReading[index].one ? 0 : 1;

        if (filter && check) {
            if (check === 'oxg')
                data = data.filter(row => row.charAt(index) === (gammaReading[index].zero === gammaReading[index].one ? '1': gammaReading[index].mostBit.toString()));

            else if (check === 'co2')
                data = data.filter(row => row.charAt(index) === (gammaReading[index].zero === gammaReading[index].one ? '0': gammaReading[index].leastBit.toString()));

            if (data.length === 1)
                return stringToGamma(data[0], check === 'oxg');
        }

        index++;
    }

    return gammaReading;
}

/**
 * @desc convert a string to a Gamma array
 * @param string to convert
 * @param mostBit boolean set mostBit or leastBit
 */
const stringToGamma = (string: string, mostBit: boolean): Gamma[] => {
    const gammaReading: Gamma[] = [];
    const gammaLength = string.length;
    let index = 0;

    while (index < gammaLength) {
        gammaReading[index] = {
            zero: 0,
            one: 0,
            mostBit: 0,
            leastBit: 0
        };

        const value = parseInt(string.charAt(index));
        if (mostBit)
            gammaReading[index].mostBit = value;
        else
            gammaReading[index].leastBit = value;

        index++;
    }

    return gammaReading;
}


/**
 * @desc converts a gamma reading to a binary string
 * @param bits: Gamma[]
 * @param mostBit: boolean
 */
const gammaToBinary = (bits: Gamma[], mostBit: boolean): string => {
    let binary = "";
    bits.forEach(bit => {
        if (mostBit)
            binary += bit.mostBit;
        else
            binary += bit.leastBit;
    });
    return binary;
}

/**
 * @desc converts a binary string to a decimal number
 * @param binary: string
 */
const binaryToDecimal = (binary: string): number => {
    let decimal = 0;
    for (let i = 0; i < binary.length; i++) {
        if (binary.charAt(i) === "1")
            decimal += Math.pow(2, binary.length - i - 1);
    }
    return decimal;
}

async function day3A() {
    const response = await counter();
    const gamma = gammaToBinary(response, true);
    const gammaDecimal = binaryToDecimal(gamma);

    const epsilon = gammaToBinary(response, false);
    const epsilonDecimal = binaryToDecimal(epsilon);

    log(`Day 3A: ${gammaDecimal * epsilonDecimal}`);
}

async function day3B() {
    const response = await counter(true, 'oxg');
    const gammaOxg = gammaToBinary(response, true);
    const gammaOxgDecimal = binaryToDecimal(gammaOxg);

    const response2 = await counter(true, 'co2');
    const gammaCo2 = gammaToBinary(response2, false);
    const gammaCo2Decimal = binaryToDecimal(gammaCo2);

    log(`Day 3B: ${gammaOxgDecimal * gammaCo2Decimal}`);
}

day3A();
day3B();