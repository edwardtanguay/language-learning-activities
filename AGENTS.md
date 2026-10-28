# Language Learning Activities 

This is a site where users can create language learning actitivites for themselves, for tandems or for online tutor platforms such as https://preply.com

## Overview

## Site style and design 

- the style for this website is kept simple and clean
- it should not look flashy at all, but more like a "1970s school handout"
- the focus is on language and learning, not impressing the user with fancy design
- it is important that the site work swell in both desktop view and mobile view
	- desktop view should work on tables as well
	- the different is desktop/table = landscape (wider) view, mobile = portrait view
	- 

## Landing Page

- in the root directory there is an index.html
- this file explains the site and gives a list of all activities

## When creating an activity

- for each activity, create a folder in "topics" 
	- give folder a descriptive name, e.g. "regions-of-ecuador"
	- the folder name will be used in the URL, so make it SEO friendly 
- inside the folder, create an index.html file
	- this file will be the main page for the activity 
	- the index.html should contain all the HTML, CSS, and JavaScript for the activity 
	- the index.html should be self-contained 
		- if it references external files, they are on the main website, not local files
		- this enables the activity to be sent to others and opened locally
- so the URL of an activity will look like ...language-learning-activities/topics/regions-of-ecuador
- each language activity is a simply ".html" file with HTML/CSS/JavaScript
- one file per activity
- users create activities via AI skills e.g. /create-text-and-multiple-choice
	- the user can give extra information after the skill, e.g. if an activity should use a certain regional language style, e.g. Latin American Spanish, etc.
	- skills can require certain information so that if the information is not provided, the skill asks for it e.g. target language, skill level (B1, B2), topic 
- each activity is a self-contained .html file that can be sent via messaging/mail etc.
	- if the language activities use media such as images or audio files, then these are links that reference online files on the published website, not local files
	- this enables the activities to be sent to others and opened locally
	- these exercises are static, but they can use localstorage to record progress if desired
		- if localstorage is used, then an option to reset the data is included on the activity 
- each activity is created in a directory called "topics" 

## Skills

- make sure you write in every skill that it does NOT have to check its work by opening up a browser
	- this takes too long
	- the users can test it themselves


## Activities

- for questions created in the activities 
	- they should be how/why questions which lead to deeper language use
	- they should not be simple questions that can be answered with one or two words
	- they should encourage critical thinking and creativity
	- they should be open-ended and allow for multiple responses
	- they should be appropriate for the target language and skill level
	- also encourage learners to give reasons, examples, and to describe things in detail
