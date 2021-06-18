export const challengeObj = {
  names: [`A Chain adding function`, `BitCounting`, `Tribonacci Sequence`],
  content: [
    `\`We want to create a function that will add numbers together when called in succession.
  
add(1)(2);
// returns 3
We also want to be able to continue to add numbers to our chain.

add(1)(2)(3); // 6
add(1)(2)(3)(4); // 10
add(1)(2)(3)(4)(5); // 15
and so on.

A single call should return the number passed in.

add(1); // 1
We should be able to store the returned values and reuse them.

var addTwo = add(2);
addTwo; // 2
addTwo + 5; // 7
addTwo(3); // 5
addTwo(3)(5); // 10
We can assume any number being passed in will be valid whole number.
    
Scroll for Solution
//////////////////////////////////////////////////////////////




    function add(n){
      var fn = function(x) {
        return add(n + x);
      };
      
      fn.valueOf = function() {
        return n;
      };
      
      return fn;
    }
    \`
    `,
    `\`Write a function that takes an integer as input, 
and returns the number of bits that are equal to one in the binary representation of that number. 
You can guarantee that input is non-negative.
  
Example: The binary representation of 1234 is 10011010010, so the function should return 5 in this case


















Scroll for Solution
//////////////////////////////////////////////////////////////





countBits = n => n.toString(2).split('0').join('').length;
    
    alternate: 
    function countBits(n) {
      for(c=0;n;n>>=1)c+=n&1
      return c;
    }

\``,
    `\`Well met with Fibonacci bigger brother, AKA Tribonacci.
  
As the name may already reveal, it works basically like a Fibonacci, 
but summing the last 3 (instead of 2) numbers of the sequence to generate the next. 
And, worse part of it, regrettably I won't get to hear non-native Italian speakers trying to pronounce it :(
    
So, if we are to start our Tribonacci sequence with [1, 1, 1] as a starting input (AKA signature), we have this sequence:
    
[1, 1 ,1, 3, 5, 9, 17, 31, ...]
But what if we started with [0, 0, 1] as a signature? 
As starting with [0, 1] instead of [1, 1] basically shifts the common Fibonacci sequence by once place, 
you may be tempted to think that we would get the same sequence shifted by 2 places, but that is not the case and we would get:

[0, 0, 1, 1, 2, 4, 7, 13, 24, ...]
Well, you may have guessed it by now, but to be clear: 
you need to create a fibonacci function that given a signature array/list, 
returns the first n elements - signature included of the so seeded sequence.

Signature will always contain 3 numbers; n will always be a non-negative number; if n == 0, 
then return an empty array (except in C return NULL) and be ready for anything else which is not clearly specified ;)
    



Scroll for Solution
//////////////////////////////////////////////////////////////



function tribonacci(signature,n){  
  for (var i = 0; i < n-3; i++) { // iterate n times
    signature.push(signature[i] + signature[i+1] + signature[i+2]); // add last 3 array items and push to trib
  }
  return signature.slice(0, n); //return trib - length of n
}
\``,
  ],
  solution: [
    `function add(n){
      var fn = function(x) {
        return add(n + x);
      };
      
      fn.valueOf = function() {
        return n;
      };
      
      return fn;
    }`,
    `countBits = n => n.toString(2).split('0').join('').length;
    
    alternate: 
    function countBits(n) {
      for(c=0;n;n>>=1)c+=n&1
      return c;
    }`,
    `function tribonacci(signature,n){  
      for (var i = 0; i < n-3; i++) { // iterate n times
        signature.push(signature[i] + signature[i+1] + signature[i+2]); // add last 3 array items and push to trib
      }
      return signature.slice(0, n); //return trib - length of n
    }`,
  ],
};
