import os
import time

from museek import messages
from museek.driver import Driver

config_dir = str(os.path.expanduser("~/.museekd/"))

config_file = config_dir + "museekcontrol.config"
host = "/tmp/museekd.damel"
password = ""
log_dir = ""

source_user = "Mochrie99"
source_filepath = "l:\\flac & lossless album archive\\various artists (multi)\contributing artist s-z\sinitta\(1987) sinitta " \
                  "(2cd deluxe edition) (2011) flac\cd1\\15 Toy Boy (Extended Bicep Mix).flac "

if __name__ == '__main__':
    driver = Driver()

    driver.connect(host, password)

    driver.send(messages.DownloadFile(source_user, source_filepath))
    while True:
        driver.process()
        time.sleep(0.01)
