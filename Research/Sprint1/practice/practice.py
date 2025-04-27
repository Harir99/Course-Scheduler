import sys  # sys module allow for reading the args
import json  # json module
import re
from tokenize import Number  # reg ex for splitting strings in this programs case
from typing import TypedDict  # for the structure of section information

'''
    READING IN THE ARGUMENTS PASSED INTO THE SCRIPT
'''
# print(sys.argv[1:]) # prints all the command line arguments after argument 1
# sets args equal to all the arguments after argument 1 (which is the script name)
argsList = sys.argv[1:]

# Seperating FLAGS and ARGUMENTS into lists of each included
# - Creating an array using the value of the arg if it meets the 'if' criteria
flags = [flag for flag in argsList if flag.startswith('-')]
args = [args for args in argsList if not args.startswith('-')]

# print("args: " + str(args))
# print("flags: " + str(flags))

'''
    CREATING/SETTING UP COURSE CLASS AND A TYPED DICT FOR IT
'''
# TypedDicts are required to mantain the specified format when created/updated unlike normal python dicts which can be updated and modified as the user desires.
# it is said that using  TypedDicts is better for JSON structures than just a regular dictionary.


class SectionData(TypedDict):
    code: str
    number: int
    section: str
    notSureWhatThisIsAtTheMoment: str
    name: str


def splitSectionData(str):
    # given "ACCT*1220*0101 (6573) Intro Financial Accounting", for example
    # leaving spaces as is for the written course name. you have to use \ before special characters like \s (space)
    arr = re.split('[()*]', str)
    sectionData: SectionData = {
        'code': arr[0],
        'numbers': int(arr[1]),
        'section': arr[2].strip(' '),
        'notSureWhatThisIsAtTheMoment': arr[3].strip(' '),
        'name': arr[4].strip(' '),
    }
    return sectionData


class Course():
    # self  is just a convention. this first argument to init represents the 'self' of Course object when it is created which can contain data.
    def __init__(self, section):  # the initializer/constructor
        self.sectionData = splitSectionData(section)
        pass

    def printSelf(self):  # a method that prints self
        print(self.sectionData)


'''
    READING IN JSON DATA
'''
# 'with' is used to open files
with open('data.json') as file:
    data = json.load(file)
    # I believe in this case this will create an ORDERED LIST (which are like arrays) of DICTIONARIES (which are objects of unordered key value pairs).
    # in these dictionaries there be some keys whose value is another dictionary).

'''
   CREATING AN ARRAY OF 'COURSE' CLASSED USING PARSED JSON DATA
'''
# dict array
dictList = []

# looping through each list element in the 'data' list.
for classData in data:
    data = classData['Section']
    sectionData = Course(data)
    dictList.append(sectionData)
    sectionData.printSelf()

# creating procedures based on what the flag and arguments are.
# for now this program will just work with inputting 1 flag and argument for simplicity
# could just make it so that only one arg is caved in the flag/nonFlag variables but leaving as is for now

# will be searching by professor
if "-search" in flags:
    # Just searching for the first argument for now
    print("searching for " + str(args[0]))
