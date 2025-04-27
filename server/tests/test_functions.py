"""
All functions used in test cases
"""
import json
import jsonschema
from jsonschema import validate


courseSchema = {
    "Term": "string",
    "Status": "string",
    "Section": "string",
    "Location": "string",
    "Lecture Days": "string",
    "Lecture Time": "string",
    "Lecture Location": "string",
    "Seminar Days": "string",
    "Seminar Time": "string",
    "Seminar Location": "string",
    "Lab Days": "string",
    "Lab Time": "string",
    "Lab Location": "string",
    "Distance Education": "string",
    "Exam Day": "string",
    "Exam Time": "string",
    "Exam Location": "string",
    "Faculty": "string",
    "Capacity": "string",
    "Credits": "string",
    "Academic Level": "string"
}

chosenCoursesSchema = {
    "type": "object",
    "properties": {
        "semester": {
            "type": "string"
        },
        "courses_info": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "minItems": 1,
            "maxItems": 5
        }
    }
}

coursesApptSchema = {
    "type": "object",
    "properties": {
        "appointments": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string"
                    },
                    "full_title": {
                        "type": "string"
                    },
                    "day": {
                        "type": "array"
                    },
                    "location": {
                        "type": "string"
                    },
                    "start_time": {
                        "type": "array"
                    },
                    "end_time": {
                        "type": "array"
                    },
                    "de": {
                        "type": "boolean"
                    },
                    "color": {
                        "type": "string"
                    }
                }
            }
        },
        "conflicts": {
            "type": "array"
        }
    }
}


def check_json(string_value):
    """
    name: checkJson
    arguments: string named string_value
    output/return: returns false if the json data cannot be loaded, returns true if
    it can be loaded.
    """
    try:
        json.loads(string_value)
        return True
    except ValueError:
        return False


def is_json_val(json_data):
    """
    name: isJSONValid
    arguments: jsonData: file object (json file that was read)
    output/return: returns false if the json data cannot be loaded, returns true if
    it can be loaded.

    """
    try:
        json.load(json_data)
    except ValueError:
        return False
    return True


def validate_json_obj(json_data):
    """
    name: validateJSONObjects
    arguments: jsonData: file object (json file that was read)
    output/return: returns false if the json data does not match the schema object, returns true if
    it does.

    """
    try:
        validate(instance=json_data, schema=courseSchema)
    except jsonschema.exceptions.ValidationError:
        return False
    return True


def validate_string_arr(data):
    """
    name: validateStringArray
    arguments: data: array
    output/return: returns false if the array is not all strings, returns true if
    it does.

    """
    if all(isinstance(item, str) for item in data):
        return True
    return False


def val_json_dict_arr(json_data):
    """
    name: validateJSONDictArray
    arguments: jsonData: json object
    output/return: returns false if dict key is not courses_info
    and dict value is not an array of strings,
    or array length is not from 1 - 5
    returns true if it does.

    """
    try:
        validate(instance=json_data, schema=chosenCoursesSchema)
    except jsonschema.exceptions.ValidationError:
        return False
    return True


def val_json_arr_dict(json_data):
    """
    name: validateJSONDict
    arguments: jsonData: json object
    output/return: returns false doesn't match coursesApptSchema
    returns true if it does.

    """
    try:
        validate(instance=json_data, schema=coursesApptSchema)
    except jsonschema.exceptions.ValidationError:
        return False
    return True
