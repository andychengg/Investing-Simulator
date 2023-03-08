## instructions: for running python scripts locally

1. make sure you have python installed
2. make a project directory and move the project folder inside
The directory structure should look like:  
├── project  
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── cmpt-372-investment-sim  
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── ...  
3. make sure you are in the 'project' folder: `cd project`
4. create a python virtual environment with: `python3 -m venv .`
on windows run `py -m venv .`
5. activate python venv with: `source ./bin/activate`
on windows run `.\Scripts\activate.bat`
6. go to the project: `cd cmpt-372-investment-sim`
7. install the package. this will also install the dependencies: `pip install yahooquery`
8. run the quick demo: 
```
$ cd cmpt-372-investment-sim/lib
$ node test_stock_service.js
```
9. you can delete `test_stock_service.js` after


## instructions: setup on the server
1. install python
2. install the package directly (no need to setup venv): `pip install yahooquery`
