# world-disaster-risk-visualization
World disaster risk visualization.


# Overview
Our website showcases the risk of extreme natural events becoming a disaster from 2011-2021 in 181 countries across the world. Using the data from the World Disaster Risk Dataset from Kaggle, we will visualize the World Risk Index on each country by year. A second visualization will show 5 factors that go into making the World Disaster Risk each year by country. And lastly, we will visualize the World Risk Index category rank out of the 181 countries.




## Contributers (Group 7)
* Hyeeun Hughes
* Lief Herzfeld
* Jacob McManaman
* Sarah Stoffel



## Contents
* World Disaster Risk (148.41 kB): https://www.kaggle.com/datasets/tr1gg3rtrash/global-disaster-risk-index-time-series-dataset

* GeoJson for World Counties Boundaries (23 MB): https://datahub.io/core/geo-countries#javascript

* [Webpage Template](https://docs.google.com/drawings/d/1V-JbIPJy9bdkCUTaHoVpVRal77EPgxBa6xSO4RLJmV4/edit)

## Major Tasks
### Region/Country Tasks:

* Translate the Regions column from the initial dataset from German into English

* Extract ISO and Continent Code data from an external source and build a dataset.

* Join the translated dataset and the imported code dataset into a single entity.

* Export transformed dataset and load to PostgreSQL database

### Website Tasks:

 * Utilize a 2 page structure.
    * Welcome/Splash page with project explanation, considerations,  and references

    * A dashboard page with data visualizations and references

* Utilizes Leaflet and Plotly:
    * Leaflet for global wide visualization of disaster risk using a choropleth map

    * Plotly utilization for chart visualization. Specific charts TBD; at least bar chart and line charts across various categories.   

### Unique Library Task:

* https://www.apexcharts.com/ - Charting library

### User Driven Interaction:

* Menu selections to view by Continent or by Country

* Dropdown menu to select continent or country

* Clicking on map location will show area information

* Year selection

### Route website through Flask server.

### Presentation Tasks

* Rehearse and Structure presentation

    * Decide on who will guide presentation(Screen share, user input etc)

    * Decide speaking order

    * Ensure time management



# Instructions
### Software Requirements

This project is confirmed to work on these verions of software --

    - Python 3.8.13 (default, Mar 28 2022, 06:59:08)
    - Jupyter Notebook: server version 6.4.8
    - PostgresSQL E.1. Release 13.8
    - pgAdmin 4 v6.12
  
## Section I: Readying Dataset for use
---
1. First, clone this repo and open the repo folder with an external terminal/console. The creators of this project used `Git Bash` and `Mac OS Terminal`.
1. Create or run a python enviroment. For Bootcamp users, this is `PythonData38`. The enviroment requierments for this project are:
    - Flask==1.1.2
    - SQLAlchemy==1.4.32
    - Requests==2.27.1
    - Numpy==1.21.5
    - Pandas==1.4.2
2. In your terminal, input the following: `source activate <your_enviorment>`. For bootcamp users, this is likely `source activate PythonData38`.
3. Next, to ensure dataset source file fidelity, in your terminal input the following: `jupyter notebook`. Once the notebook has loaded, from the main directory open `extract_transform_notebook.ipynb`. 
4. In the extract_transform_notebook, from the navigation bar select `Kernel` and from the drop down menu, select your enviroment.
5. Again, select `Kernel` from the navigation bar and select `Restart & Run All`. This will ultimately populate `/static/data` with the most correct cleaned dataset for use. You may now close the `extract_transform_extract.ipynb` notebook. Return to the jupyter notebook homepage/main directory.
6. Open `update GeoJSON.ipynb`. Following the same steps as step 5, ensure you're in the desired `Kernel`, and select `Restart & Run All`. Once it has finished processing, you may now close the notebook and exit jupyter notebook by pressing `CTRL + C` in the terminal you used to open the notebook. Do not close the terminal. It will be used again in Section III.

## Section II: Loading the PostgreSQL database for use
---
1. Ensure you have a working copy of `PostgreSQL`. This project was worked on using `PostgresSQL E.1. Release 13.8`.  Navigate to `pgAdmin`. This project was worked on using `pgAdmin 4 v6.12`.
   
2. From `pgAdmin` create a new database named `wri_db`. Once created, select `wri_db` in the pgAdmin Browser by double clicking[`PostgreSQL <version>`] and then double clicking [`Database`]. Select `wri_db`.
   
3. Once `wri_db` is selected, open the query tool. This can resonably done using the top navigation bar by selecting `Tools` and from the dropdown bar selecting `Query Tool`. 

4. In the query tool workspace select the folder icon which will be labeled `Open File` when hovered over. Next, navigate to the repo folder for `world-disaster-risk-visualization`. Inside the main directory of `world-disaster-risk-visualization` select `wri_db.sql`. This will populate your query tool workspace. Alternatively, from the `world-disaster-risk-visualization` main directory you can drag and drop the `wri_db.sql` file into the query tool workspace. You will see instructions within the query tool above each script to run. Once you have followed them and you have confirmed the table has populated, proceed. 
   
5. Next, navigate back to the pgAdmin 4 browser to the left. Double click on `[wri_db]`. Located and double click `[Schemas]`. Under `[Schemas]` right click `[Tables]` and select refresh, the double click. You should see `world_risk_index` populated. Right click on `[world_risk_index]` and select `[Import/Export Data...]`. From the popup menu, click the folder icon and navigate to `world-disaster-risk-visualization\static\data` and select `english_dataset.csv`. Ensure the format in the popup menu is `csv` and the encoding `UTF8`. Press OK. The database should now be loaded. Ensure by running from the script line 21 `<SELECT * FROM world_risk_index;>`. You should see each column populated.
   
6. Next, from the `world-disaster-risk-visualization` folder main directory, open `config_py_format.txt`. You will need this for the next step. 
   
7. Finally, you must now get your `postgreSQL` server information. From the Browser on the left, navigate back to the `wri_db` under `Databases` and select it. Navigate to `Tools` in the top navigation bar and select `PSQL Tool`. You should see the filepath location of your `PostgreSQL` installation. On that line you should see information such as "host", "port", "dbname", and "user". This project was worked on using the machines localhost. From this information please enter the associated values into the `config_py_format.txt` you opened in the previous step. That should be the `username`, `database` and `port_number`. The `password` must be the password you use to login to pgAdmin4. Once you have entered the information into the .txt file, click on `File` from the top navigation bar, and select `Save As...` from the dropdown. You must save as `config.py`. Once that is done you may close the .txt file. When prompted, do not save changes. You may now exit pgAdmin.

## Section III: Flask server start and opening the website. 
---
1. Navigate to your terminal that is operating out of the `world-disaster-risk-visualization` directory. Ensure you are still operating in the python enviroment from section I. For bootcamp users, this is `PythonData38`. 
2. In this terminal, enter the following: `python app.py`. This will initialize the Flask server that communicates with the postgreSQL database server, and hosts the website created for this project. 
3. Given you followed the instructions above, the Flask server will initialize, and the terminal will show you the IP your server is running on. This will display your local host IP at a given port. Navigate to that address in your web browser. This project was displayed and debugged using Google Chrome as the website browser. 
4. Given that the instructions were followed, you should now see a webpage that says `Welcome to the About Page`. From there you may navigate as you wish and follow the instructions provided on the website. 
