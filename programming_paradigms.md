# Programming Paradigms

Here are examples of routines written in different programming paradigms:

## Imperative (COBOL)
Instructions that explicitly tell the computer how to perform tasks step by step.

```cobol
IDENTIFICATION DIVISION.
PROGRAM-ID. PRINT-NUMBERS.

DATA DIVISION.
WORKING-STORAGE SECTION.
    01 I PIC 9(2) VALUE 1.
    01 N PIC 9(2) VALUE 10.

PROCEDURE DIVISION.
    PERFORM UNTIL I > N
        DISPLAY I
        ADD 1 TO I
    END-PERFORM.
    STOP RUN.
```

## Procedural (Python)
A step-by-step approach where a program is organized into procedures (functions) that perform specific tasks.

```python
def print_numbers(n):
    for i in range(1, n+1):
        print(i)
```

## Functional (Haskell)
Focuses on composing functions and treating computation as the evaluation of mathematical functions, emphasizing immutability and avoiding side effects.

```haskell
printNumbers :: Int -> IO ()
printNumbers n = mapM_ print [1..n]
```

## Object-Oriented (Java)
Organizes code around objects that encapsulate data and behavior, promoting concepts such as inheritance, polymorphism, and encapsulation.

```java
public class NumberPrinter {
    public void printNumbers(int n) {
        for (int i = 1; i <= n; i++) {
            System.out.println(i);
        }
    }
}
```

## Logic (Prolog)
Programs are written as a set of logical statements, and computation is performed by logical inference and solving logical queries.

```prolog
print_numbers(N) :-
    print_numbers_helper(1, N).

print_numbers_helper(I, N) :-
    I =< N,
    writeln(I),
    I1 is I + 1,
    print_numbers_helper(I1, N).
```
