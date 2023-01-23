import unittest
import dojo

class KataTemplateTests(unittest.TestCase):
    
    def test_do_nothing_does_not_do_anything(self):
        kata = dojo.KataTemplate()
        self.assertFalse(kata.doNothing(""))

    def test_do_nothing_is_polite(self):
        kata = dojo.KataTemplate()
        self.assertTrue(kata.doNothing("please"))


if __name__ == "__main__":
    unittest.main()
