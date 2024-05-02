Vite + Flask - https://dev.to/tylerlwsmith/build-a-vite-5-backend-integration-with-flask-jch


# Notes

class JobApplication():
      applied_date: int
      stage: str
      used_custom_cover_letter: bool


well you can also just use a csv doesn't need to be google sheets

you should be storing each job application in a row in the sheet.

the csv is your database essentially

You should also create views in the flask app to : 
Add a new application
Update an existing application
See existing applications

Create some data views too

See all your funnel metrics. 
See how custom cover letters compare to non custom cover letters
etc

so that you can go to.  /metrics and see some breakdowns

# Tasks
[ ] - create spreadsheet if not exists
[ ] - add rows 