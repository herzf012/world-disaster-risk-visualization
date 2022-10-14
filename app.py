# Import the functions we need from Flask
from flask import Flask
from flask import render_template 
from flask import jsonify

# Import the functions we need from SQL Alchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import inspect

# Import any remaining functions
import json

# Import connection params from connection_config.py
from config import sql_username, sql_password, sql_database, sql_port_number

# Define the PostgreSQL connection parameters
username = sql_username  # Ideally this would come from config.py (or similar)
password = sql_password  # Ideally this would come from config.py (or similar)
database_name = sql_database
port_number = sql_port_number # Check your own port number! It's probably 5432, but it might be different!
connection_string = f'postgresql://{username}:{password}@localhost:{port_number}/{database_name}'

# Connect to the SQL database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)

inspector = inspect(engine)
print (inspector.get_table_names())

# Choose the SQL table we wish to use. As we discussed in class, your tables
# won't be available via reflection unless they contain a primary key. 
table = base.classes.world_risk_index

# Instantiate the Flask application. (Chocolate cake recipe.)
# This statement is required for Flask to do its job. 
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching

# Here's where we define the various application routes. Note that the name
# of a route must NEVER include the IP address (e.g., 127.0.0.1), and shouldn't
# include the file extension either; i.e., use "my_route" as the name of the route,
# not "my_route.html" and definitely not "127.0.0.1:5000/my_route."
@app.route("/")
def IndexRoute():
    ''' Runs when the browser loads the index route (i.e., the "home page"). 
        Note that the html file must be located in a folder called templates. '''

    webpage = render_template("index.html")
    return webpage

@app.route("/dashboard")
def DashboardRoute():
    ''' Runs when the user clicks the link for the other page.
        Note that the html file must be located in a folder called templates. '''

    # Note that this call to render template passes in the title parameter. 
    # That title parameter is a 'Shirley' variable that could be called anything 
    # we want. The name has to match the parameter used in other.html. We could 
    # pass in lists, dictionaries, or other values as well. And we don't have 
    # to pass in anything at all (which would make a lot more sense in this case).
    webpage = render_template("dashboard.html")
    return webpage

@app.route("/wri_index")
def WriRoute():
    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.id, table.country_name, table.wri,
    table.exposure, table.vulnerability, table.susceptibility,
    table.coping_inability, table.adaptive_inability,
    table.year, table.exposure_category, table.wri_category,
    table.vulnerability_category, table.susceptibilty_category).all()
    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    wri_info = []
    for id, country_name, wri, exposure, vulnerability, susceptibility,coping_inability, adaptive_inability, year, exposure_category, wri_category,  vulnerability_category, susceptibilty_category in results:
        dict = {}
        dict["id"] = id
        dict["country_name"] = country_name
        dict["wri"] = wri
        dict["exposure"] = exposure
        dict["vulnerability"] = vulnerability
        dict["susceptibility"] = susceptibility
        dict["coping_inability"] = coping_inability
        dict["adaptive_inability"] = adaptive_inability
        dict["year"] = year
        dict["exposure_category"] = exposure_category 
        dict["wri_category"] = wri_category
        dict["vulnerability_category"] = vulnerability_category
        dict["susceptibilty_category"] = susceptibilty_category  
        wri_info.append(dict)

    # Return the jsonified result. 
    return jsonify(wri_info)
      
@app.route("/static/data/countries.geojson")
def ReadJsonFileRoute(filename):    
    ''' Opens a JSON or GeoJSON file and then returns
        its contents to the client. The filename is specified
        as a parameter. '''

    # Note that we have to assemble the complete filepath. We do this on the 
    # server because the client has no knowledge of the server's file structure.
    filepath = f"static/data/{filename}"

    # Add some simple error handling to help if the user entered an invalid
    # filename. 
    try: 
        with open(filepath) as f:    
            json_data = json.load(f)
    except:
        json_data = {'Error': f'{filename} not found on server!'}

    print('Returning data from a file')

    return jsonify(json_data)

# This statement is required for Flask to do its job. 
# Think of it as chocolate cake recipe. 
if __name__ == '__main__':
    app.run(debug=True)