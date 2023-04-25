# artsy
CPSC 484 Final Project: Skribbl (by Group 11)

Instructions of Use
Hello everyone! Welcome to Skribbl! Skribbl is a Kinect-based drawing application designed for the everyday pedestrian on Yale's campus. It is used as an outlet for releasing stress, by making easy sketches with various prompts describing a variety of emotions one might experience. We are hoping for this to be a cathartic experience in which one is able to release stress and connect with the Yale community by viewing your friend’s emotional release sketches. 

Running the Project
Our group has already uploaded our project onto the kinect display (TV-2 in the CEID) so you can directly access the project by selecting “artsy” project in the display. 

Motivations and Problem Solving
Skribbl addresses the stress and mental health issues faced by students. The tasks it offers to provide a creative outlet for students to relieve stress and engage with others. By allowing students to engage in activities like drawing and doodling, the app helps them take a break from their academic routines and will enable them to express themselves creatively.

By creating a community doodle board, the app also facilitates a sense of connection and community among students, which is essential for their overall well-being. With the rising stress levels and mental health concerns among students, this app provides a platform for them to take care of their mental health fun and engagingly. By providing a solution to the problem of stress and isolation, this app has the potential to positively impact students' lives.

How to Use

The default landing screen is our home screen which displays a dynamic gallery of various sketches from the students at Yale. If you wish to view paintings made by other users, feel free to stand there and take your time! No rush! However, do be mindful of other people wanting to use the application. If you wish to participate in drawing a sketch with Sketch Pad, raise your arm above your head for 5 seconds. Viola! You've taken the first step towards becoming a Sketch Pad artist. 

Now the screen will present two options to you - you can use either 'Free Draw,' meaning draw anything on your own will, or you can pick a prompt to give you a motivating source for your drawing. If you select a prompt, you may continue with the prompt the application generates or develop a new random prompt to your liking. Once you have decided whether to 'Free Draw' or pick a prompt - here is where the exciting part comes in - the actual drawing! We have also selected the randomly generated prompts to correspond to emotion words like happy, sad, angry etc, hoping for this to be a good way for users to sketch different emotions and relieve stress. 

Your right hand will basically act as a cursor for your paintbrush/sketching tool. Once you have drawn to your heart's content, you may submit the drawing by raising your left hand. Once you have submitted your picture, you can scan a QR code and obtain your image. Furthermore, you may proceed from the QR prompt to the next screen, which will ask for your permission to display your drawing on the home display, which rotates weekly!

Tasks Addressed: 
Task 1: being an avenue for stress relief via providing users with the opportunity to creatively engage and sketch something. The emotive prompts also add to the stress relief as it provides students with very basic and simple prompts to just freely sketch without any real pressure of conforming to a specific shape, size etc
Task 2: The images of various students' art works are accumulated and displayed on the home screen, and this has a nice aesthetic value to the space that the display is placed in, but also helps to break up the day and help students feel more connected with each other.

Constraints from the deployment environment: 
 Latency experienced with initial drawing functionality 
Initially, when we were trying to implement the drawing functionality with the tip of the right hand corresponding to the cursor, since we were updating the screen frame by frame based off the new cursor position this resulted in a lot of lag which made the user experience of drawing pretty poor. It was very difficult to enable to user to accurately draw something. We then pivoted, to just a free style drawing format where the goal was just to freely draw / sketch emotions with hand movements without really having to worry about drawing a perfect shape. The idea was just for it to function as an outlet of stress and low stakes method of drawing

Since we were building an interactive display that's meant for only one user, it was difficult to maintain functionality when there were multiple users detected on the screen. Furthermore, the CEID is a very busy walkway and there are students coming in and out of there very often so we imagine this to be a limitation of our display. One way in which we could have tackled this problem would have been by including depth capabilities so that we could take the person closest to the frame to be the main user and therefore it would still be functional with other passersby in the background 
Collaboration Record: 

Sneha Sivakumar ss3993
Setup git for the team 
Helped set up the basic workflow + organization of files for the display 
Helped design the landing page + stylistic work like the gradient colors and font selection 
Helped setup connection between the kinect display and our code base 
Wrote the basic setup code for the landing screen, pick prompt and or choose random font screen 
Implemented the raise hand to  start drawing functionality and then prompting the move to the next screen
Contributed to our readme file, added in the tasks addressed as well as more details under the how to use section 
Helped debug our functionality 

Ibrahim Asif
Outlined + designed final completion screen
Added the QR code functionality
Added progress bars for all screens
Helped maintain font and cohesiveness of the overall design, standardizing the fonts and maintaining consistency 
Contributed significantly to the README file 
Helped debug our functionality 

Malia Kuo 
Helped design the landing page + stylistic work like the gradient colors and font selection 
Helped improve the UI of our game (landing screens, animations for the start drawing screen) + advising the general color scheme 
Ensured that display looked cohesive, consistent usage of styling to improve the UI/UX of the interactive display
Coded html and javascript pages and animated for the start drawing animation pages
Implemented the raise hand to  start drawing functionality and then prompting the move to the next screen
Helped debug overall functionality 

Bradley Lewis 
Helped setup firebase backend in order to upload pictures and then render them on the landing screen 
Implemented cursor tracking functionality in order to register tracking movements of the user 
Implemented drawing functionality based on cursor movement on the drawing canvas
Worked on the landing screen, adding a dynamic display of the gallery (all the drawings for that week) that pulls from Firebase Storage
Helped implement a reactive progress bar that tracked how long a user was doing a specific task and transitioning to the next screen 
Implemented timer logic for drawing
Helped debug overall functionality 




