# pylint: disable=relative-beyond-top-level, import-error
"""
Executes tests for app.py - all the endpoints

"""
import unittest
import json
from app import app
from ..test_functions import validate_string_arr, validate_json_obj, check_json


class TestFlaskApp(unittest.TestCase):
    """
    name: TestFlaskApp

    Using unittest module to test the endpoints from flask app

    test_welcome: verifies the response is the specific text string
    test_get_course_data: ensures the data is of json type and matches the correct schema
    test_get_course_title: ensures the data returned is an array of strings
    test_get_course_appointments: tests the post request return

    """

    def setUp(self):
        """
        name: setUp

        Sets up the client to execute endpoints
        """
        self.app = app.test_client()

    def test_welcome(self):
        """
        name: test_welcome
        test_welcome: verifies the response is the specific text string
        """
        response = self.app.get('/')
        self.assertEqual(
            response.text, "<h1 style='color:blue'>Hello There!</h1>")

    def test_get_course_data(self):
        """
        name: test_get_course_data
        test_Get_Course_Data: ensures the data is of json type and matches the correct schema
        """
        response = self.app.post('/api/getCourseData',
                                 json={"chosenSem": "Fall 2022"})
        self.assertEqual(check_json(response.data), True)
        self.assertEqual(validate_json_obj(response.json), True)
        self.assertEqual(response.status_code, 200)

    def test_get_course_title(self):
        """
        name: test_get_course_title
        test_get_course_title: ensures the data returned is an array of strings
        """
        response = self.app.post(
            '/api/getCourseTitles', json={"chosenSem": "Fall 2022"})
        self.assertEqual(validate_string_arr(response.text), True)
        self.assertEqual(response.status_code, 200)

    def test_get_course_appointments_good(self):
        """
        name: test_get_course_appointments_good
        test_get_course_appointments: tests the post request return is json and status is 200
        """
        response = self.app.post('/api/getCourseAppointments',
                                 json={"semester": "Fall 2022", "courses_info":
                                       ["ACCT*1220*0101 (6573) Intro Financial Accounting"]})
        self.assertEqual(validate_json_obj(response.json), True)
        self.assertEqual(response.status_code, 200)

    def test_get_course_appointments_bad(self):
        """
        name: test_get_course_appointments_bad
        test_get_course_appointments: tests the post request returns status of 500
        """
        response = self.app.post('/api/getCourseAppointments', json={})
        self.assertEqual(response.status_code, 500)

    def test_filter_course_data(self):
        """
        name: test_filter_course_data
        test_filter_course_data: tests the post request return is json and status is 200
        """
        req = {
            "search": {
                "semester": "Fall 2022",
                "subject": "CIS",
                "days": ["Tues", "Thur"],
                "start_time": "8:30 AM",
                "end_time": "10:00 PM",
                "prof": "Klotz",
                "de": False
            }
        }

        response = self.app.post('/api/getFilteredCourses', json=req)

        res_json = response.data.decode('utf8').replace("'", '"')
        data = json.loads(res_json)

        self.assertEqual(check_json(response.data), True)
        self.assertEqual(validate_json_obj(response.json), True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data[0]["Section"],
                         "CIS*3760*0103 (7265) Software Engineering")
        self.assertEqual(data[0]["Term"], "Fall 2022")
        self.assertEqual(data[0]["Faculty"], "G. Klotz")
