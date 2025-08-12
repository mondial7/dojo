export interface Exercise {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  initialTests: string
  hints: string[]
  solution?: string
}

export const exercises: Exercise[] = [
  {
    id: 'add-two-numbers',
    title: 'Add Two Numbers',
    description: 'Create a function that adds two numbers together.',
    difficulty: 'beginner',
    category: 'Math',
    initialTests: `TEST "add should return sum of two positive numbers"
  ASSERT add(2, 3) == 5
END

TEST "add should handle negative numbers"
  ASSERT add(-1, 1) == 0
END

TEST "add should handle zero"
  ASSERT add(0, 5) == 5
END`,
    hints: [
      'Start with the simplest test case',
      'Make sure your function handles negative numbers',
      'Test edge cases like zero'
    ],
    solution: `FUNCTION add(a, b)
  RETURN a + b
END`
  },
  {
    id: 'is-even',
    title: 'Even Number Checker',
    description: 'Create a function that checks if a number is even.',
    difficulty: 'beginner',
    category: 'Logic',
    initialTests: `TEST "isEven should return true for even numbers"
  ASSERT isEven(2) == true
  ASSERT isEven(4) == true
END

TEST "isEven should return false for odd numbers"
  ASSERT isEven(1) == false
  ASSERT isEven(3) == false
END

TEST "isEven should handle zero"
  ASSERT isEven(0) == true
END`,
    hints: [
      'Use the modulo operator (%)',
      'Even numbers have no remainder when divided by 2',
      'Remember that 0 is considered even'
    ],
    solution: `FUNCTION isEven(number)
  RETURN number % 2 == 0
END`
  },
  {
    id: 'factorial',
    title: 'Factorial Calculator',
    description: 'Create a function that calculates the factorial of a number.',
    difficulty: 'intermediate',
    category: 'Math',
    initialTests: `TEST "factorial of 0 should be 1"
  ASSERT factorial(0) == 1
END

TEST "factorial of 1 should be 1"
  ASSERT factorial(1) == 1
END

TEST "factorial of 5 should be 120"
  ASSERT factorial(5) == 120
END

TEST "factorial of 4 should be 24"
  ASSERT factorial(4) == 24
END`,
    hints: [
      'Factorial of 0 is defined as 1',
      'Use a loop to multiply numbers from 1 to n',
      'You can also solve this recursively'
    ],
    solution: `FUNCTION factorial(n)
  IF n == 0 THEN
    RETURN 1
  END
  SET result = 1
  FOR i FROM 1 TO n DO
    SET result = result * i
  END
  RETURN result
END`
  },
  {
    id: 'find-max',
    title: 'Find Maximum',
    description: 'Create a function that finds the maximum number in an array.',
    difficulty: 'intermediate',
    category: 'Arrays',
    initialTests: `TEST "findMax should return the largest number"
  ASSERT findMax([1, 3, 2]) == 3
  ASSERT findMax([5, 1, 9, 2]) == 9
END

TEST "findMax should handle single element"
  ASSERT findMax([42]) == 42
END

TEST "findMax should handle negative numbers"
  ASSERT findMax([-1, -5, -2]) == -1
END`,
    hints: [
      'Start by assuming the first element is the maximum',
      'Compare each element with your current maximum',
      'Update the maximum when you find a larger value'
    ],
    solution: `FUNCTION findMax(numbers)
  SET max = numbers[0]
  FOR i FROM 1 TO LENGTH(numbers) - 1 DO
    IF numbers[i] > max THEN
      SET max = numbers[i]
    END
  END
  RETURN max
END`
  },
  {
    id: 'palindrome',
    title: 'Palindrome Checker',
    description: 'Create a function that checks if a string is a palindrome.',
    difficulty: 'intermediate',
    category: 'Strings',
    initialTests: `TEST "isPalindrome should return true for palindromes"
  ASSERT isPalindrome("racecar") == true
  ASSERT isPalindrome("level") == true
END

TEST "isPalindrome should return false for non-palindromes"
  ASSERT isPalindrome("hello") == false
  ASSERT isPalindrome("world") == false
END

TEST "isPalindrome should handle single character"
  ASSERT isPalindrome("a") == true
END

TEST "isPalindrome should handle empty string"
  ASSERT isPalindrome("") == true
END`,
    hints: [
      'Compare characters from both ends moving inward',
      'A palindrome reads the same forwards and backwards',
      'Consider edge cases like empty strings and single characters'
    ],
    solution: `FUNCTION isPalindrome(str)
  SET length = LENGTH(str)
  FOR i FROM 0 TO length / 2 - 1 DO
    IF str[i] != str[length - 1 - i] THEN
      RETURN false
    END
  END
  RETURN true
END`
  },
  {
    id: 'fizzbuzz',
    title: 'FizzBuzz',
    description: 'Create a function that returns "Fizz" for multiples of 3, "Buzz" for multiples of 5, "FizzBuzz" for multiples of both, or the number itself.',
    difficulty: 'intermediate',
    category: 'Logic',
    initialTests: `TEST "fizzBuzz should return number for non-multiples"
  ASSERT fizzBuzz(1) == "1"
  ASSERT fizzBuzz(2) == "2"
END

TEST "fizzBuzz should return Fizz for multiples of 3"
  ASSERT fizzBuzz(3) == "Fizz"
  ASSERT fizzBuzz(6) == "Fizz"
END

TEST "fizzBuzz should return Buzz for multiples of 5"
  ASSERT fizzBuzz(5) == "Buzz"
  ASSERT fizzBuzz(10) == "Buzz"
END

TEST "fizzBuzz should return FizzBuzz for multiples of both"
  ASSERT fizzBuzz(15) == "FizzBuzz"
  ASSERT fizzBuzz(30) == "FizzBuzz"
END`,
    hints: [
      'Check for multiples of both 3 and 5 first',
      'Use the modulo operator to check for multiples',
      'Remember to convert numbers to strings when needed'
    ],
    solution: `FUNCTION fizzBuzz(number)
  IF number % 15 == 0 THEN
    RETURN "FizzBuzz"
  ELSE IF number % 3 == 0 THEN
    RETURN "Fizz"
  ELSE IF number % 5 == 0 THEN
    RETURN "Buzz"
  ELSE
    RETURN number
  END
END`
  }
]

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(exercise => exercise.id === id)
}

export function getExercisesByDifficulty(difficulty: Exercise['difficulty']): Exercise[] {
  return exercises.filter(exercise => exercise.difficulty === difficulty)
}

export function getExercisesByCategory(category: string): Exercise[] {
  return exercises.filter(exercise => exercise.category === category)
}