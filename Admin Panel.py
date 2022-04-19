import sqlite3,os
from flask import Flask, render_template, jsonify
# import socket
from flask_cors import CORS
import webbrowser


working_dir = os.getcwd()

# MY_HOST_NAME = socket.gethostname()
# MY_IP_ADDRESS = socket.gethostbyname(MY_HOST_NAME)




# app = Flask(__name__)
app = Flask(__name__, static_folder="build/static", template_folder="build")

CORS(app)

try :
    conn = sqlite3.connect(os.path.join(working_dir,'Users.db'))
    conn.execute("""CREATE TABLE IF NOT EXISTS USERS(
        USERNAME TEXT PRIMARY KEY,
        PASSWORD TEXT,
        FIRSTNAME TEXT,
        LASTNAME TEXT,
        EMAIL TEXT,
        ROLES TEXT)""")

    admin_list = "Admin,Read Only Admin"

    try :
        conn.execute("INSERT OR REPLACE INTO USERS(USERNAME,PASSWORD,FIRSTNAME,LASTNAME,EMAIL,ROLES) VALUES(?,?,?,?,?,?)",('Admin','Admin','Admin','Admin','Admin@admin.com', str(admin_list)))
    except Exception as e :
        print("USERS.db (R1) Exception : ",e)

    conn.commit()
    conn.close()
except Exception as e :
    print("Users.db Exception : ",e)


def ADMIN_CHECK(username,password) :
    try :
        if os.path.exists(os.path.join(working_dir,'Users.db')) :
            conn = sqlite3.connect(os.path.join(working_dir,'Users.db'))
            cur = conn.cursor()
            try :
                cur.execute("SELECT ROLES FROM USERS WHERE USERNAME=? AND PASSWORD=?", (username,password))
                rows = cur.fetchall()[0][0]
                rows = rows.split(",")
            except :
                rows = []
            conn.commit()
            conn.close()
        else :
            rows = []
    except Exception as e :
        print("Users.db Exception : ",e)
        rows = []

    try :
        if ("Admin" in rows) :
            return "200"
        elif("Read Only Admin" in rows) :
            return "201"
        else :
            return "404"
    except :
        return "404"


def jsonCovert() :
    try :
        data_json = []

        if os.path.exists(os.path.join(working_dir,'Users.db')) :
            conn = sqlite3.connect(os.path.join(working_dir,'Users.db'))
            cur = conn.cursor()
            header = ["USERNAME","PASSWORD","FIRSTNAME","LASTNAME","EMAIL","ROLES"]
            try :
                cur.execute("SELECT * FROM USERS")
                rows = cur.fetchall()
            except :
                rows = []
            conn.commit()
            conn.close()
        else :
            rows = []
    except Exception as r :
        print(r)
        rows = []
        
    try :
        for i in rows:
            data_json.append(dict(zip(header, i)))
    except :
        pass

    return data_json



@app.route("/")
def hello():
    return render_template('index.html')
    # return "hello"



@app.route('/login_info/<string:login_info>', methods=['GET', 'POST'])
def login_info(login_info) :
    try :
        username_rec = login_info.split(",")[0]
        password_rec = login_info.split(",")[1]
        res = ADMIN_CHECK(username_rec,password_rec)
        return res
    except :
        return "404"


@app.route('/login/<string:login_info>', methods=['GET', 'POST'])
def login(login_info) :
    try :
        username_rec = login_info.split(",")[0]
        password_rec = login_info.split(",")[1]
        res = ADMIN_CHECK(username_rec,password_rec)
        if((res=="200") or (res=="201")) :
            send_json = jsonCovert()
            return jsonify(send_json)
        else :
            return "404"
    except :
        return "404"


@app.route('/infoSaved/<string:saved_info>', methods=['GET', 'POST'])
def infoSaved(saved_info) :
    try :
        username_rec = saved_info.split(",")[0]
        password_rec = saved_info.split(",")[1]
        firstname_rec = saved_info.split(",")[2]
        lastname_rec = saved_info.split(",")[3]
        email_rec = saved_info.split(",")[4]
        roles_rec = saved_info.split(",")[5:]

        # print("username_rec === >>> ", username_rec)
        # print("password_rec === >>> ", password_rec)
        # print("firstname_rec === >>> ", firstname_rec)
        # print("lastname_rec === >>> ", lastname_rec)
        # print("roles_rec === >>> ", roles_rec)

        connect = ","  
        roles_rec_value = connect.join(roles_rec)

        if os.path.exists(os.path.join(working_dir,'Users.db')) :
            conn = sqlite3.connect(os.path.join(working_dir,'Users.db'))
            cur = conn.cursor()
            cur.execute("""UPDATE USERS 
                SET PASSWORD = '{}', 
                FIRSTNAME = '{}',
                LASTNAME = '{}',
                EMAIL = '{}',
                ROLES = '{}' 
                WHERE USERNAME='{}'"""
                .format(password_rec,firstname_rec,lastname_rec,email_rec,roles_rec_value,username_rec))
            conn.commit()
            conn.close()

            return "200"
        else :   
            return "404"

    except Exception as r :
        print(r)
        return "404"



@app.route('/newUser/<string:saved_info>', methods=['GET', 'POST'])
def newUser(saved_info) :
    try :
        username_rec = saved_info.split(",")[0]
        password_rec = saved_info.split(",")[1]
        firstname_rec = saved_info.split(",")[2]
        lastname_rec = saved_info.split(",")[3]
        email_rec = saved_info.split(",")[4]
        roles_rec = saved_info.split(",")[5:]

        # print("username_rec === >>> ", username_rec)
        # print("password_rec === >>> ", password_rec)
        # print("firstname_rec === >>> ", firstname_rec)
        # print("lastname_rec === >>> ", lastname_rec)
        # print("roles_rec === >>> ", roles_rec)

        connect = ","  
        roles_rec_value = connect.join(roles_rec)

        if os.path.exists(os.path.join(working_dir,'Users.db')) :
            conn = sqlite3.connect(os.path.join(working_dir,'Users.db'))
            cur = conn.cursor()
            try :
                cur.execute("INSERT OR REPLACE INTO USERS(USERNAME,PASSWORD,FIRSTNAME,LASTNAME,EMAIL,ROLES) VALUES(?,?,?,?,?,?)",(username_rec,password_rec,firstname_rec,lastname_rec,email_rec,roles_rec_value))
            except Exception as e :
                print("USERS.db (R1) Exception : ",e)
            conn.commit()
            conn.close()

            return "200"
        else :   
            return "404"

    except Exception as r :
        print(r)
        return "404"


try :
    webbrowser.open('http://127.0.0.1:5000', new=2)
except :
    pass


try :
    fileName = os.path.join(working_dir,'Users.db')
    os.system("attrib +h " + fileName)
except Exception as e:
    print(e)


if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    # app.run(host=MY_IP_ADDRESS, port=5000)
    app.run(port=5000)
