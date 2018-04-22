import json

from flask import Flask, request

from museekcontrol import museekdaemon

app = Flask(__name__)

daemon = museekdaemon.Daemon()


@app.route("/download", methods=["POST"])
def download():
    user = request.form["user"]
    file = request.form["file"]
    daemon.driver.add_task(("download_file", [user, file]))
    return json.dumps({"response": f"Downloading [{file}] from [{user}]"})


@app.route("/")
def ping():
    return json.dumps({"response": "I'm alive"})


if __name__ == '__main__':
    daemon.start()
    app.run(host="localhost", port=5000, debug=True)
