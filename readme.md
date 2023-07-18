# Event Book

## Overview

The Event Book Platform is a web application that allows users to create and manage events. Users can create events and set the event details. The platform aims to simplify event organization and facilitate seamless communication between event organizers and attendees.

## Distinctiveness and Complexity

The Event Management Platform stands out from other projects in the course due to its comprehensive features and user-friendly interface. It incorporates the following unique aspects:

- **User Roles**: The platform differentiates between event organizers and attendees, providing distinct functionalities for each role. Organizers can create events, manage attendees, and view event statistics, while attendees can respond to events and interact with event comments.

- **Privacy Settings**: Events can be set as public, private, and friends-only, allowing organizers to control event visibility and attendee access.

- **Interactivity**: The platform includes interactive features like event responses, comments, and providing a dynamic user experience.

- **Sophisticated Models**: The project utilizes complex database models, including ManyToMany relationships to handle event attendees and user interactions.

## File Descriptions

- `manage.py`: The Django management script.
- `eventbook/`: The main Django app directory containing project settings and URLs.
- `event/models.py`: Defines the database models for events, users, and comments.
- `event/views.py`: Contains the views for handling user requests and rendering templates.
- `templates/`: Directory containing HTML templates for rendering the user interface.
- `static/`: Directory holding static files like CSS, JavaScript, and react components.

## How to Run the Application

To run the Event Management Platform on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/your_username/your_project.git`.
2. Apply migrations: `python manage.py migrate`.
3. Create a superuser to access the admin panel: `python manage.py createsuperuser`.
4. Start the development server: `python manage.py runserver`.
5. Access the application in your web browser at `http://127.0.0.1:8000/`.

## User Guide

Registration:

1. To get started, navigate to the registration page by clicking on the "Register" link.

2. On the registration page, fill in the required information, including your desired username, email address, and a strong password.

3. Click the "Register" button to submit the registration form.

4. Upon successful registration, you will be redirected to the login page automatically.

Login:

1. To log in to your account, go to the login page by clicking on the "Login" link in the top navigation menu.

2. Enter your registered username or email address and the associated password.

3. Click the "Login" button to access your account.


Creating Events:

1. Once logged in, you can create a new event by clicking on the "Create Event" button in the top navigation menu.

2. Fill in the event details, such as the event title, date, time, location, description, and privacy settings (public, private, or friends-only).

3. Click the "Create Event" button to save your event.

Viewing Event Details:

1. To view event details, browse the list of events on the platform.

2. Click on the event you are interested in to access its details page.

3. On the event details page, you can see all the information about the event, including the title, date, time, location, description, and privacy settings.

Sidebar Navigation:

The sidebar contains the following options:

    1. Home: Click on "Home" to go back to the main page displaying all events.

    2. Going: Click on "Going" to view events you have responded to with "Going."

    3. Interested: Click on "Interested" to view events you have responded to with "Interested."
    
    4. Hosting: Click on "Hosting" to view events you have created and are currently hosting.



## Dependencies

[If your project has specific dependencies, list them here along with their version numbers.]

## Additional Information

[Include any other relevant information about your project that the staff should know.]

## Acknowledgments

[List any third-party libraries, code snippets, or tutorials that you used in your project.]

## Contact Information

[Optional: Provide your contact information or GitHub profile link for feedback and collaboration.]
