const ALFABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const caesar = {
  encrypt(input) {
    // Define result
    let result = "";

    // Loop through input value
    input.split("").forEach((char) => {
      // Loop through alfabet
      ALFABET.forEach((newChar, index) => {
        if (newChar.toLowerCase() == char.toLowerCase()) {
          // Reset array count if exceeds length of ALFABET
          if (index + 3 >= ALFABET.length) {
            return (result += ALFABET[index + 3 - ALFABET.length]);
          }

          // Return result with added char
          return (result += ALFABET[index + 3]);
        }
      });
    });

    // Return end result
    return result || null;
  },

  decrypt(input) {
    // define result
    let result = "";

    input.split("").forEach((char) => {
      ALFABET.forEach((newChar, index) => {
        if (newChar.toLowerCase() == char.toLowerCase()) {
          // Loopback on array, and return correct value
          if (index - 3 < 0) {
            return (result += ALFABET[index - 3 + ALFABET.length]);
          }

          // Return value based on array position
          return (result += ALFABET[index - 3]);
        }
      });
    });

    return result;
  },
};

const viginere = {
  encrypt(input) {},

  decrypt(input) {},
};

caesar.encrypt("Hello world");
caesar.decrypt("ABCD");
