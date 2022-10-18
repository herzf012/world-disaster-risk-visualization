# world-disaster-risk-visualization

|Datasets  | Description |
| ------------- | ------------- |
| [corrected_country_codes.csv (773 B)](static/data/corrected_country_codes.csv)  | A .csv output from the data cleaning process. Contains previously unparasable german country names with their associated ISO code. |
| [countries.geojson (23 MB)](static/data/countries.geojson)  | A GeoJSON file utilized in the creation of a new GeoJSON file. |
| [countries_wri.geojson (84.9 MB)](static/data/countries_wri.geojson) | A GeoJSON file with additional inputs from the  |
| [country_codes_combined.csv (77 KB)](static/data/country_codes_combined.csv) | A csv file containing ISO codes and multilanguage country names. |
| [english_dataset.csv (162 KB)](static/data/english_dataset.csv) | A .csv output from the data cleaning process. Contains english country names alongside associated ISO Alpha3 codes, prepared for loading into PostgreSQL database. |
| [world_risk_index.csv ( 145 KB)](static/data/world_risk_index.csv)  | World Risk Index dataset providing several columns with information for hundreds of countries ratings for natural disaster risk, susceptibility, and vulnerability over the period of 2011-2021. |

|Notebooks  | Description |
| ------------- | ------------- |
| [Extraction and Transformation notebook](extract_transform_notebook.ipynb)  | Jupyter Notebook utilizing pandas to clean the dataset to meet database load requirements  |
| [GeoJSON adjustment Notebook](Update%20GeoJSON.ipynb)  | Jupyter Notebook utilizing pandas to input additional feature properties into a GeoJSON file to properly display on a chloropleth map. |
| [Visualization table Notebook](rank_by_wri.ipynb)  | Jupyter Notebook utilizing pandas to visualize data tables year-wise across the WRI dataset. |

|Scripts & Text files| Description |
| ------------- | ------------- |
| [Python app.py](app.py) | Python script containing PostgeSQL database connection and flask routing setup. |
| [SQL wri_db.sql](wri_db.sql) | SQL script to build tables for database |
| [Text file for config.py](config_py_format.txt) | .txt file containing the formatting for the config.py needed to create the database connection. Must be saved as config.py when filled out. |

|Javascript| Description |
| ------------- | ------------- |
| [logic.js](static/js/logic.js) | Javascript file containing leaflet map initialization, ApexCharts line and pie chart creation, and functions that load and display information based on user selections.|
| [choropleth.js ](static/js/choropleth.js) | Javascript file containing functions that affect the look and layout of the leaflet choropleth map. |

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

* [Countries by language and ISO code (77kb)](https://stefangabos.github.io/world_countries/)

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

This project is confirmed to work on these verions of software:
   - [Python 3.8.13](https://www.python.org/downloads/release/python-3813/)
   - [Jupyter Notebook version 6.4.8](https://github.com/jupyter/notebook/releases/tag/v6.4.8)
   - [PostgresSQL E.1. Release 13.8](https://www.postgresql.org/docs/13/index.html)
   - [pgAdmin 4 v6.12](https://www.postgresql.org/ftp/pgadmin/pgadmin4/v6.12/)
  
## Section I: Readying Dataset for use
---
1. First, clone this repo and open the repo folder with an external terminal/console. The creators of this project used `Git Bash` and `Mac OS Terminal`.

1. Create or run a python enviroment. For Bootcamp users, this is `PythonData38`. The enviroment requierments for this project are:
    - [Flask](https://flask.palletsprojects.com/en/2.2.x/) == 1.1.2
    - [SQLAlchemy](https://www.sqlalchemy.org/) == 1.4.32
    - [Requests](https://pypi.org/project/requests/) == 2.27.1
    - [Numpy](https://numpy.org/) == 1.21.5
    - [Pandas](https://pandas.pydata.org/) == 1.4.2
    
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

# References and Acknowledgements
---
##### [1] Mrinal Tyagi, September 2022 , World Disaster Risk Dataset ,Initial Version, Retrieved [September 29th 2022] from [https://www.kaggle.com/datasets/tr1gg3rtrash/global-disaster-risk-index-time-series-dataset](https://www.kaggle.com/datasets/tr1gg3rtrash/global-disaster-risk-index-time-series-dataset)

##### [2] DataHub; Natural Earth, 2018, Country Polygons as GeoJSON, Retrieved [October 3rd 2022] from [https://datahub.io/core/geo-countries#javascript](https://datahub.io/core/geo-countries#javascript) 

##### [3] Stefan Gabos, June 19th 2022, World countries, [Retrieved October 6th 2022] from [https://stefangabos.github.io/world_countries/](https://stefangabos.github.io/world_countries/)

##### [4] Dom L., October 2022, flask-demo, [Retrieved October 6th 2022] from [https://github.com/domilab/flask-demo](https://github.com/domilab/flask-demo)

#### Acknowledgements:
#####    Thank you to Dom and all the TA's for continued advice across this project.

#####    Thank you again to Dom for his flask demo, which we adapated to fit our needs as seen in our app.py script.

#####    Thanks as well to the library creators and contributors of [Leaflet](https://leafletjs.com/) and [ApexCharts](https://apexcharts.com/).
