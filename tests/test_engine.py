import unittest
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from engine.state_machine import KeyboardState
from engine.trie import Trie
from engine.sera_rules import SERA_MAPPING

class TestKeyboardEngine(unittest.TestCase):
    def setUp(self):
        self.engine = KeyboardState()

    def test_single_consonant(self):
        delete_count, char = self.engine.process_key('h')
        self.assertEqual(delete_count, 0)
        self.assertEqual(char, 'ህ')

    def test_vowel_mutation(self):
        # 's' outputs 6th order 'ስ'
        d1, c1 = self.engine.process_key('s')
        self.assertEqual(d1, 0)
        self.assertEqual(c1, 'ስ')

        # 'e' mutates into 1st order 'ሰ' with delete_count 1
        d2, c2 = self.engine.process_key('e')
        self.assertEqual(d2, 1)
        self.assertEqual(c2, 'ሰ')

    def test_digraph_sh(self):
        # 's' -> 'ስ'
        d1, c1 = self.engine.process_key('s')
        self.assertEqual(c1, 'ስ')

        # 'h' -> 'ሽ'
        d2, c2 = self.engine.process_key('h')
        self.assertEqual(d2, 1)
        self.assertEqual(c2, 'ሽ')

        # 'o' -> 'ሾ'
        d3, c3 = self.engine.process_key('o')
        self.assertEqual(d3, 1)
        self.assertEqual(c3, 'ሾ')

if __name__ == '__main__':
    unittest.main()
