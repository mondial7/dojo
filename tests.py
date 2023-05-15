# https://katdef a-log.rocks/manhattan-distance-kata
# 
# int manhattanDistance(Point, Point)
# 
# Rules:
# 
# The class Point is immutable (its state cannot be changed after instantiation)
# The class Point has no Getters
# The class Point has no public properties (i.e. the internal state cannot be read from outside the class).
# 

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y


def manhattanDistance(pointA: Point, pointB: Point) -> int:
    return 0


def test_starting_point_to_itself():
    startingPoint: Point = Point(1, 1)
    assert manhattanDistance(startingPoint, startingPoint) == 0

def test_starting_point_to_point_b():
    startingPoint: Point = Point(1, 1)
    pointB: Point=Point(1,2)
    assert manhattanDistance(startingPoint, startingPoint) == 0
