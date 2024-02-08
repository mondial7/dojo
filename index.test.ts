/**
 * 
 * Thirty-One
 * 
 * Ideas for game design:
 * 
 * 
 * GameScoring() -> [stateless, or keeping track of the score aka stateful - by injecting the setup]
      * -> currentScore(player): player's current score 
 * 
 * PreGame() ->
    * -> getSetup(): get the setup for the game
 * 
 * GameLoop(setup) ->
      * -> deck: 32 cards
      * -> pickUpItem(player): player pulls out an item from the deck
      * -> showInventory(player): player shows their inventory, and last turn starts
 * 
 */

import { GameScore, Card, CardValues, Suits } from "."

describe('GameScore', () => {
  describe("calculate", () => {
    describe("when the cards are all different suits", () => {
      it.each([
        [CardValues.Seven, CardValues.Seven, CardValues.Seven, 7],
        [CardValues.Seven, CardValues.Eight, CardValues.Eight, 8],
        [CardValues.Seven, CardValues.Eight, CardValues.Nine, 9],
        [CardValues.Seven, CardValues.Eight, CardValues.Ten, 10],
        [CardValues.Seven, CardValues.Nine, CardValues.Jack, 10],
        [CardValues.Seven, CardValues.Nine, CardValues.Queen, 10],
        [CardValues.Seven, CardValues.Nine, CardValues.King, 10],
        [CardValues.Seven, CardValues.Eight, CardValues.Ace, 11],
      ])("should return the value of the highest", (cardAValue, cardBValue, cardCValue, expectedScore) => {
        const cardA = new Card(Suits.Spades, cardAValue)
        const cardB = new Card(Suits.Clovers, cardBValue)
        const cardC = new Card(Suits.Hearts, cardCValue)

        const score = GameScore.calculate([cardA, cardB, cardC])

        expect(score).toBe(expectedScore)
      })
    })

    describe("when the cards are all of the same suits", () => {
      it('cards should add up', () => {
        const cardA = new Card(Suits.Spades, CardValues.Eight)
        const cardB = new Card(Suits.Spades, CardValues.Seven)
        const cardC = new Card(Suits.Spades, CardValues.Nine)
  
        const score = GameScore.calculate([cardA, cardB, cardC])
  
        expect(score).toBe(24)
      })
    })
    
    describe("When the cards have mixed suits", ()=>{
      it("should sum only the cards with same suits", () => {
        const cardA = new Card(Suits.Spades, CardValues.Eight)
        const cardB = new Card(Suits.Clovers, CardValues.Seven)
        const cardC = new Card(Suits.Spades, CardValues.Nine)
  
        const score = GameScore.calculate([cardA, cardB, cardC])
  
        expect(score).toBe(17)
      })
    })

        
  })
  

})
