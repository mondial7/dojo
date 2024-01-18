# Card game kata - 31

**Goal**: Don’t lose all three lives

**Player base rules**: There are four players, with 3 lives each. 

**Card deck rules**: The deck has 32 cards total containing:  7,8,9,10,Jack,Queen,King,Ace of each suit (Clover, Spade, Hearts, Diamonds); The cards are worth the following respectively: 7,8,9,10,10,10,10,11

**Special tokens**:

- Dealer token → First round Player 1 is dealer, after each round the dealer token gets moved along to the next player
- MVP token → Is the player in front of the dealer
- Preacher token → Is the player after the MVP token

**Dealing rules**: Dealer deals 5 decks of 3 cards each. MVP gets two decks and everyone else gets one deck. 

**Start of round rules**: MVP chooses either deck “A” or “B” and gets to look at one of the decks. If the player is happy with their chosen deck the other deck becomes the playing deck for the remainder of the round. If the player is not happy with the deck they have chosen, they can switch to the second choice and place their initial choice as the playing deck. Preacher starts the round with their action. 

**Actions per turn**:

- **Switch** a card with a card from the playing deck
- **Stay** and stick with the cards in your hand (”last play” gets started)
→ Swap & stay - allows the player to switch all three cards with the playing deck. “Last play” gets initiated
- **31** (When cards total 31 = “Round over” → no player gets to make a further action and cards are compared)

**Round check:**

- (Switch) Previous player switched a card, continue play.
- (Stay) “Last play” for each player until the turn comes back to the the player who chose “stay” first that round. All cards get flipped to show cards and compare scores.
- (31) (When a player holds cards over total 31 the round is over immediately and no player gets to make a further action, show cards and compare scores.

**Scoring rules**: 

Points are scored according to the face value of the cards held in the hand. Points can be added if the suits are the same as the other cards. 

- 3 cards different suits: highest point value is counted as final score
- 2 cards of the same suits: points are added together as final score (Card with different suit is ignored except incase of tie breaker)
- 3 cards with the same suit (not 31): points are added together as final score
- 3 cards with the same suit (31!): Automatically win the round.

**Score ties**:

If two or more players are tied for the same amount of points we need to look at the “true” value of the cards. 
First check face cards: Jack > 10; Queen > Jack; King > Queen.

If tie breaker still has not been achieved second check gets initiated
Second check: Card of different suit is included in point count to achieve point breaker

**Special tokens**:

- Dealer token → First round player 1 is dealer, after each round the dealer token gets moved along to the next player
- MVP token → Is the player in front of the Dealer token
- Preacher token → Is the player in front of the MVP token

**Loser**:

Player with the lowest score that round loses 1 health. → Tokens move one over and new round starts. 

If a player hits zero lives they lose the game. 

The first player hitting zero gets 1 extra life → Play becomes Cow