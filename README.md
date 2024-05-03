
Designed and coded by [Erela](https://linkedin.com/in/erela-yang-snow).

**Table of Contents**
- [Demo of the application](#demo-of-the-application)
- [User story](#user-story)
- [User flows](#user-flows)
- [How to try our app](#how-to-try-our-app)
- [Project Timeline](#project-timeline)
- [Future Directions](#future-directions)

## Demo of the application
Links: 
- [Deployed website](https://heptapod.netlify.app/)
- [Demo video](https://youtu.be/lN2qxyEwniY)

Below are some pictures from web application.

<div style="display: flex; flex-wrap: wrap; justify-content: space-between;">

    Home Page

<img  src="https://hackmd.io/_uploads/Sk7Yv1zz0.png" alt="Homepage1"/>

</div>
 
<div style="display: flex; flex-wrap: wrap; justify-content: space-between;">

    Language Translation (Korean to English)

<img  src="https://hackmd.io/_uploads/Bymtv1GGA.png" alt="Korean to English Translation"/>


</div>
    
    
<div style="display: flex; flex-wrap: wrap; justify-content: space-between;">

    Text to Emoji (aka Emojify)

<img  src="https://hackmd.io/_uploads/HymtPJzzR.png" alt="Emojify process"/>


</div>
        
<div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
    
    Whcn clicking Information Icon on the top-right corner, you will see "how to use heptapod" modal
    
<img src="https://hackmd.io/_uploads/BkmYDkffR.png" alt="Heptapod Intro"/>


</div>

<div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
    
    Whcn clicking Question Icon next to the detected language, you will see "Language Detection Disclaimer" modal

<img src="https://hackmd.io/_uploads/Sk7Kw1zMR.png" alt="Language Detection"/>
    

</div>


## User story

There are three ways to use HEPTAPOD.
```gherkin=
Feature: Text Translation

  Scenario: User wants to detect the original language and translate it
    When I write/paste the original text
    And click translate button
    Then I see corresponding English translated text
    And can revise it if necessary or copy the text

```
```gherkin=
Feature: Emojify translated English Text

  Scenario: User wants to generate emojis corresponding translated English text
    When I click Emojify button 
    Then I see sequence of emojis with ending punctuation marks that match English text
    And can revise it using Emoji keypad if necessary or copy the emoji sequences
```
```gherkin=
Feature: Emojify English Text

  Scenario: User wants to generate emojis corresponding English text
    Given I did not user translation
    When I write/paste the English text 
    And I click Emojify button
    Then I see sequence of emojis with ending punctuation marks that match English text
    And can revise it using Emoji keypad if necessary or copy the emoji sequences
```


## User flows
---

In the following user flows, we show 

- 3 features
    - A: Translate a text to English text
    - B: Generate Emojis based on English Text
    - C: Add glossary

```mermaid
sequenceDiagram
User->>HEPTAPOD: A1. Write/paste original text

User ->>HEPTAPOD: A2. Click "Translate" button

HEPTAPOD ->> Google Translate API: A3. Pass original text to translate

Note right of Google Translate API: A4. Detect Language
Note right of Google Translate API: A5. Translate text to English

Google Translate API ->> HEPTAPOD: A6. Pass detected language & translated English text

HEPTAPOD ->> Google Translate API: A7. Pass original text to translate

User->>HEPTAPOD: A8. Modify translated English text if necessary

User->>HEPTAPOD: B1. Write/paste English text 

User ->>HEPTAPOD: B2. Click "Emojify" button


Note right of HEPTAPOD: B3. Create prompt based on English text input

HEPTAPOD ->> Gemini API: B4. Pass the prompt  

Note right of Gemini API: B5. Generate response

Gemini API ->> HEPTAPOD: B6. Pass the response 

Note right of HEPTAPOD: B7. Clean up and show Emoji sequences

User->>HEPTAPOD: B8. Modify Emoji sequences using emoji keypad if necessary


User->>HEPTAPOD: C1. Click "fly button" below English text input field

Note right of HEPTAPOD: C2. Store original-English text pair for glossary/translation quality improvement

```

## How to try our app

Follow the following 5 steps to try our web application locally.

1. Clone our repository `git clone <url>`
2. In heptapod repo, create .env file and store these variables:
    - `GOOGLE_GEMINI_API_KEY`
    - `GOOGLE_PROJECT_ID`

3. In the same repo, run `npm install` to install dependencies
4. Then, run `npm start` to start the backend of the app
5. Run `cd frontend` to move to frontend section
6.  `npm install` to install dependencies
7.  Run`npm start` to start the app and you can check the results on http://127.0.0.1:3000/ in your browser




## Project Timeline
---
Here is rough timeline of project

```mermaid
gantt
    dateFormat YYYY-MM
        axisFormat %b
        
    section Market Research
        Product Research:a1, 2024-03-10, 3w
        Idea Feedback: 2024-03-20, 1w
        
    section Coding
        Frontend : 2024-04-01, 2w
        Backend :2024-04-05, 2w
        
    Final Submission: milestone, m1, 2024-05-02, 1m
```


## Future Directions
---

If I have more time to develop, here are some  features that could be meaningful to implement on top of the current version.
- Use accumulated glossary to tune language model
- Highlight corresponding sentences in both the emoji and original input text to enhance comprehension and usability
- Integrating dictionaries into the English text, like Papago translation does, to aid users in understanding nuanced meanings and expressions 

<div style="display: flex; flex-wrap: wrap; justify-content: space-between;">

    Korean dictionary appears when I highlighted Korean word on Papago

<img  src="https://hackmd.io/_uploads/ByRvflMMC.png" alt="Papago - dictionary"/>

</div>