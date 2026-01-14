# TDD Kata Dojo - Swift

A simple Swift project for practicing Test-Driven Development (TDD) with kata exercises.

## Prerequisites

- Swift 6.0 or later (check with `swift --version`)
- Xcode Command Line Tools (comes with Xcode or install with `xcode-select --install`)

## Quick Start

### Run Tests
```bash
swift test
```

### Run Tests with Verbose Output
```bash
swift test --verbose
```

### Build the Project
```bash
swift build
```

### Open in Xcode (Optional)
```bash
open Package.swift
```

## Project Structure

- `Sources/TDDKata/` - Your implementation code goes here
- `Tests/TDDKataTests/` - Your test code goes here
- `Package.swift` - Project configuration

## TDD Workflow

1. Write a failing test in `Tests/TDDKataTests/`
2. Run `swift test` to see it fail (Red)
3. Write minimal code in `Sources/TDDKata/` to make it pass
4. Run `swift test` to see it pass (Green)
5. Refactor and repeat

## Tips

- Test files must end with `Tests.swift`
- Test methods must start with `test`
- Use `XCTAssertEqual`, `XCTAssertTrue`, etc. for assertions
- Run `swift test --help` for more options

Happy coding!
