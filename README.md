# boba-smores
Made by a team of students at the University of Melbourne as part of the captstone subject "IT Project" in 2021.

This app is a personal **Customer Relationship Management** (CRM) for our assigned simulated client.
It was designed to aid our client in managing personal and professional contacts to maintain meaningful and productive connections.

### Local Set Up

#### Prerequisites
- Clone repository to local machine

#### Installing dependencies & running app 
1. To download dependencies in backend and frontend:
```
npm run setup
```
2. To download concurrently and other dependencies in the root folder:
```
npm i
```
3. To run the web app, this will start up the back end and front end concurrently:
```
npm run dev
```


### Libraries used
- Iconify
- Material UI
- React Router -> routing
- Concurrently -> to run both back end and front end in one cmd

### App Usage
#### Log in
- Sign in with a Google account

#### Add contact
- Click "Add Contact" on the top right corner 
- Enter information
- Save

Note: 'Last Catchup Date' field is required

#### Edit contact
- Click on desired contact row 
- Make necessary changes
- Save 

#### Sort contacts
- Click on any sortable field header (indicated by sort icon)
- Click again to reverse sorting order

#### Filter by country
- Click on "Filter by country" dropdown
- Select countries to filter
- Click again to close dropdown
- Click dropdown again to reset filter

#### Favourites
- Click the Star icon next to a contact to favourite it
- Click again to unfavourite

### Completed features
- Sorting
- DB connection
- Favourites
- Tags system
- Visual
- Edit and Adding contacts

### Work-in-progress features
- Image uploads

### Potential Improvements
- Faster DB

### Current Hosting - Heroku
https://bobasmorescrm.herokuapp.com/

### Deploy to Heroku
on the main branch**
```
git push heroku main
```

### API Documentation
https://app.getpostman.com/join-team?invite_code=e66e6c773ff62898527f84d4338d7354&ws=79c6a565-aa01-4234-a2f8-3cd7f0227ed5
