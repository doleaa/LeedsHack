import os
import time

from urllib.parse import unquote

import threading

from museek.museekdriver import DownloadDriver

config_dir = str(os.path.expanduser("~/.museekd/"))

config_file = config_dir + "museekcontrol.config"
host = "/tmp/museekd.damel"
password = "Angel1995"
log_dir = ""

# slsk://Britpops%20R%20Us/d:/mp3's/azwel/2010%20azwel01.%20Always%20Leaving.mp3

# source_user = "carlosromanos"
source_user = unquote("Lemonsqueezer")
source_filepath = unquote("%40%40sgkmi%5CSS'16%5Ccomplete%5CBicep%20-%20Bicep%20(2017)%5CB1.%20Bicep%20-%20Vespa.mp3")


# "//home/guibog/sync/zic/Mixin/Drame01%7E144%7EHudson%20Mohawke%7EChimes.mp3"

class Daemon(threading.Thread):
    def __init__(self):
        super().__init__()
        self.driver = DownloadDriver()

        self.driver.connect(host, password, 1 | 2 | 4 | 8 | 16 | 32 | 64)
        time.sleep(1)

    def add_task(self, *args):
        self.driver.add_task(*args)

    def stop(self):
        self.driver.disconnect()

    def run(self):
        while self.driver.is_connected:
            self.driver.process()
            time.sleep(3)


if __name__ == '__main__':
    driver = DownloadDriver()

    driver.connect(host, password, 1 | 2 | 4 | 8 | 16 | 32 | 64)
    time.sleep(1)

    driver.add_task(("download_file", [source_user, source_filepath]))
    time.sleep(1)
    while driver.is_connected:
        driver.process()
        time.sleep(3)
