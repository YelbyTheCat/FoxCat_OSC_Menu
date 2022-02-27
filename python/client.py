"""Small example OSC client

This program sends 10 random values between 0.0 and 1.0 to the /filter address,
waiting for 1 seconds between each value.
"""
import argparse
import random
import time

from pythonosc import udp_client


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--ip", default="127.0.0.1",
        help="The ip of the OSC server")
    parser.add_argument("--port", type=int, default=9000,
        help="The port the OSC server is listening on")
    args = parser.parse_args()

    client = udp_client.SimpleUDPClient(args.ip, args.port)

    paramRoot = "/avatar/parameters/"
    inputRoot = "/input/"

    #client.send_message("avatar/change/", "avtr_bd6a9a4d-098b-4503-af0a-6a42cb22d417")
    while(True):
        client.send_message(f'{paramRoot}top', random.uniform(0,11))
        time.sleep(2)
        #client.send_message(f'{paramRoot}AngularY', 0)
 # for x in range(100):
 #   client.send_message("/avatar/parameters/", random.random())
 #   time.sleep(1)