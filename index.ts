// - Once the sell by date has passed, Quality degrades twice as fast
// - The Quality of an item is never negative
// - "Aged Brie" actually increases in Quality the older it gets
// - The Quality of an item is never more than 50
// - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
// - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
// Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
// Quality drops to 0 after the concert


export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private descreaseQuality (quality: number, sellIn): number {
    return quality - (sellIn < 0 ? 2 : 1)
  }

  private increaseQuality (quality: number): number {
    return quality < 50 ? ++quality : quality
  }

  updateQuality(): Array<Item> {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      
      if (item.name === 'Aged Brie') {
        item.quality = this.increaseQuality(item.quality)
      } else {
        item.quality = this.descreaseQuality(item.quality, item.sellIn)
      }

      continue

      if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            item.quality = this.descreaseQuality(item.quality, 1)
          }
        }
      } else { 
        if (item.quality < 50) {
          item.quality = this.increaseQuality(item.quality)
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = this.increaseQuality(item.quality)
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = this.increaseQuality(item.quality)
              }
            }
          }
        }
      }
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != 'Aged Brie') {
          if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality > 0) {
              if (item.name != 'Sulfuras, Hand of Ragnaros') {
                item.quality = this.descreaseQuality(item.quality, 1)
              }
            }
          } else {
            item.quality = item.quality - item.quality
          }
        } else {
          if (item.quality < 50) {
            item.quality = this.increaseQuality(item.quality)
          }
        }
      }
    }

    return this.items;
  }
}