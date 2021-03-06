from flask import Flask, render_template, request, Response, url_for, redirect
import argparse
import json
import os
import time
import Utils.MinorTest as MinorTest
import Utils.MajorTest as MajorTest
import threading

app = Flask(__name__, static_folder="Static")
LOG_PATH = "./Storage/Logs"
global data


@app.route('/', methods=['GET', 'POST'])
def hello():
    if request.method == 'POST':
        global data
        if request.get_json() is None:
            time.sleep(5)
            return render_template("fin.html", data=data)
        data = request.get_json()
        minor_tests = []
        data["Minor-tests"]["logpath"] = []
        for cmd in data["Minor-tests"]["command"]:
            # TODO Create Minor test for each command and append it to an array
            mt = MinorTest.MinorTest(cmd[0], parameters=cmd[1])
            minor_tests.append(mt)
            data["Minor-tests"]["logpath"].append(LOG_PATH + "/" + cmd[0] + ".log")

        # Create and activate the Major Test using all minor tests
        major_test = MajorTest.MajorTest(minor_tests)
        t = threading.Thread(target=major_test.activate)
        t.start()
        t.join()
        #data = json.dumps(data)
        return render_template("fin.html")

    elif request.method == 'GET':
        return render_template("index.html")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="It will set your application")
    parser.add_argument('-ho', '--host', required=False, default='0.0.0.0', help="The host you will use")
    parser.add_argument('-p', '--port', required=False, type=int, default=5555, help="The port you will use")
    args = parser.parse_args()

    if args.host == '0.0.0.0':
        print("[+] To access the application use the following url:\nhttp://127.0.0.1:{}\n".format(args.port))
    else:
        print("[+] To access the application use the following url:\nhttp://{}:{}\n".format(args.host, args.port))
    app.run(host=args.host, port=args.port, debug=False)
