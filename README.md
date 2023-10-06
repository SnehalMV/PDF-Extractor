# PDF-Extractor

The purpose of this application is to provide the user with the capability of uploading a pdf file effortlessly, it provides the functionality to extract pages selected by the user into a new pdf file and be able to download it.

The application key features include:
-> User Login and SignUp with form Validation
-> User Authentication using jsonwebtokens
-> User Data storage in MongoDB Atlas
-> PDF file manipulation 
-> Responsive web-design

Prerequsites:
'npm install' to install all dependencies
'npm start' to start the Server
'npm run dev' to start the UI

.env file:
MONGODB_CONNECTION_URI = "mongodb+srv://snehalmv13:snehal123@cluster0.3m04zcw.mongodb.net/pdf-extractor"
JWT_SECRET_KEY = "secret_key"

FRONTEND:
Framework used: REACT leveraging Vite as Bundler
Folder Structure: The folder Structure in the Vite Bundler is as follows :
node_modules
public
src

The src folder contains all the Components, Pages and Assets that are to be rendered along with the utilities used.
It also has the main.jsx, index.html and App.jsx files.

BACKEND:
Framework used: NODE.js
Folder Structure: The Node.js application is structured as follows in the src folder: 
->Model: The business logic is written here, i.e, data storage, retrieval and manipulation using mongoose as ODM lib for MongoDB (used to store User Data).
->Controller: Contollers contain the file where the request handler functions are written, The requests and responses objects of the HTTPS requests are handled in this folder.
->Helpers: Helpers contain the file containing the functions that aid the controllers in completing the request.
->Routes: This folder contains the files containing the routes, here only the user file is present as there are minimal amount of requests 
->Utils: The Utils folder contains the utilities used in the Server sider, It contains the multer confguration &Database connection function

Dependencies Used: 
Frontend:
->pdf-lib: This library is the recommended library for all things pdf, it has several api regarding creating and manipulating pdf files, it was used to find the page count to render checkboxes to provide selection options to user.
->formik: Used to for handling the signup and login forms, The validation process and other processes are made easier
->yup: Used to create the Validation format for the different fields in the form
->axios: Used for making HTTP requests from a web browser or Node.js. It provides a simple and consistent API for performing various HTTP operations

Backend:
Skipping over all the common Dependencies and focusing on pdf-lib
pdf-lib: used in the backend to recieve the file sent as formData where the file was an arraybuffer then converted it to file, it was used to modify the pdf when provided with the SelectedPages array sent from the frontend as FormData,
the library using copyPages, addPages, create, load, save, getPages to do the several functions

![Screenshot (128)](https://github.com/SnehalMV/PDF-Extractor/assets/119581226/6cf2207e-f78f-48c6-aaf0-27ec8f6d0026)
![Screenshot (127)](https://github.com/SnehalMV/PDF-Extractor/assets/119581226/1679f60a-c456-46c6-830a-b2fb3088ce3c)
![Screenshot (126)](https://github.com/SnehalMV/PDF-Extractor/assets/119581226/413e2c2a-34d3-40e1-a3f7-f65223e357c1)
![Screenshot (125)](https://github.com/SnehalMV/PDF-Extractor/assets/119581226/92ac12eb-0089-4ffe-9008-26809bb56a94)



