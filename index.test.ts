import { doNothing } from ".";

describe("Kata Template", () => {
  it("does nothing...", () => {
    expect(doNothing()).toBeTruthy();
  });

  it("replies to politeness", () => {
    expect(doNothing("please")).toBeFalsy();
  });
});
