const $ = (foo) => {
  if (document.querySelectorAll(foo).length <= 1){
    return document.querySelector(foo);
  }
  return document.querySelectorAll(foo)
}

const ALFABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split("");

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

const vigenere = {
  encrypt(input, key) {
    let result = "";

    // Get position of characters in key
    let keyPositions = key.split("").map((char) => {
      return ALFABET.indexOf(char.replace(" ", "").toLowerCase());
    });

    let inputPositions = input.split("").map((char) => {
      return ALFABET.indexOf(char.replace(" ", "").toLowerCase());
    });

    // Define CURRENT position of key
    let keyPos = 0;

    inputPositions.forEach((pos) => {
      if (keyPos == keyPositions.length) {
        keyPos = 0;
      }

      let newPos = 0;
      if (pos + keyPositions[keyPos] >= ALFABET.length) {
        newPos = pos + keyPositions[keyPos] - ALFABET.length;
      } else {
        newPos = pos + keyPositions[keyPos];
      }

      // Append results
      result += ALFABET[newPos];

      // Increment key position
      keyPos++;
    });

    // Return result
    return result;
  },

  decrypt(input, key) {},
};

vigenere.encrypt("hello world", "hello");


/*

---------------------------------------------------------------------------------------------------
26/01 - 2023
---------------------------------------------------------------------------------------------------

*/


const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");

const OTP = {
  generate: (length = 32, amount = 1) => {
    // Define array for storing OTP's
    let otps = [];

    // Repeat x amount of times
    for (let i = 0; i < amount; i++) {
      let res = "";

      // Generate OTP using Math random
      for (let i = 0; i < length; i++) {
        res += chars[Math.floor(Math.random() * chars.length)];
      }

      // Push OTP to array
      otps.push(res);

      // Reset
      res = "";
    }

    // Return OTP's as array
    return otps;
  },
};

const cryptoMethods = [
  {
    name: "SHA256",
    func: CryptoJS.SHA256
  },
  {
    name: "SHA512",
    func: CryptoJS.SHA512
  },
  {
    name: "MD5",
    func: CryptoJS.MD5
  },
]

cryptoMethods.forEach((method) => {
  $("#form-hash").querySelector("select").innerHTML += `<option value="${method.name}">${method.name}</option>`
});

$("#form-hash").querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();

  if (!$("#hash-input").value.length){
    return alert("Please enter an input")
  }

  const selectedMethod = cryptoMethods.filter((method) => {
    return method.name == $("#form-hash").querySelector("select").value;
  })[0]

  $("#hash-output").value = selectedMethod.func($("#hash-input").value).toString();
  $("#hash-input").value = "";
})