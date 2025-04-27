'''Python imports'''
import csv  # csv module
import json  # json module
import re
from datetime import datetime
import pandas as pd
from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def hello():
    '''Hello World'''
    return "<h1 style='color:blue'>Hello There!</h1>"

# react component calls this route and expects a JSON array of parsed course data


@app.route("/api/getCourseData", methods=["POST"])
def course_data():
    '''Return all course data in json format'''
    # data, just so the front-end team can work on it's functionality and not be slowed down.
    semester = request.get_json()
    # if semester['chosenSem'] == "Fall 2022":
    #     csv_to_json(r'data/course_data_F22.csv', r'data/course_data_F22.json')
    #     return json.dumps(get_json_data(r'data/course_data_F22.json'))
    # csv_to_json(r'data/course_data_W23.csv', r'data/course_data_W23.json')
    # return json.dumps(get_json_data(r'data/course_data_W23.json'))

    csv_path = r'data/course_data_F22.csv'\
                if semester['chosenSem'] == "Fall 2022"\
                else r'data/course_data_W23.csv'
    full_df = pd.read_csv(csv_path)
    df_100 = full_df.iloc[0:99]
    result = df_100.to_json(orient="records")
    parsed = json.loads(result)
    final_json = json.dumps(parsed, indent=4)
    # print(final_json)
    return final_json


# Returns titles of courses for auto-search
@app.route("/api/getCourseTitles", methods=["POST"])
def course__title_data():
    '''Return all course titles in json format'''
    # loads json objects from file and extracts the values for 'section' to return array of titles
    semester = request.get_json()
    course_objects = ""
    if semester['chosenSem'] == "Fall 2022":
        course_objects = get_json_data(r'data/course_data_F22.json')
    else:
        course_objects = get_json_data(r'data/course_data_W23.json')
    titles = [sub['Section'] for sub in course_objects]
    final = json.dumps(titles, indent=2)
    return final


# Return json array of dict
# used to create course appointments on front-end
@app.route("/api/getCourseAppointments", methods=["POST"])
def course_appointments():
    '''Return course appointments in json format'''
    #
    # expecting json array:
    # {
    #   "semester": "Fall 2022",
    #   "courses_info":
    #       [
    #           "CIS*3760*0101 (7263) Software Engineering",
    #           "CIS*3150*0101 (7253) Theory of Computation"
    #       ]
    # }
    #
    # request_data = request.get_json()
    request_data = request.json
    semester = request_data.get("semester")
    courses_info = request_data.get("courses_info")
    # print(request_data)
    if semester is None or courses_info is None:
        return {"Error": "Unable receive data properly"}, 500

    csv_path = r'data/course_data_F22.csv'\
                if request_data["semester"] == "Fall 2022"\
                else r'data/course_data_W23.csv'

    if semester == "Fall 2022":
        date = [2022, 9, 8]
    elif semester == "Winter 2023":
        date = [2023, 1, 9]

    df = pd.read_csv(csv_path) # pylint: disable=invalid-name
    # print(df.head())
    selected_df = df[df["Section"].isin(courses_info)]
    # print(selected_df)

    selected_df = selected_df[
        ["Section", "Lecture Days", "Lecture Time",
        "Lecture Location", "Seminar Days", "Seminar Time",
        "Seminar Location", "Lab Days", "Lab Time",
        "Lab Location", "Distance Education", "Exam Day",
        "Exam Time", "Exam Location"]
        ]
    selected_df.reset_index(drop=True, inplace=True)
    selected_df["Modified Section"] = selected_df.loc[:, "Section"]
    # print(selected_df)

    #
    # Only keep course abbrev, course code and course section in Section
    #
    for index, row in selected_df.iterrows(): # pylint: disable=unused-variable
        section_list = row["Modified Section"].split(" ")
        row["Modified Section"] = section_list[0]

    courses_appts = get_course_appointments(selected_df)
    conflicts = get_course_conflicts(courses_appts)

    res = {
        "appointments": courses_appts,
        "conflicts": conflicts,
        "sem": date
    }
    final = json.dumps(res, indent=2)

    # print(final)

    return final

# Return json array of dict
# used to create filter results on front-end
@app.route("/api/getFilteredCourses", methods=["POST"])
def filter_course_data():
    '''Return json result for front end coureses filtering'''
    request_data = request.json
    search_dict = request_data.get("search")

    if search_dict is None:
        return {"Error": "Unable receive data properly"}, 500

    semester = search_dict["semester"]
    subject = search_dict["subject"]
    days = search_dict["days"]
    start_time = search_dict["start_time"].replace(" ", "")
    end_time = search_dict["end_time"].replace(" ", "")
    prof = search_dict["prof"]
    de = str(search_dict["de"]).upper() # pylint: disable=invalid-name

    # print(f"START TIME: {start_time}")
    # print(f"END TIME: {end_time}")

    csv_path = r'data/course_data_F22.csv'\
                if semester == "Fall 2022"\
                else r'data/course_data_W23.csv'
    init_df = get_init_df(csv_path)

    #
    # Pruning dataframe based on query
    #
    selected_df = get_subject_df(subject, init_df)
    selected_df = get_prof_df(prof, selected_df)
    selected_df = get_de_df(de, selected_df)
    selected_df = get_days_df(days, selected_df)
    selected_df = get_start_time_df(start_time, selected_df)
    selected_df = get_end_time_df(end_time, selected_df)
    selected_df.reset_index(drop=True, inplace=True)
    # print(selected_df.head())

    if selected_df.empty:
        return {}

    return get_final_json(selected_df)


def csv_to_json(csv_path, json_path):
    ''' Create a json file locally from a csv file data '''
    # create a dictionary
    data = []
    # Open a csv reader called DictReader
    with open(csv_path, encoding='utf-8') as csvf:
        csv_reader = csv.DictReader(csvf)
        # Convert each row into a dictionary and add it to data
        for rows in csv_reader:
            data.append(rows)
    # Open a json writer, and use the json.dumps() function to dump data
    with open(json_path, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))


def get_json_data(json_path):
    ''' Pull all data from a json  file '''
    with open(json_path, 'r', encoding='utf-8') as jsonf:
        data = json.load(jsonf)
    return data


def get_title(title, suffix):
    ''' Return course title with suffix '''
    return f"{title + suffix}"


def get_day_list(days):
    ''' Return day list in number format '''
    day_list = days.strip().split(", ")
    day_dict = {
        "Sun": 1,
        "Mon": 2,
        "Tues": 3,
        "Wed": 4,
        "Thur": 5,
        "Fri": 6,
        "Sat": 7,
        "TBA": "",
        " ": "",
    }
    for idx in range(len(day_list)): # pylint: disable=consider-using-enumerate
        for key, value in day_dict.items():
            day_list[idx] = day_list[idx].replace(key, str(value))

    if day_list[0] == "":
        day_list = []

    # print(f"day_list: {day_list}")
    return day_list

def get_day_string(days):
    ''' Return day list in RRDATE format '''
    string='BYDAY='
    day_list = days.strip().split(", ")
    day_dict = {
        "Sun": "SU",
        "Mon": "MO",
        "Tues": "TU",
        "Wed": "WE",
        "Thur": "TH",
        "Fri": "FR",
        "Sat": "SA",
        "TBA": "",
        " ": "",
    }
    for idx in range(len(day_list)): # pylint: disable=consider-using-enumerate
        for key, value in day_dict.items():
            day_list[idx] = day_list[idx].replace(key, str(value))

    for idx in range(len(day_list)): # pylint: disable=consider-using-enumerate
        string += day_list[idx] + ","

    if len(string) > 6:
        string = string[:-1]
        string = string + ";"

    return string

def get_time(full_time, index):
    ''' Return military time '''

    if "TBA" in full_time or full_time == " ":
        return [0, 0]

    # get rid of () and text in them
    full_time_str = re.sub("[\(\[].*?[\)\]]", "", full_time) # pylint: disable=anomalous-backslash-in-string
    time_list = full_time_str.strip().split(" - ")
    full_time_str = time_list[index]

    # original 08:30AM, need a space ie. 08:30 AM
    proper_time = full_time_str[0:-2] + " " + full_time_str[-2:]
    in_time = datetime.strptime(proper_time, "%I:%M %p")
    out_time = datetime.strftime(in_time, "%H:%M")
    hour_min = out_time.split(":")

    # get rid of an 0 (ie. 08 to 8, 00 to 0)
    for idx in range(len(hour_min)): # pylint: disable=consider-using-enumerate
        hour_min[idx] = re.sub(r"0+(.+)", r"\1", hour_min[idx])

    # print(hour_min)
    return hour_min


def get_course_appointments(dataframe):
    '''Return course appointments dictionary'''

    courses_appts = []
    colors = ["#009688", "#4D243D", "#A98743", "#595421", "#545863"]
    exam_colour = "#F88A71"

    for index, row in dataframe.iterrows():

        if row["Distance Education"] == "TRUE" or row["Distance Education"] == " ":
            # print("DE")
            de_dict = {
                "title": get_title(row["Modified Section"], ""),
                "full_title": row["Section"],
                "day": [],
                "location": "",
                "start_time": [0, 0],
                "end_time": [0, 0],
                "de": True,
                "color": colors[index]
            }
            courses_appts.append(de_dict)

            if row["Exam Day"] != " ":
                de_exam = {
                    # "day_string": get_day_string(row["Exam Day"]),
                    "title": get_title(row["Modified Section"], " EXAM"),
                    "full_title": row["Section"],
                    "day": get_day_list(row["Exam Day"]),
                    "location": row["Exam Location"],
                    "start_time": get_time(row["Exam Time"], 0),
                    "end_time": get_time(row["Exam Time"], 1),
                    "de": True,
                    "color": exam_colour
                }
                courses_appts.append(de_exam)

        else:
            if row["Lecture Days"] != " ":
                lec_dict = {
                    "day_string": get_day_string(row["Lecture Days"]),
                    "title": get_title(row["Modified Section"], " LEC"),
                    "full_title": row["Section"],
                    "day": get_day_list(row["Lecture Days"]),
                    "location": row["Lecture Location"],
                    "start_time": get_time(row["Lecture Time"], 0),
                    "end_time": get_time(row["Lecture Time"], 1),
                    "de": False,
                    "color": colors[index]
                }
                courses_appts.append(lec_dict)

            if row["Lab Days"] != " ":
                lec_dict = {
                    "day_string": get_day_string(row["Lab Days"]),
                    "title": get_title(row["Modified Section"], " LAB"),
                    "full_title": row["Section"],
                    "day": get_day_list(row["Lab Days"]),
                    "location": row["Lab Location"],
                    "start_time": get_time(row["Lab Time"], 0),
                    "end_time": get_time(row["Lab Time"], 1),
                    "de": False,
                    "color": colors[index]
                }
                courses_appts.append(lec_dict)

            if row["Seminar Days"] != " ":
                lec_dict = {
                    "day_string": get_day_string(row["Seminar Days"]),
                    "title": get_title(row["Modified Section"], " SEM"),
                    "full_title": row["Section"],
                    "day": get_day_list(row["Seminar Days"]),
                    "location": row["Seminar Location"],
                    "start_time": get_time(row["Seminar Time"], 0),
                    "end_time": get_time(row["Seminar Time"], 1),
                    "de": False,
                    "color": colors[index]
                }
                courses_appts.append(lec_dict)

            if row["Exam Day"] != " ":
                lec_dict = {
                    # "day_string": get_day_string(row["Exam Day"]),
                    "title": get_title(row["Modified Section"], " EXAM"),
                    "full_title": row["Section"],
                    "day": get_day_list(row["Exam Day"]),
                    "location": row["Exam Location"],
                    "start_time": get_time(row["Exam Time"], 0),
                    "end_time": get_time(row["Exam Time"], 1),
                    "de": False,
                    "color": exam_colour
                }
                courses_appts.append(lec_dict)

    return courses_appts


def get_course_conflicts(courses_appts):
    '''Return course conflicts array'''

    conflicts = set()

    for i in range(len(courses_appts)): # pylint: disable=consider-using-enumerate
        for j in range(i + 1, len(courses_appts)):
            course_1 = courses_appts[i]
            course_2 = courses_appts[j]

            course_1_meeting = course_1["title"][-4:]
            course_2_meeting = course_2["title"][-4:]

            if not ((course_1_meeting == "EXAM" and course_2_meeting == "EXAM") or
                (course_1_meeting != "EXAM" and course_2_meeting != "EXAM")):
                continue

            intersection = [value for value in course_1["day"]
                            if value in course_2["day"]]

            if intersection:
                course_1_start = float(
                    course_1["start_time"][0] + "." + course_1["start_time"][1])
                course_1_end = float(
                    course_1["end_time"][0] + "." + course_1["end_time"][1])
                course_2_start = float(
                    course_2["start_time"][0] + "." + course_2["start_time"][1])
                course_2_end = float(
                    course_2["end_time"][0] + "." + course_2["end_time"][1])

                min_end = min(course_1_end, course_2_end)
                max_start = max(course_1_start, course_2_start)

                if min_end > max_start:
                    conflicts.add(course_1["title"])
                    conflicts.add(course_2["title"])

    return list(conflicts)


def get_init_df(csv_path):
    '''Return dataframe with added column consisting Abbreviated Course Subject'''
    df = pd.read_csv(csv_path) # pylint: disable=invalid-name
    temp_df = df[["Section"]]

    #
    # Only keep course abbrev, course code and course section in Section
    #
    for index, row in temp_df.iterrows(): # pylint: disable=unused-variable
        section_list = row["Section"].split("*")
        row["Section"] = section_list[0]
    temp_df = temp_df.rename(columns={"Section": "Abbr Section"})
    df["Abbr Section"] = temp_df["Abbr Section"]
    df["Lec Start"] = ""
    df["Lab Start"] = ""
    df["Sem Start"] = ""
    df["Lec End"] = ""
    df["Lab End"] = ""
    df["Sem End"] = ""
    return df

def get_subject_df(subject, dataframe):
    '''Return selected_df based on subject'''
    if dataframe.empty:
        return dataframe
    selected_df = dataframe.copy()
    if subject != "":
        selected_df = selected_df.loc[selected_df["Abbr Section"] == subject]
    return selected_df


def get_prof_df(prof, dataframe):
    '''Return selected_df based on prof'''
    if dataframe.empty:
        return dataframe
    selected_df = dataframe.copy()
    if prof != "":
        selected_df = selected_df[selected_df["Faculty"].str.contains(prof)]
    return selected_df


def get_de_df(de, dataframe): # pylint: disable=invalid-name
    '''Return selected_df based on DE'''
    if dataframe.empty:
        return dataframe
    selected_df = dataframe.copy()
    if de != "":
        selected_df = selected_df.loc[selected_df["Distance Education"] == de]
    return selected_df


def get_days_df(days, dataframe):
    '''Return selected_df based on days'''
    if dataframe.empty:
        return dataframe
    selected_df = dataframe.copy()
    if len(days) != 0 and len(days) != 5 and "TBA" not in days:
        #
        # Get the dataframe of unselected Lecture Days
        #
        full_days = ["Mon", "Tues",
            "Wed", "Thur", "Fri"]
        diff_days = list(set(full_days) - set(days))
        diff_df = dataframe.copy()
        if len(diff_days) != 0:
            # Slice frames based on each diff day
            df_list = []
            for day in diff_days:
                df_slice = diff_df[(diff_df["Lecture Days"].str.contains(day))]
                if not df_slice.empty:
                    df_list.append(df_slice)
            # Combine sliced frames into final frame
            if len(df_list) != 0:
                diff_df = pd.concat(df_list).drop_duplicates()
            else:
                diff_df = pd.DataFrame()

        #
        # Remove the rows of unselected Lecture Days
        # from original dataframe
        #
        selected_df = selected_df.drop(index=list(diff_df.index.values))
        df_list = []
        # Slice frames based on each selected day
        # for Lab Days and Seminar Days
        # Lecture Days already satisfy at this point
        for day in days:
            df_slice = selected_df[((selected_df["Lab Days"].str.contains(day))\
                                        | (selected_df["Lab Days"] == " "))\
                                    & ((selected_df["Seminar Days"].str.contains(day))\
                                        | (selected_df["Seminar Days"] == " "))]
            if not df_slice.empty:
                df_list.append(df_slice)
        # Combine sliced frames into final frame
        if len(df_list) != 0:
            selected_df = pd.concat(df_list).drop_duplicates()
        else:
            selected_df = pd.DataFrame()
    return selected_df


def get_start_time_df(start_time, dataframe):
    '''Return selected_df based on start_time'''
    if dataframe.empty:
        return dataframe
    selected_df = dataframe.copy()
    if start_time != "":
        time_df = selected_df[["Lecture Time", "Lab Time", "Seminar Time"]]
        in_time = datetime.strptime(start_time, "%I:%M%p")
        out_time = datetime.strftime(in_time, "%H:%M")
        start_time_24 = int(out_time.replace(":", ""))

        #
        # Only keep start time of each column
        #
        for index, row in time_df.iterrows(): # pylint: disable=unused-variable

            time_list = row["Lecture Time"].split(" - ")
            if time_list[0] not in ["", " ", "TBA"]:
                in_time = datetime.strptime(time_list[0], "%I:%M%p")
                out_time = datetime.strftime(in_time, "%H:%M")
                time_24 = out_time.replace(":", "")
                row["Lecture Time"] = int(time_24)
            else:
                row["Lecture Time"] = 9999

            time_list = row["Lab Time"].split(" - ")
            if time_list[0] not in ["", " ", "TBA"]:
                in_time = datetime.strptime(time_list[0], "%I:%M%p")
                out_time = datetime.strftime(in_time, "%H:%M")
                time_24 = out_time.replace(":", "")
                row["Lab Time"] = int(time_24)
            else:
                row["Lab Time"] = 9999

            time_list = row["Seminar Time"].split(" - ")
            if time_list[0] not in ["", " ", "TBA"]:
                in_time = datetime.strptime(time_list[0], "%I:%M%p")
                out_time = datetime.strftime(in_time, "%H:%M")
                time_24 = out_time.replace(":", "")
                row["Seminar Time"] = int(time_24)
            else:
                row["Seminar Time"] = 9999

        time_df = time_df.rename(
            columns={"Lecture Time": "Lec Start",
                "Lab Time": "Lab Start",
                "Seminar Time": "Sem Start"})
        selected_df[["Lec Start", "Lab Start", "Sem Start"]] =\
            time_df[["Lec Start", "Lab Start", "Sem Start"]]

        selected_df = selected_df[(selected_df["Lec Start"] >= start_time_24)\
                                & (selected_df["Lab Start"] >= start_time_24)\
                                & (selected_df["Sem Start"] >= start_time_24)]
    return selected_df


def get_end_time_df(end_time, dataframe):
    '''Return selected_df based on end_time'''
    if dataframe.empty:
        return dataframe
    selected_df = dataframe.copy()
    if end_time != "":
        time_df = selected_df[["Lecture Time", "Lab Time", "Seminar Time"]]
        in_time = datetime.strptime(end_time, "%I:%M%p")
        out_time = datetime.strftime(in_time, "%H:%M")
        end_time_24 = int(out_time.replace(":", ""))

        #
        # Only keep start time of each column
        #
        for index, row in time_df.iterrows(): # pylint: disable=unused-variable

            time_list = row["Lecture Time"].split(" - ")
            if time_list[0] not in ["", " ", "TBA"]:
                in_time = datetime.strptime(time_list[1], "%I:%M%p")
                out_time = datetime.strftime(in_time, "%H:%M")
                time_24 = out_time.replace(":", "")
                row["Lecture Time"] = int(time_24)
            else:
                row["Lecture Time"] = 0

            time_list = row["Lab Time"].split(" - ")
            if time_list[0] not in ["", " ", "TBA"]:
                in_time = datetime.strptime(time_list[1], "%I:%M%p")
                out_time = datetime.strftime(in_time, "%H:%M")
                time_24 = out_time.replace(":", "")
                row["Lab Time"] = int(time_24)
            else:
                row["Lab Time"] = 0

            time_list = row["Seminar Time"].split(" - ")
            if time_list[0] not in ["", " ", "TBA"]:
                in_time = datetime.strptime(time_list[1], "%I:%M%p")
                out_time = datetime.strftime(in_time, "%H:%M")
                time_24 = out_time.replace(":", "")
                row["Seminar Time"] = int(time_24)
            else:
                row["Seminar Time"] = 0

        time_df = time_df.rename(
            columns={"Lecture Time": "Lec End",
                "Lab Time": "Lab End",
                "Seminar Time": "Sem End"})
        selected_df[["Lec End", "Lab End", "Sem End"]] =\
            time_df[["Lec End", "Lab End", "Sem End"]]

        selected_df = selected_df[(selected_df["Lec End"] <= end_time_24)\
                                & (selected_df["Lab End"] <= end_time_24)\
                                & (selected_df["Sem End"] <= end_time_24)]
    return selected_df


def get_final_json(dataframe):
    '''Return final json for getFilteredCourses'''
    #
    # Drop added columns during pruning process
    #
    final_df = dataframe.copy()
    final_df = final_df.drop(
        columns=["Abbr Section", "Lec Start", "Lab Start",
        "Sem Start", "Lec End", "Lab End", "Sem End"])
    # print(final_df)
    if len(final_df.index) > 150:
        final_df = final_df.iloc[0:99]
    result = final_df.to_json(orient="records")
    parsed = json.loads(result)
    final_json = json.dumps(parsed, indent=4)
    # print(final_json)
    return final_json

if __name__ == "__main__":
    app.run(host='0.0.0.0')
