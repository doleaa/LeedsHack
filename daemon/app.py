import json

from flask_api import FlaskAPI
from flask import request
from urllib.parse import unquote

from museekcontrol import museekdaemon

app = FlaskAPI(__name__)

daemon = museekdaemon.Daemon()


@app.route("/download", methods=["POST"])
def download():
    user = unquote(request.data["user"])
    file = unquote(request.data["file"])
    daemon.driver.add_task(("download_file", [user, file]))
    return json.dumps({"response": f"Downloading [{file}] from [{user}]"})


@app.route("/bulk-download", methods=["POST"])
def bulk_download():
    user = unquote(request.form["user"])
    file = unquote(request.form["file"])
    daemon.driver.add_task(("download_folder", [user, file]))
    return json.dumps({"response": f"Downloading [{file}] from [{user}]"})


@app.route("/")
def ping():
    return json.dumps({"response": "I'm alive"})


if __name__ == '__main__':
    daemon.start()
    app.run(host="localhost", port=5000, debug=True)
