# CIS\*3760 Team 104 Research

## Sprint 1 Research - Data Structure Implementation

### First Discussion - HashMap

We spent time this sprint discussing which data structure would be best suited to store the course information in memory once parsed. We "jumped the gun" at first, prioritizing efficent searching. At a functional level, our minds jumped to implementing a hashmap to store the parsed JSON information. We thought that a non-indexed approach would be the most efficient way to search the data structure, and we planned on creating a Couse Class that embodies all the information parsed from the parser team. Using screenshare, we roughly wrote some boilerplate, language-agnostic code that ressembled the following:

```
    // already have parsed data

    HashMap<key, Course Class> Courses;

    //loop through JSON Object Array
    for each JSON Object
        Courses.put(JSON Object)

    //get search values
    Courses.get(searchValue)
```

After visualizing this concept in this manner, we quickly scrapped the idea. We could not find a suitable key that would embody all the attributes of a course class, and this implementation, while more efficient to search, would limit the search filters to one chosen key.

## Second Discussion - Array

We then discussed how we could design the data structure in a manner that would allow a high number of filter search options. We still wanted to create a Course Class object, but decided to implement an array to hold these courses over a HashMap/python dictionary. While that means we would have to iterate over the entire data structure to find the course, it allows us to have more filter options. This will lead to a less efficient search but since there are only about a thousand courses, we deemed that this trade off acceptable.

## Class Design

We knew that the class had to hold the basic information that the original WebAdvisor showed, those being **Term, Status, Section, Name and Title, Location, Sections Meeting Information, Faculty, Available/Capacity, Credits and Academic Level.** All these values are implemented in the class, available exactly as they were originally parsed. Yet, we wanted to do some additional parsing of these values to provide more search filter options. We discussed what we, as end users, would want to be able to search by. We added additional parsing functionality to make the following course information available to be searched by:

1. Course Subject
2. Course Code
3. Course Section #
4. Course Name
5. Meeting Lecture
6. Meeting Seminar
7. Meeting Lab
8. Meeting Exam
9. Faculty Last Names
10. Open Spaces
11. Total Spaces

This class design allows high searchability to be implemented from the CLI Search team. Additional parsing utilized python dictionaries, following best pratices, to extract and store the sub-course information.
