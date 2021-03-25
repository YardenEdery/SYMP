from flask import Flask, render_template, request
import argparse
import MinorTest
import MajorTest

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def hello():
    if request.method == 'POST':
        data = request.get_json()
        minor_tests = []
        for cmd in data["Minor-tests"]["command"]:
            # TODO Create Minor test for each command and append it to an array
            mt = MinorTest.MinorTest(cmd[0], parameters=cmd[1])
            minor_tests.append(mt)
            print(cmd)
            pass

        # Create and activate the Major Test using all minor tests
        major_test = MajorTest.MajorTest(minor_tests)
        major_test.activate()
        return data
    elif request.method == 'GET':
        return "Hello World"


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="It will set your application")
    parser.add_argument('-ho', '--host', required=False, default='0.0.0.0', help="The host you will use")
    parser.add_argument('-p', '--port', required=False, type=int, default=5555, help="The port you will use")
    args = parser.parse_args()

    if args.host == '0.0.0.0':
        print("[+] To access the application use the following url:\nhttp://127.0.0.1:{}\n".format(args.port))
    else:
        print("[+] To access the application use the following url:\nhttp://{}:{}\n".format(args.host, args.port))
    app.run(debug=True, host=args.host, port=args.port)
