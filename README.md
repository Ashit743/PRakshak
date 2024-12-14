# PRakshak

to run front end - 

         cd P_Rakshak
         npm install
         npm run dev

to run backend - 

         cd backend

Setting Up Flask:

Create a Virtual Environment (Optional but highly recommended):

Run the following command to create a virtual environment named venv:
        
        python3 -m venv venv

Activate the virtual environment:
On macOS/Linux:
        
        source venv/bin/activate
On Windows:

        venv\Scripts\activate
Install flask and run

        pip install flask
        flask run

for running ML Model - need to have docker desktop
         
         cd app/api
         docker run -p5050:5050 ash502/mlapp
download the container and run it locally 


deployed-version: some services may not respond need to change hosting platform
         https://prakshak-1.onrender.com




