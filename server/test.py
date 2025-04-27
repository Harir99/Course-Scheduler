# pylint: disable=unused-import
"""
Executes all tests
"""
import unittest
from tests.functional.test_app import TestFlaskApp
from tests.unit.test_file import TestJsonFIle

if __name__ == "__main__":
    unittest.main()
