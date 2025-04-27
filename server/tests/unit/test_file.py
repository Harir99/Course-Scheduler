# pylint: disable=relative-beyond-top-level, consider-using-with
"""
Test cases for json file

"""
import unittest
import os
import json
from ..test_functions import is_json_val, validate_json_obj, val_json_dict_arr, val_json_arr_dict


class TestJsonFIle (unittest.TestCase):
    """
    name: TestJsonFile
    Using unittest module to test that the json file with data is valid
    test_file_exists: verifies that the output json files exists
    test_file_created: verifies that the output json files were created/has content in it
    test_json_data: verfies that the json files can be parsed/uses correct syntax for json
    test_json_data_schema: verifies that json objects match the json schema
    """
    def test_file_exists (self):
        """
        test_file_exists: verifies that the output json files exists
        """
        file_exists = os.path.exists("./data/course_data_F22.json")
        self.assertEqual (file_exists, True)
        file_exists = os.path.exists("./data/course_data_W23.json")
        self.assertEqual (file_exists, True)
    def test_file_created (self):
        """
        test_file_created: verifies that the output json files were created/has content in it
        """
        filesize = os.path.getsize("./data/course_data_F22.json")

        check = True
        if filesize == 0:
            check = False
        self.assertTrue (check, False)
        filesize = os.path.getsize("./data/course_data_W23.json")
        check = True
        if filesize == 0:
            check = False
        self.assertTrue (check, False)
    def test_json_data (self):
        """
        test_json_data: verfies that the json files can be parsed/uses correct syntax for json
        """
        file = open ('./data/course_data_F22.json', encoding="utf8")
        check = is_json_val (file)
        file.close()
        self.assertEqual (check, True)
        file = open ('./data/course_data_W23.json', encoding="utf8")
        check = is_json_val (file)
        file.close()
        self.assertEqual (check, True)
    def test_json_data_schema (self):
        """
        test_json_data_schema: verifies that json objects match the json schema
        """
        file = open ('./data/course_data_F22.json', encoding="utf8")
        check = validate_json_obj (file)

        file.close()
        self.assertEqual (check, True)
        file = open ('./data/course_data_W23.json', encoding="utf8")
        check = validate_json_obj (file)

        file.close()
        self.assertEqual (check, True)

    def test_json_dict_schema_1 (self):
        """
        test_json_dict_schema_1: tests data with 5 chosen courses
        """
        file = open ('./tests/mock_data/good_5_chosen_courses.json', encoding="utf8")
        json_data = json.load(file)
        check = val_json_dict_arr (json_data)
        file.close()
        self.assertEqual (check, True)

    def test_json_dict_schema_2 (self):
        """
        test_json_dict_schema_2: verifies that correct schema is returned for 1 course
        """
        file = open ('./tests/mock_data/good_1_chosen_courses.json', encoding="utf8")
        json_data = json.load(file)
        check = val_json_dict_arr (json_data)

        file.close()
        self.assertEqual (check, True)

    def test_json_dict_schema_3 (self):
        """
        test_json_dict_schema_3: verifies erifies that correct schema is returned for 0 courses
        """
        file = open ('./tests/mock_data/bad_0_chosen_courses.json', encoding="utf8")
        json_data = json.load(file)
        check = val_json_dict_arr (json_data)

        file.close()
        self.assertEqual (check, False)

    def test_json_dict_schema_4 (self):
        """
        test_json_dict_schema_4: verifies that correct schema is returned for 6 course
        """
        file = open ('./tests/mock_data/bad_6_chosen_courses.json', encoding="utf8")
        json_data = json.load(file)
        check = val_json_dict_arr (json_data)
        file.close()
        self.assertEqual (check, False)

    def test_json_array_schema_1 (self):
        """
        test_json_dict_schema_4: verifies that correct schema is returned for array
        """
        file = open ('./tests/mock_data/good_appt.json', encoding="utf8")
        json_data = json.load(file)
        check = val_json_arr_dict (json_data)
        file.close()
        self.assertEqual (check, True)

    def test_json_array_schema_2 (self):
        """
        test_json_array_schema_2: verifies that the error is indentified for incorrect schema
        """
        file = open ('./tests/mock_data/bad_appt.json', encoding="utf8")
        json_data = json.load(file)
        check = val_json_arr_dict (json_data)
        file.close()
        self.assertEqual (check, False)
