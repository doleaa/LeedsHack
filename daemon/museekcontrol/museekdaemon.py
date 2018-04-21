import os
import time

from museek.museekdriver import DownloadDriver

config_dir = str(os.path.expanduser("~/.museekd/"))

config_file = config_dir + "museekcontrol.config"
host = "/tmp/museekd.damel"
password = ""
log_dir = ""

# slsk://Britpops%20R%20Us/d:/mp3's/azwel/2010%20azwel01.%20Always%20Leaving.mp3

source_user = "Britpops R Us"
source_filepath = "/mp3's/azwel/2010%20azwel01.%20Always%20Leaving.mp3"

if __name__ == '__main__':
    driver = DownloadDriver()

    driver.connect(host, password)

    driver.download_file(source_user, source_filepath)
    while driver.is_connected:
        driver.process()
        time.sleep(1)
