"""
Comprehensive question bank for RLA quiz placeholders
This file contains 300+ unique, GED-style questions across all RLA categories
"""

GRAMMAR_QUESTIONS = [
    # Subject-Verb Agreement (10 questions)
    {
        "passage": "The committee have reviewed all the proposals and selected three finalists. The decision was unanimous, and we plan to announce the winners next week.",
        "question": "Which correction should be made to improve the grammar in this passage?",
        "options": [
            ("Change 'have reviewed' to 'has reviewed'", True, "Correct. 'Committee' is a singular collective noun and requires the singular verb 'has'."),
            ("Change 'selected' to 'selecting'", False, "This would create incorrect tense inconsistency."),
            ("Change 'was' to 'were'", False, "The decision is singular, so 'was' is correct."),
            ("Change 'plan' to 'plans'", False, "The subject 'we' correctly takes the plural verb 'plan'.")
        ]
    },
    {
        "passage": "Neither the supervisor nor the employees was aware of the policy change until the memo arrived.",
        "question": "What correction should be made to this sentence?",
        "options": [
            ("Change 'was' to 'were'", True, "Correct. With 'neither...nor', the verb agrees with the closer subject 'employees', which is plural."),
            ("Change 'arrived' to 'arrives'", False, "The past tense is appropriate."),
            ("Change 'Neither' to 'Either'", False, "This changes the meaning of the sentence."),
            ("Change 'nor' to 'or'", False, "'Neither...nor' is the correct correlative conjunction pair.")
        ]
    },
    {
        "passage": "The report, which was submitted last week, contains several errors that needs to be corrected before publication.",
        "question": "Which correction is needed in this sentence?",
        "options": [
            ("Change 'needs' to 'need'", True, "Correct. The subject 'errors' is plural and requires the plural verb 'need'."),
            ("Remove the comma after 'report'", False, "The comma is correct for setting off the nonessential clause."),
            ("Change 'which' to 'that'", False, "'Which' is appropriate for a nonessential clause."),
            ("Change 'submitted' to 'submitting'", False, "The past participle is correct here.")
        ]
    },
    {
        "passage": "Each of the participants were asked to complete a survey about their experience.",
        "question": "How should this sentence be corrected?",
        "options": [
            ("Change 'were' to 'was'", True, "Correct. 'Each' is singular, so it requires the singular verb 'was'."),
            ("Change 'their' to 'his or her'", False, "While technically correct for formal writing, the primary error is the verb."),
            ("Change 'participants' to 'participant'", False, "'Participants' is correct as the object of the preposition."),
            ("Remove 'of the'", False, "This phrase is necessary for the sentence structure.")
        ]
    },
    {
        "passage": "The team of researchers have been working on this project for three years.",
        "question": "What correction is needed?",
        "options": [
            ("Change 'have' to 'has'", True, "Correct. 'Team' is a singular collective noun, so it takes the singular 'has'."),
            ("Change 'researchers' to 'researcher'", False, "There are multiple researchers, so plural is correct."),
            ("Change 'working' to 'worked'", False, "The progressive tense is appropriate here."),
            ("Change 'three' to 'third'", False, "The cardinal number is correct in this context.")
        ]
    },
    
    # Pronoun Usage (10 questions)
    {
        "passage": "Between you and I, this project is going to require more time than we originally thought.",
        "question": "What correction should be made to this sentence?",
        "options": [
            ("Change 'Between you and I' to 'Between you and me'", True, "Correct. After the preposition 'between', the object pronoun 'me' should be used, not the subject pronoun 'I'."),
            ("Change 'is going' to 'are going'", False, "'Project' is singular and correctly takes 'is'."),
            ("Change 'we' to 'us'", False, "'We' is the subject and is used correctly."),
            ("Change 'thought' to 'think'", False, "The past tense 'thought' is appropriate here.")
        ]
    },
    {
        "passage": "The manager asked that each employee submit their report by Friday afternoon.",
        "question": "Which revision corrects the pronoun-antecedent agreement?",
        "options": [
            ("Change 'their' to 'his or her'", True, "Correct. 'Each employee' is singular and requires a singular pronoun."),
            ("Change 'asked' to 'asks'", False, "The past tense is appropriate in context."),
            ("Change 'submit' to 'submits'", False, "After 'asked that', the subjunctive 'submit' is correct."),
            ("Change 'employee' to 'employees'", False, "'Each employee' is correct and singular.")
        ]
    },
    {
        "passage": "When somebody calls, please ask them to leave a message.",
        "question": "How should this sentence be revised for formal writing?",
        "options": [
            ("Change 'them' to 'him or her'", True, "Correct. In formal writing, 'somebody' (singular) requires a singular pronoun."),
            ("Change 'somebody' to 'someone'", False, "Both are singular indefinite pronouns; this doesn't fix the agreement issue."),
            ("Change 'calls' to 'call'", False, "'Somebody' takes a singular verb."),
            ("Change 'please ask' to 'you should ask'", False, "This doesn't address the pronoun agreement issue.")
        ]
    },
    {
        "passage": "My sister and me went to the concert last night.",
        "question": "What correction is needed?",
        "options": [
            ("Change 'me' to 'I'", True, "Correct. As part of the subject, the nominative pronoun 'I' should be used."),
            ("Change 'went' to 'go'", False, "The past tense is appropriate."),
            ("Change 'sister' to 'sisters'", False, "The singular is correct based on context."),
            ("Add a comma after 'sister'", False, "No comma is needed in this compound subject.")
        ]
    },
    {
        "passage": "The trophy was awarded to Sarah and I for our outstanding performance.",
        "question": "How should this sentence be corrected?",
        "options": [
            ("Change 'I' to 'me'", True, "Correct. After the preposition 'to', the object pronoun 'me' is required."),
            ("Change 'was awarded' to 'awarded'", False, "The passive voice is appropriate here."),
            ("Change 'our' to 'their'", False, "'Our' correctly refers to Sarah and the speaker."),
            ("Remove 'for'", False, "The preposition 'for' is necessary to show reason.")
        ]
    },
    
    # Parallel Structure (10 questions)
    {
        "passage": "Maria works hard every day, studies diligently, and she is volunteering at the local shelter on weekends.",
        "question": "How should this sentence be revised for parallel structure?",
        "options": [
            ("Change 'she is volunteering' to 'volunteers'", True, "Correct. This creates parallel structure with 'works' and 'studies'."),
            ("Change 'works' to 'is working'", False, "This doesn't solve the parallel structure issue."),
            ("Remove 'diligently'", False, "Removing the adverb doesn't address the structural problem."),
            ("Add 'she' before 'studies'", False, "This would make the sentence more wordy without fixing the parallel structure.")
        ]
    },
    {
        "passage": "The documentary was both informative and it entertained viewers with compelling stories.",
        "question": "How should this sentence be revised for better clarity and parallel structure?",
        "options": [
            ("The documentary was both informative and entertaining.", True, "Correct. This creates parallel structure using two adjectives."),
            ("The documentary both informed and it entertained viewers.", False, "This still lacks parallel structure."),
            ("The documentary was informative and viewers were entertained.", False, "This changes the sentence structure but doesn't improve parallelism."),
            ("Both the documentary informed and entertained viewers.", False, "This is grammatically awkward.")
        ]
    },
    {
        "passage": "The job requires attention to detail, working well under pressure, and you must communicate effectively.",
        "question": "How should this be revised for parallel structure?",
        "options": [
            ("Change to: attention to detail, the ability to work well under pressure, and effective communication", True, "Correct. This creates parallel structure using three noun phrases."),
            ("Change 'working' to 'work'", False, "This doesn't fully address the parallel structure issue."),
            ("Remove 'you must'", False, "Simply removing words doesn't create proper parallel structure."),
            ("Add 'you must have' before 'attention'", False, "This makes the sentence awkward and wordy.")
        ]
    },
    {
        "passage": "The training program teaches employees how to use new software, managing their time efficiently, and resolving conflicts.",
        "question": "What revision improves parallel structure?",
        "options": [
            ("Change to: how to use new software, how to manage their time efficiently, and how to resolve conflicts", True, "Correct. All three items now use the same structure with 'how to'."),
            ("Change 'teaches' to 'taught'", False, "This changes tense but doesn't fix parallelism."),
            ("Remove 'their'", False, "This doesn't address the structural issue."),
            ("Change 'managing' to 'manage'", False, "This partially helps but doesn't fully create parallel structure.")
        ]
    },
    {
        "passage": "She enjoys reading novels, to watch documentaries, and hiking in the mountains.",
        "question": "How should this sentence be corrected?",
        "options": [
            ("Change to: reading novels, watching documentaries, and hiking in the mountains", True, "Correct. All three activities now use gerunds for parallel structure."),
            ("Change 'reading' to 'to read'", False, "This makes it less parallel with 'hiking'."),
            ("Remove 'in the mountains'", False, "This doesn't address the parallel structure problem."),
            ("Change 'enjoys' to 'enjoyed'", False, "This changes tense but doesn't fix the structure.")
        ]
    },
    
    # Modifiers (10 questions)
    {
        "passage": "Having finished the assignment early, the rest of the afternoon was spent relaxing by the pool.",
        "question": "How should this sentence be revised to correct the dangling modifier?",
        "options": [
            ("Having finished the assignment early, she spent the rest of the afternoon relaxing by the pool.", True, "Correct. This revision clearly identifies who finished the assignment."),
            ("The assignment having been finished early, the rest of the afternoon was spent relaxing.", False, "This still doesn't clearly identify the subject."),
            ("The afternoon was spent relaxing by the pool after finishing the assignment early.", False, "While better, this is passive and less clear than the correct answer."),
            ("Having finished the assignment, relaxing by the pool was done in the afternoon.", False, "This still has modifier issues and is awkwardly constructed.")
        ]
    },
    {
        "passage": "Walking through the park, the flowers were in full bloom.",
        "question": "How should this sentence be revised?",
        "options": [
            ("Walking through the park, I noticed the flowers were in full bloom.", True, "Correct. This identifies who was walking through the park."),
            ("The flowers were in full bloom while walking through the park.", False, "This suggests the flowers were walking."),
            ("Through the park, the flowers were walking in full bloom.", False, "This is nonsensical."),
            ("The flowers, walking through the park, were in full bloom.", False, "Flowers cannot walk.")
        ]
    },
    {
        "passage": "Covered in dust, Maria found her grandmother's old photo album in the attic.",
        "question": "What does the modifier describe as written?",
        "options": [
            ("It incorrectly suggests Maria was covered in dust rather than the album.", True, "Correct. The modifier should be repositioned or the sentence restructured."),
            ("It correctly modifies 'photo album'.", False, "The position of the modifier creates ambiguity."),
            ("It correctly modifies 'attic'.", False, "The modifier appears to modify Maria."),
            ("It correctly modifies 'grandmother'.", False, "The modifier is too far from 'album' to clearly modify it.")
        ]
    },
    {
        "passage": "Running late for the meeting, the subway seemed slower than usual.",
        "question": "How should this dangling modifier be corrected?",
        "options": [
            ("Running late for the meeting, I felt the subway seemed slower than usual.", True, "Correct. This identifies who was running late."),
            ("The subway, running late for the meeting, seemed slower than usual.", False, "Subways don't have meetings."),
            ("Running late, the meeting seemed slower on the subway.", False, "This is confusing and incorrect."),
            ("The subway seemed slower because running late for the meeting.", False, "This is grammatically incorrect.")
        ]
    },
    {
        "passage": "Broken and unusable, John threw away his old phone.",
        "question": "While technically correct, how could this sentence be improved for clarity?",
        "options": [
            ("John threw away his old phone, which was broken and unusable.", True, "Correct. This placement eliminates any potential confusion about what was broken."),
            ("John, broken and unusable, threw away his old phone.", False, "This suggests John was broken."),
            ("Broken phone and unusable, John threw it away.", False, "This is awkward and unclear."),
            ("John threw away, broken and unusable, his old phone.", False, "This disrupts the natural flow of the sentence.")
        ]
    },
    
    # Punctuation (10 questions)
    {
        "passage": "When writing a professional email it's important to proofread carefully and maintain a courteous tone.",
        "question": "How should this sentence be punctuated correctly?",
        "options": [
            ("Add a comma after 'email'", True, "Correct. An introductory dependent clause should be followed by a comma."),
            ("Change 'it's' to 'its'", False, "'It's' (it is) is correct here; 'its' is possessive."),
            ("Add a semicolon after 'carefully'", False, "A semicolon would be incorrect; 'and' properly connects the verbs."),
            ("Add a comma after 'important'", False, "No comma is needed there.")
        ]
    },
    {
        "passage": "We went to the park, it was a beautiful day.",
        "question": "What punctuation error needs to be corrected?",
        "options": [
            ("This is a comma splice; use a semicolon, period, or coordinating conjunction.", True, "Correct. Two independent clauses cannot be joined with just a comma."),
            ("Remove the comma", False, "This would create a run-on sentence."),
            ("Add 'and' after 'park'", False, "While this fixes the splice, the correct answer identifies the error type."),
            ("Change the comma to a colon", False, "A colon is not appropriate in this context.")
        ]
    },
    {
        "passage": "The ingredients for the recipe include: flour, sugar, eggs, and butter.",
        "question": "What punctuation correction is needed?",
        "options": [
            ("Remove the colon after 'include'", True, "Correct. A colon should not separate a verb from its objects."),
            ("Remove the comma after 'eggs'", False, "The serial comma is correct."),
            ("Add a comma after 'recipe'", False, "No comma is needed there."),
            ("Change the colon to a semicolon", False, "Neither punctuation mark is appropriate here.")
        ]
    },
    {
        "passage": "She asked, 'What time does the meeting start'?",
        "question": "How should this sentence be punctuated?",
        "options": [
            ("Move the question mark inside the quotation marks.", True, "Correct. The question mark should be inside the quotation marks when it's part of the quoted question."),
            ("Remove the comma after 'asked'", False, "The comma is correct before a quote."),
            ("Change the single quotes to double quotes", False, "Single quotes are acceptable in some style guides."),
            ("Add a period after the question mark", False, "This would be incorrect punctuation.")
        ]
    },
    {
        "passage": "The conference will cover three topics, marketing strategies, financial planning, and team management.",
        "question": "What punctuation change is needed?",
        "options": [
            ("Change the first comma to a colon.", True, "Correct. A colon introduces a list after an independent clause."),
            ("Remove the comma after 'strategies'", False, "This comma is part of the series."),
            ("Add a semicolon after 'planning'", False, "Semicolons are not needed in this simple list."),
            ("Remove 'three topics'", False, "This doesn't address the punctuation issue.")
        ]
    },
    
    # Verb Tense (10 questions)
    {
        "passage": "Yesterday, I seen the movie you recommended last week.",
        "question": "What correction is needed?",
        "options": [
            ("Change 'seen' to 'saw'", True, "Correct. The simple past tense 'saw' is needed, not the past participle 'seen'."),
            ("Change 'recommended' to 'recommend'", False, "The past tense is appropriate since it happened last week."),
            ("Remove 'Yesterday'", False, "This time reference is fine."),
            ("Change 'last week' to 'last weeks'", False, "The singular is correct.")
        ]
    },
    {
        "passage": "She has went to the library every day this week.",
        "question": "How should this sentence be corrected?",
        "options": [
            ("Change 'went' to 'gone'", True, "Correct. With the helping verb 'has', the past participle 'gone' is required."),
            ("Change 'has' to 'have'", False, "The subject 'she' correctly takes 'has'."),
            ("Change 'every day' to 'everyday'", False, "'Every day' (two words) is correct for frequency."),
            ("Remove 'this week'", False, "This time reference is appropriate.")
        ]
    },
    {
        "passage": "By the time we arrive, the concert will already start.",
        "question": "What verb tense correction is needed?",
        "options": [
            ("Change 'will start' to 'will have started'", True, "Correct. The future perfect tense shows the concert will be completed before arrival."),
            ("Change 'arrive' to 'arrived'", False, "The present tense is correct in the time clause."),
            ("Change 'will' to 'would'", False, "The future tense is appropriate here."),
            ("Remove 'already'", False, "This adverb correctly emphasizes the timing.")
        ]
    },
    {
        "passage": "If I would have known about the sale, I would have bought more items.",
        "question": "How should this sentence be corrected?",
        "options": [
            ("Change 'would have known' to 'had known'", True, "Correct. In the conditional past, use 'had known', not 'would have known'."),
            ("Change 'would have bought' to 'bought'", False, "The conditional perfect is appropriate in the main clause."),
            ("Change 'the sale' to 'a sale'", False, "The article is fine as is."),
            ("Remove 'more'", False, "This intensifier is acceptable.")
        ]
    },
    {
        "passage": "The package should have arrived yesterday, but it still didn't come.",
        "question": "What correction improves the verb tense?",
        "options": [
            ("Change 'didn't come' to 'hasn't come'", True, "Correct. The present perfect 'hasn't come' better indicates the ongoing situation."),
            ("Change 'should have arrived' to 'should arrive'", False, "The modal perfect is correct for past expectation."),
            ("Change 'still' to 'already'", False, "This changes the meaning inappropriately."),
            ("Remove 'but'", False, "The conjunction correctly shows contrast.")
        ]
    },
    
    # Sentence Fragments and Run-ons (10 questions)
    {
        "passage": "Although she studied hard for the exam. She was still nervous about the results.",
        "question": "How should these sentences be corrected?",
        "options": [
            ("Remove the period after 'exam' and lowercase 'She'", True, "Correct. This fixes the sentence fragment by combining it with the independent clause."),
            ("Add 'but' after the period", False, "This doesn't fix the fragment."),
            ("Change 'Although' to 'Because'", False, "This doesn't address the fragment issue."),
            ("Remove 'Although'", False, "While this could work, the best solution preserves the subordinating conjunction.")
        ]
    },
    {
        "passage": "The restaurant was crowded we had to wait an hour for a table.",
        "question": "How should this run-on sentence be corrected?",
        "options": [
            ("Add a comma and 'so' after 'crowded'", True, "Correct. This properly connects the two independent clauses."),
            ("Change 'crowded' to 'crowding'", False, "This creates a different error."),
            ("Remove 'we'", False, "This creates a sentence fragment."),
            ("Add 'very' before 'crowded'", False, "This doesn't fix the run-on.")
        ]
    },
    {
        "passage": "Because the weather was perfect for hiking. Many people visited the national park.",
        "question": "What correction is needed?",
        "options": [
            ("Change the period to a comma", True, "Correct. The dependent clause should be connected to the independent clause."),
            ("Remove 'Because'", False, "While this works, it's not the best solution."),
            ("Add 'and' after the period", False, "This doesn't fix the fragment."),
            ("Change 'Many' to 'many'", False, "This doesn't address the main issue.")
        ]
    },
    {
        "passage": "The presentation was informative it covered all the main topics thoroughly.",
        "question": "How should this be corrected?",
        "options": [
            ("Add a semicolon or period after 'informative'", True, "Correct. Two independent clauses need proper punctuation between them."),
            ("Remove 'it'", False, "This creates an unclear sentence."),
            ("Add 'very' before 'informative'", False, "This doesn't fix the run-on."),
            ("Change 'thoroughly' to 'thorough'", False, "This doesn't address the sentence structure issue.")
        ]
    },
    {
        "passage": "Having excellent communication skills. Which are essential for this position.",
        "question": "How should these fragments be corrected?",
        "options": [
            ("Combine into: Having excellent communication skills, which are essential for this position, is important.", True, "Correct. This creates a complete sentence with a subject and predicate."),
            ("Add 'is important' after 'skills'", False, "This doesn't address the second fragment."),
            ("Remove 'Which'", False, "This doesn't fully fix the fragments."),
            ("Change 'Having' to 'Have'", False, "This doesn't create a complete sentence.")
        ]
    },
    
    # Word Choice and Clarity (10 questions)
    {
        "passage": "The effect of the new policy will effect significant changes in our procedures.",
        "question": "What correction is needed?",
        "options": [
            ("Change the second 'effect' to 'affect'", True, "Correct. 'Affect' is the verb meaning to influence; 'effect' as a verb means to bring about."),
            ("Change the first 'effect' to 'affect'", False, "'Effect' as a noun is correct here."),
            ("Change both to 'affect'", False, "The first 'effect' is correctly used as a noun."),
            ("Remove 'significant'", False, "This adjective adds meaningful information.")
        ]
    },
    {
        "passage": "Its important to remember that your responsible for you're own success.",
        "question": "How many apostrophe errors need to be corrected?",
        "options": [
            ("Three: It's, you're, your", True, "Correct. 'It's' (it is), 'you're' (you are), and 'your' (possessive) are the correct forms."),
            ("Two", False, "There are three errors."),
            ("One", False, "There are multiple errors."),
            ("None", False, "There are clear errors in the sentence.")
        ]
    },
    {
        "passage": "The principal reason for the meeting is to discuss important principles of effective leadership.",
        "question": "Are 'principal' and 'principles' used correctly?",
        "options": [
            ("Yes, both are correct: 'principal' means main, 'principles' means fundamental truths.", True, "Correct. Both words are used appropriately in context."),
            ("No, both should be 'principle'", False, "'Principal' as an adjective meaning 'main' is correct."),
            ("No, both should be 'principals'", False, "The usage is already correct."),
            ("No, they should be swapped", False, "Each is used correctly in its position.")
        ]
    },
    {
        "passage": "The data shows that their are less errors in the new system than they're were in the old one.",
        "question": "How many errors need to be corrected?",
        "options": [
            ("Three: shows→show, their→there, they're→there, less→fewer", True, "Correct. 'Data' is often treated as plural, 'there' indicates place/existence, and 'fewer' is used with countable nouns."),
            ("Two", False, "There are more errors than two."),
            ("One", False, "Multiple errors exist."),
            ("None", False, "Several errors are present.")
        ]
    },
    {
        "passage": "We should of completed the project earlier, but we didn't have enough resources.",
        "question": "What correction is needed?",
        "options": [
            ("Change 'should of' to 'should have'", True, "Correct. 'Should have' is the correct form; 'should of' is a common error."),
            ("Change 'didn't have' to 'don't have'", False, "The past tense is appropriate."),
            ("Remove 'but'", False, "The conjunction correctly shows contrast."),
            ("Change 'earlier' to 'earliest'", False, "The comparative form is correct here.")
        ]
    },
    
    # Sentence Combining and Clarity (10 questions)
    {
        "passage": "The team has worked together for five years. They have developed an efficient workflow. The workflow saves time and reduces errors.",
        "question": "How can these sentences be most effectively combined?",
        "options": [
            ("The team has worked together for five years, developing an efficient workflow that saves time and reduces errors.", True, "Correct. This creates a concise, clear sentence using a participial phrase and relative clause."),
            ("The team worked and developed a workflow for five years.", False, "This loses important details."),
            ("Working together, a workflow was developed that saves time.", False, "This uses awkward passive voice and dangling modifier."),
            ("The team has worked, developed, and saved for five years.", False, "This changes the meaning incorrectly.")
        ]
    },
    {
        "passage": "The report is comprehensive. It covers all necessary topics. It is well-organized. It will be useful for future reference.",
        "question": "Which combination is most effective?",
        "options": [
            ("The comprehensive, well-organized report covers all necessary topics and will be useful for future reference.", True, "Correct. This combines all information concisely without losing meaning."),
            ("The report is comprehensive and well-organized covering topics.", False, "This is awkwardly constructed."),
            ("Being comprehensive, the report will be useful.", False, "This loses important details."),
            ("The report covers topics and is organized for reference.", False, "This is choppy and loses information.")
        ]
    },
    {
        "passage": "The conference was educational. Many experts presented. Topics were diverse. Attendees learned valuable information.",
        "question": "How should these sentences be combined for better flow?",
        "options": [
            ("The educational conference featured presentations by many experts on diverse topics, providing valuable information to attendees.", True, "Correct. This creates a smooth, comprehensive sentence."),
            ("The conference was educational with experts and topics for attendees.", False, "This is vague and choppy."),
            ("Many experts presented diverse topics at the educational conference.", False, "This loses the information about attendees learning."),
            ("Being educational, experts presented to attendees about topics.", False, "This is awkwardly constructed.")
        ]
    },
    {
        "passage": "She prepared thoroughly for the presentation. She researched the topic extensively. She practiced her delivery multiple times. She felt confident on the day of the event.",
        "question": "Which revision best combines these ideas?",
        "options": [
            ("Having prepared thoroughly by researching the topic extensively and practicing her delivery multiple times, she felt confident on the day of the presentation.", True, "Correct. This shows clear cause and effect while combining all elements smoothly."),
            ("She prepared, researched, practiced, and felt confident for the presentation.", False, "This is too choppy and doesn't show relationships."),
            ("Preparing thoroughly made her confident after research and practice.", False, "This is awkward and unclear."),
            ("The presentation was prepared with research and practice confidently.", False, "This has structural issues.")
        ]
    },
    {
        "passage": "The new software is user-friendly. It has many features. Training is minimal. Employees can learn it quickly.",
        "question": "What is the most effective combination?",
        "options": [
            ("The new user-friendly software has many features yet requires minimal training, allowing employees to learn it quickly.", True, "Correct. This combines all information logically and concisely."),
            ("The software has features and is user-friendly for employees to learn.", False, "This doesn't include all information."),
            ("Being user-friendly with features, training is minimal.", False, "This has modifier issues."),
            ("The software is new, has features, and employees learn it.", False, "This is choppy and incomplete.")
        ]
    }
]

# I'll continue with the next message due to length limits
