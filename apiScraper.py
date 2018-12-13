#!/bin/python
import requests
import time

# with open("items.txt", "r") as ins:
#     for line in ins:
#         time.sleep(1)
#         i = line
        # print "http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=" + str(i.rstrip("\n\r"))
        # print "A break in items"
        # try:
response = requests.get("https://storage.googleapis.com/osbuddy-exchange/summary.json")
        # except:
        #     break

        # if response.content:
        #     print(response.content + ',')
print(response.content)
