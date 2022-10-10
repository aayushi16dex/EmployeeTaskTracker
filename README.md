# EmployeeTaskTracker
I, Aayushi, made this project with my friends Shubham and Divya. This project is about tracking employees tasks.

******** Technologies used **********
MongoDB, Node.js, Express and EJS template, HTML, CSS, Bootstrap, JavaScript


******** Platform used ************
VS Code

******* Project Description *********
On login, an authentication check is performed and it is checked it the user trying to access the portal is registered in the database.
If yes, then their role is checked.
     Role: Admin ==> Admin dashboard is opened
     Role: Employee ==> Employee dashboard is opened
     
**** Employee Dashboard ****
•	There will be two pie charts-
   1.	First pie chart depicts the today task details 
   2.	Second pie chart depicts the previous task details
•	An employee can add multiple tasks using “Add Task” button.
•	There is a profile button, after clicking on it an employee can view their profile and edit their details except their employee ID and email.

**** Admin Dashboard ****
•	There will be a table showing all the employees’ names along with their IDs.
•	An admin has the right to add new employees

********* Salient features **************
Employee IDs will be created automatically by using the following details: year of joining, department and employee number.
E.g: 
            Department: Cyber Security
            Year of joining: 1987
            Employee Number: If there are already 50 employees in cyber security department, then new emp will get emp num as 51
            
            Employee Id will be: 87cys051
