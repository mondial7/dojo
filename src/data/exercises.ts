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
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    description: 'Implement binary search to find a target value in a sorted array. Return the index if found, -1 if not found.',
    difficulty: 'advanced',
    category: 'Algorithms',
    initialTests: `TEST "binarySearch should find element in sorted array"
  ASSERT binarySearch([1, 3, 5, 7, 9], 5) == 2
  ASSERT binarySearch([1, 2, 3, 4, 5, 6, 7], 1) == 0
  ASSERT binarySearch([1, 2, 3, 4, 5, 6, 7], 7) == 6
END

TEST "binarySearch should return -1 for missing elements"
  ASSERT binarySearch([1, 3, 5, 7, 9], 4) == -1
  ASSERT binarySearch([1, 3, 5, 7, 9], 0) == -1
  ASSERT binarySearch([1, 3, 5, 7, 9], 10) == -1
END

TEST "binarySearch should handle single element array"
  ASSERT binarySearch([5], 5) == 0
  ASSERT binarySearch([5], 3) == -1
END

TEST "binarySearch should handle empty array"
  ASSERT binarySearch([], 5) == -1
END`,
    hints: [
      'Use left and right pointers to track search boundaries',
      'Calculate middle index and compare with target',
      'Adjust search boundaries based on comparison',
      'Time complexity should be O(log n)'
    ],
    solution: `FUNCTION binarySearch(arr, target)
  IF LENGTH(arr) == 0 THEN
    RETURN -1
  END
  SET left = 0
  SET right = LENGTH(arr) - 1
  
  WHILE left <= right DO
    SET mid = (left + right) / 2
    IF arr[mid] == target THEN
      RETURN mid
    ELSE IF arr[mid] < target THEN
      SET left = mid + 1
    ELSE
      SET right = mid - 1
    END
  END
  
  RETURN -1
END`
  },
  {
    id: 'merge-sorted-arrays',
    title: 'Merge Two Sorted Arrays',
    description: 'Merge two sorted arrays into a single sorted array without using a sorting algorithm.',
    difficulty: 'advanced',
    category: 'Arrays',
    initialTests: `TEST "merge should combine two sorted arrays"
  ASSERT merge([1, 3, 5], [2, 4, 6]) == [1, 2, 3, 4, 5, 6]
  ASSERT merge([1, 5, 9], [2, 3, 4, 6, 7, 8]) == [1, 2, 3, 4, 5, 6, 7, 8, 9]
END

TEST "merge should handle empty arrays"
  ASSERT merge([], [1, 2, 3]) == [1, 2, 3]
  ASSERT merge([1, 2, 3], []) == [1, 2, 3]
  ASSERT merge([], []) == []
END

TEST "merge should handle arrays of different lengths"
  ASSERT merge([1], [2, 3, 4, 5]) == [1, 2, 3, 4, 5]
  ASSERT merge([1, 2, 3, 4], [5]) == [1, 2, 3, 4, 5]
END

TEST "merge should handle duplicate values"
  ASSERT merge([1, 3, 5], [1, 3, 5]) == [1, 1, 3, 3, 5, 5]
END`,
    hints: [
      'Use two pointers, one for each array',
      'Compare elements and add smaller one to result',
      'Handle remaining elements when one array is exhausted',
      'Should work in O(n + m) time where n and m are array lengths'
    ],
    solution: `FUNCTION merge(arr1, arr2)
  SET result = []
  SET i = 0
  SET j = 0
  
  WHILE i < LENGTH(arr1) AND j < LENGTH(arr2) DO
    IF arr1[i] <= arr2[j] THEN
      APPEND arr1[i] TO result
      SET i = i + 1
    ELSE
      APPEND arr2[j] TO result
      SET j = j + 1
    END
  END
  
  WHILE i < LENGTH(arr1) DO
    APPEND arr1[i] TO result
    SET i = i + 1
  END
  
  WHILE j < LENGTH(arr2) DO
    APPEND arr2[j] TO result
    SET j = j + 1
  END
  
  RETURN result
END`
  },
  {
    id: 'longest-common-subsequence',
    title: 'Longest Common Subsequence',
    description: 'Find the length of the longest common subsequence between two strings.',
    difficulty: 'advanced',
    category: 'Dynamic Programming',
    initialTests: `TEST "LCS should find common subsequences"
  ASSERT lcs("ABCDGH", "AEDFHR") == 3
  ASSERT lcs("AGGTAB", "GXTXAYB") == 4
END

TEST "LCS should handle identical strings"
  ASSERT lcs("HELLO", "HELLO") == 5
END

TEST "LCS should handle no common subsequence"
  ASSERT lcs("ABC", "XYZ") == 0
END

TEST "LCS should handle empty strings"
  ASSERT lcs("", "ABC") == 0
  ASSERT lcs("ABC", "") == 0
  ASSERT lcs("", "") == 0
END

TEST "LCS should handle single character strings"
  ASSERT lcs("A", "A") == 1
  ASSERT lcs("A", "B") == 0
END`,
    hints: [
      'This is a classic dynamic programming problem',
      'Create a 2D table to store subproblem results',
      'If characters match, add 1 to diagonal result',
      'If characters don\'t match, take maximum of left or top'
    ],
    solution: `FUNCTION lcs(str1, str2)
  SET m = LENGTH(str1)
  SET n = LENGTH(str2)
  
  SET dp = CREATE_2D_ARRAY(m + 1, n + 1)
  
  FOR i FROM 0 TO m DO
    FOR j FROM 0 TO n DO
      IF i == 0 OR j == 0 THEN
        SET dp[i][j] = 0
      ELSE IF str1[i - 1] == str2[j - 1] THEN
        SET dp[i][j] = dp[i - 1][j - 1] + 1
      ELSE
        SET dp[i][j] = MAX(dp[i - 1][j], dp[i][j - 1])
      END
    END
  END
  
  RETURN dp[m][n]
END`
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    description: 'Check if a string containing parentheses, brackets, and braces is valid. Each opening bracket must have a corresponding closing bracket in the correct order.',
    difficulty: 'advanced',
    category: 'Stack',
    initialTests: `TEST "isValid should return true for valid parentheses"
  ASSERT isValid("()") == true
  ASSERT isValid("()[]{}") == true
  ASSERT isValid("{[()]}") == true
  ASSERT isValid("((()))") == true
END

TEST "isValid should return false for invalid parentheses"
  ASSERT isValid("(]") == false
  ASSERT isValid("([)]") == false
  ASSERT isValid("((()") == false
  ASSERT isValid("())") == false
END

TEST "isValid should handle empty string"
  ASSERT isValid("") == true
END

TEST "isValid should handle single brackets"
  ASSERT isValid("(") == false
  ASSERT isValid(")") == false
  ASSERT isValid("[") == false
  ASSERT isValid("]") == false
END`,
    hints: [
      'Use a stack data structure to track opening brackets',
      'Push opening brackets onto the stack',
      'For closing brackets, check if they match the top of stack',
      'Stack should be empty at the end for valid input'
    ],
    solution: `FUNCTION isValid(s)
  SET stack = []
  SET pairs = {")": "(", "]": "[", "}": "{"}
  
  FOR i FROM 0 TO LENGTH(s) - 1 DO
    SET char = s[i]
    
    IF char == "(" OR char == "[" OR char == "{" THEN
      PUSH char TO stack
    ELSE IF char == ")" OR char == "]" OR char == "}" THEN
      IF LENGTH(stack) == 0 THEN
        RETURN false
      END
      
      SET top = POP FROM stack
      IF top != pairs[char] THEN
        RETURN false
      END
    END
  END
  
  RETURN LENGTH(stack) == 0
END`
  },
  {
    id: 'quicksort',
    title: 'QuickSort Algorithm',
    description: 'Implement the QuickSort algorithm to sort an array of numbers in ascending order.',
    difficulty: 'advanced',
    category: 'Sorting',
    initialTests: `TEST "quickSort should sort arrays correctly"
  ASSERT quickSort([3, 1, 4, 1, 5, 9, 2, 6]) == [1, 1, 2, 3, 4, 5, 6, 9]
  ASSERT quickSort([5, 2, 8, 1, 9]) == [1, 2, 5, 8, 9]
END

TEST "quickSort should handle edge cases"
  ASSERT quickSort([]) == []
  ASSERT quickSort([1]) == [1]
  ASSERT quickSort([2, 1]) == [1, 2]
END

TEST "quickSort should handle already sorted arrays"
  ASSERT quickSort([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]
END

TEST "quickSort should handle reverse sorted arrays"
  ASSERT quickSort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]
END

TEST "quickSort should handle duplicate elements"
  ASSERT quickSort([3, 3, 3, 3]) == [3, 3, 3, 3]
  ASSERT quickSort([1, 3, 2, 3, 1]) == [1, 1, 2, 3, 3]
END`,
    hints: [
      'Choose a pivot element (often the last element)',
      'Partition array so smaller elements are before pivot',
      'Recursively sort the left and right subarrays',
      'Base case: arrays with 0 or 1 elements are already sorted'
    ],
    solution: `FUNCTION quickSort(arr)
  IF LENGTH(arr) <= 1 THEN
    RETURN arr
  END
  
  SET pivot = arr[LENGTH(arr) - 1]
  SET left = []
  SET right = []
  
  FOR i FROM 0 TO LENGTH(arr) - 2 DO
    IF arr[i] < pivot THEN
      APPEND arr[i] TO left
    ELSE
      APPEND arr[i] TO right
    END
  END
  
  SET sortedLeft = quickSort(left)
  SET sortedRight = quickSort(right)
  
  SET result = []
  APPEND_ALL sortedLeft TO result
  APPEND pivot TO result
  APPEND_ALL sortedRight TO result
  
  RETURN result
END`
  },
  {
    id: 'n-queens',
    title: 'N-Queens Problem',
    description: 'Find the number of ways to place N queens on an N×N chessboard such that no two queens attack each other.',
    difficulty: 'advanced',
    category: 'Backtracking',
    initialTests: `TEST "nQueens should solve for small boards"
  ASSERT nQueens(1) == 1
  ASSERT nQueens(4) == 2
END

TEST "nQueens should handle impossible cases"
  ASSERT nQueens(2) == 0
  ASSERT nQueens(3) == 0
END

TEST "nQueens should solve for 8x8 board"
  ASSERT nQueens(8) == 92
END`,
    hints: [
      'Use backtracking to try placing queens row by row',
      'Check if current position conflicts with previous queens',
      'A queen attacks horizontally, vertically, and diagonally',
      'Use recursion to explore all valid placements'
    ],
    solution: `FUNCTION nQueens(n)
  SET count = 0
  SET board = CREATE_ARRAY(n)
  
  FUNCTION solve(row)
    IF row == n THEN
      SET count = count + 1
      RETURN
    END
    
    FOR col FROM 0 TO n - 1 DO
      IF isSafe(board, row, col) THEN
        SET board[row] = col
        CALL solve(row + 1)
      END
    END
  END
  
  CALL solve(0)
  RETURN count
END

FUNCTION isSafe(board, row, col)
  FOR i FROM 0 TO row - 1 DO
    IF board[i] == col THEN
      RETURN false
    END
    IF ABS(board[i] - col) == ABS(i - row) THEN
      RETURN false
    END
  END
  RETURN true
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