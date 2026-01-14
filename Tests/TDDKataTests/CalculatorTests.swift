import XCTest
@testable import TDDKata

final class CalculatorTests: XCTestCase {

    func testDummy() {
        // Arrange
        let calculator = Calculator()

        // Act
        let result = calculator.dummyMethod()

        // Assert
        XCTAssertTrue(result)
    }

    func testTrueIsTrue() {
        // The simplest possible test
        XCTAssertTrue(true)
    }
}
